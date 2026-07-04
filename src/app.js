/* EmbryoLab PRO · APP — router, tema, render, quiz */
(function(window, document){
  'use strict';

  if (!window.EL_DATA) { console.error('[EmbryoLab] data.js no cargado.'); return; }
  var ICONS = window.EL_DATA.ICONS;
  var TOPICS = window.EL_DATA.TOPICS;
  var ABDI_METHOD_MODEL = window.EL_DATA.ABDI_METHOD_MODEL;

var state = {
  view: 'home', // 'home' | 'index' | 'anomaliesList' | 'detail'
  topicId: null,
  anomalyId: null
};

function $(sel, ctx){ return (ctx || document).querySelector(sel); }
function $$(sel, ctx){ return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
function getTopic(id){ for (var i=0; i<TOPICS.length; i++) if (TOPICS[i].id === id) return TOPICS[i]; return null; }
function getAnomaly(topic, id){ if (!topic || !topic.anomalies) return null; for (var i=0; i<topic.anomalies.length; i++) if (topic.anomalies[i].id === id) return { anomaly: topic.anomalies[i], index: i }; return null; }

/* ════════════════════════════════════════════════════════════
   THEME
   ════════════════════════════════════════════════════════════ */

function setupTheme(){
  var saved = null;
  try { saved = localStorage.getItem('embryolab-theme'); } catch(e){}
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  $$('.el-theme-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var t = btn.getAttribute('data-theme-set');
      applyTheme(t);
      try { localStorage.setItem('embryolab-theme', t); } catch(e){}
    });
  });
}
function applyTheme(theme){
  $('#elApp').setAttribute('data-theme', theme);
  $$('.el-theme-btn').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-theme-set') === theme); });
}

/* ════════════════════════════════════════════════════════════
   BREADCRUMB & BACK BUTTON
   ════════════════════════════════════════════════════════════ */

function updateNavControls(){
  var bc = $('#elBreadcrumb');
  var backBtn = $('#elBackBtn');
  var backLabel = $('#elBackLabel');
  var crumbs = [];

  if (state.view === 'home'){
    crumbs = [{ label: 'Inicio', current: true }];
    backBtn.style.display = 'none';
  }
  else if (state.view === 'index'){
    crumbs = [
      { label: 'Inicio', action: 'home' },
      { label: 'Índice', current: true }
    ];
    backBtn.style.display = 'inline-flex';
    backLabel.textContent = 'Inicio';
    backBtn.onclick = function(){ navigateTo('home'); };
  }
  else if (state.view === 'anomaliesList'){
    var t = getTopic(state.topicId);
    crumbs = [
      { label: 'Inicio', action: 'home' },
      { label: 'Índice', action: 'index' },
      { label: t ? t.short : '—', current: true }
    ];
    backBtn.style.display = 'inline-flex';
    backLabel.textContent = 'Índice';
    backBtn.onclick = function(){ navigateTo('index'); };
  }
  else if (state.view === 'detail'){
    var t2 = getTopic(state.topicId);
    var ares = getAnomaly(t2, state.anomalyId);
    var anomName = ares ? ares.anomaly.title : '—';
    crumbs = [
      { label: 'Inicio', action: 'home' },
      { label: 'Índice', action: 'index' },
      { label: t2 ? t2.short : '—', action: 'anomaliesList' },
      { label: anomName, current: true }
    ];
    backBtn.style.display = 'inline-flex';
    backLabel.textContent = 'Anomalías';
    backBtn.onclick = function(){ navigateTo('anomaliesList', { topicId: state.topicId }); };
  }

  bc.innerHTML = crumbs.map(function(c, i){
    var sep = i > 0 ? '<span class="sep">›</span>' : '';
    if (c.current) return sep + '<span class="crumb current">' + c.label + '</span>';
    return sep + '<button class="crumb link" data-crumb-action="' + c.action + '">' + c.label + '</button>';
  }).join('');

  $$('.crumb.link', bc).forEach(function(el){
    el.addEventListener('click', function(){ navigateTo(el.getAttribute('data-crumb-action')); });
  });
}

/* ════════════════════════════════════════════════════════════
   ROUTER
   ════════════════════════════════════════════════════════════ */

function navigateTo(view, data){
  state.view = view;
  if (data){
    if (data.topicId !== undefined) state.topicId = data.topicId;
    if (data.anomalyId !== undefined) state.anomalyId = data.anomalyId;
  }

  $$('.el-view').forEach(function(v){ v.classList.remove('active'); });

  if (view === 'home') $('#viewHome').classList.add('active');
  else if (view === 'index') $('#viewIndex').classList.add('active');
  else if (view === 'anomaliesList'){
    $('#viewAnomaliesList').classList.add('active');
    renderAnomaliesListView(state.topicId);
  }
  else if (view === 'detail'){
    $('#viewAnomalyDetail').classList.add('active');
    renderDetailView(state.topicId, state.anomalyId);
  }

  updateNavControls();

  var app = $('#elApp');
  if (app && app.scrollIntoView){
    app.scrollIntoView({ behavior:'smooth', block:'start' });
  }
}

/* ════════════════════════════════════════════════════════════
   VIEW 2 · INDEX
   ════════════════════════════════════════════════════════════ */

function renderIndexView(){
  var grid = $('#elTopicsGrid');
  grid.innerHTML = TOPICS.map(function(t, i){
    var disabled = !!t.pending;
    var anomCount = t.anomalies ? t.anomalies.length : 0;
    return '' +
      '<button class="el-topic-card ' + (disabled ? 'disabled' : '') + '" data-topic-id="' + t.id + '" ' + (disabled ? 'disabled aria-disabled="true"' : '') + '>' +
        '<div class="el-topic-head">' +
          '<div class="el-topic-icon">' + t.icon + '</div>' +
          '<div class="el-topic-num">TEMA ' + String(i+1).padStart(2,'0') + '</div>' +
        '</div>' +
        '<h3 class="el-topic-name">' + t.name + '</h3>' +
        '<p class="el-topic-desc">' + (t.desc || '') + '</p>' +
        '<div class="el-topic-foot">' +
          '<div class="el-topic-stats">' +
            (disabled ?
              '<div class="el-topic-stat"><span class="l">En preparación</span></div>' :
              '<div class="el-topic-stat"><span class="n">' + anomCount + '</span><span class="l">anomalías</span></div>'
            ) +
          '</div>' +
          '<span class="el-topic-status ' + (disabled ? 'soon' : 'live') + '">' + (disabled ? 'Pronto' : 'Disponible') + '</span>' +
        '</div>' +
      '</button>';
  }).join('');

  $$('.el-topic-card').forEach(function(card){
    card.addEventListener('click', function(){
      if (card.classList.contains('disabled')) return;
      var id = card.getAttribute('data-topic-id');
      navigateTo('anomaliesList', { topicId: id });
    });
  });
}

/* ════════════════════════════════════════════════════════════
   VIEW 3 · LISTA DE ANOMALÍAS
   ════════════════════════════════════════════════════════════ */

function renderAnomaliesListView(topicId){
  var t = getTopic(topicId);
  var host = $('#elAnomaliesListContainer');
  if (!t){
    host.innerHTML = '<div class="el-empty"><h3>Tema no encontrado</h3></div>';
    return;
  }

  var header = '' +
    '<div class="el-topic-banner">' +
      '<div class="el-banner-icon">' + t.icon + '</div>' +
      '<div class="el-banner-info">' +
        '<div class="ey">TEMA · ' + String(TOPICS.indexOf(t)+1).padStart(2,'0') + '</div>' +
        '<h2>' + t.name + '</h2>' +
        '<p>' + (t.desc || '') + '</p>' +
      '</div>' +
      (t.anomalies ?
        '<div class="el-banner-count"><div class="n">' + t.anomalies.length + '</div><div class="l">Casos</div></div>' :
        '<div class="el-banner-count"><div class="n">–</div><div class="l">Pronto</div></div>'
      ) +
    '</div>';

  if (t.pending){
    host.innerHTML = header +
      '<div class="el-empty">' +
        '<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5"/></svg></div>' +
        '<h3>Contenido en preparación</h3>' +
        '<p>Este tema se publicará al recibir el material del Dr. Abdi. Tendrá modelo 3D con AR, tabla Método ABDI y examen por anomalía.</p>' +
        '<div class="soon">Coming soon</div>' +
      '</div>';
    return;
  }

  var grid = '<div class="el-anom-grid">' +
    t.anomalies.map(function(a, ai){
      var hasModel = a.model3d && a.model3d.url;
      return '' +
        '<button class="el-anom-card" data-anomaly-id="' + a.id + '">' +
          '<div class="el-anom-card-head">' +
            '<div class="el-anom-num">' + String(ai+1).padStart(2,'0') + '</div>' +
            '<span class="el-anom-status ' + (hasModel ? 'live' : 'soon') + '">' + (hasModel ? 'LIVE' : 'PRONTO') + '</span>' +
          '</div>' +
          '<div class="el-anom-card-tag">' + a.tag + '</div>' +
          '<div class="el-anom-card-title">' + a.title + '</div>' +
          '<div class="el-anom-card-desc">' + a.desc + '</div>' +
          '<div class="el-anom-card-foot">' +
            '<div class="el-anom-feats">' +
              '<span class="el-feat">3D</span>' +
              (hasModel ? '<span class="el-feat ar">AR</span>' : '') +
              '<span class="el-feat">ABDI</span>' +
              '<span class="el-feat">Q5</span>' +
            '</div>' +
            '<span class="el-anom-arrow">Abrir <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg></span>' +
          '</div>' +
        '</button>';
    }).join('') +
    '</div>';

  host.innerHTML = header + grid;

  $$('.el-anom-card', host).forEach(function(card){
    card.addEventListener('click', function(){
      var anomId = card.getAttribute('data-anomaly-id');
      navigateTo('detail', { topicId: topicId, anomalyId: anomId });
    });
  });
}

/* ════════════════════════════════════════════════════════════
   VIEW 4 · DETALLE DE UNA ANOMALÍA
   ════════════════════════════════════════════════════════════ */

function renderDetailView(topicId, anomalyId){
  var t = getTopic(topicId);
  var ares = getAnomaly(t, anomalyId);
  var host = $('#elDetailContainer');

  if (!t || !ares){
    host.innerHTML = '<div class="el-empty"><h3>Anomalía no encontrada</h3></div>';
    return;
  }

  var a = ares.anomaly;
  var ai = ares.index;
  var hasModel = a.model3d && a.model3d.url;
  var quizId = 'elQ-' + t.id + '-' + a.id;

  var specsHTML = a.quickSpecs ? '<div class="el-qs">' +
    a.quickSpecs.map(function(s){ return '<div><div class="el-qs-v">' + s.v + '</div><div class="el-qs-l">' + s.l + '</div></div>'; }).join('') +
    '</div>' : '';

  var mediaHTML = '';
  if (hasModel){
    mediaHTML = '<iframe src="' + a.model3d.url + '" frameborder="0" allow="xr-spatial-tracking; fullscreen; accelerometer; gyroscope; magnetometer;" allowfullscreen loading="lazy" referrerpolicy="no-referrer" title="Modelo 3D interactivo"></iframe>';
  } else {
    mediaHTML = '<div class="el-placeholder">' +
      '<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v9"/></svg></div>' +
      '<div class="lb">Modelo 3D · Pendiente</div>' +
      '<div class="ti">"' + a.title + '"</div>' +
      '<div class="nt">El modelo 3D se integrará cuando el Dr. Abdi lo aporte.</div>' +
    '</div>';
  }

  // BLOQUE MÉTODO ABDI
  var methodHTML = '' +
    '<div class="el-method">' +
      '<div class="el-method-head">' +
        '<div class="el-method-head-l">' +
          '<span class="el-method-badge">Tabla · Método ABDI</span>' +
          '<span class="el-method-title">Explicación clínico-embriológica</span>' +
        '</div>' +
        '<span class="el-method-sub">' + a.title + '</span>' +
      '</div>' +
      '<div class="el-method-body">' +
        '<div class="el-method-viewer" id="methodViewer-' + a.id + '">' +
          '<div class="el-method-hud">' +
            '<span class="pill accent">MÉTODO ABDI</span>' +
            '<span class="pill">3D</span>' +
          '</div>' +
          '<div class="el-method-loading" id="methodLoading-' + a.id + '">' +
            '<div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8l-9-5-9 5v8l9 5 9-5z"/><path d="M3 8l9 5 9-5"/></svg></div>' +
            '<div class="lb">Cargando modelo</div>' +
            '<div class="tx">Método ABDI · Visualización interactiva</div>' +
          '</div>' +
          '<model-viewer ' +
            'src="' + ABDI_METHOD_MODEL + '" ' +
            'alt="Tabla Método ABDI · ' + a.title + '" ' +
            'camera-controls ' +
            'auto-rotate ' +
            'auto-rotate-delay="2000" ' +
            'rotation-per-second="20deg" ' +
            'interaction-prompt="none" ' +
            'shadow-intensity="1" ' +
            'exposure="1" ' +
            'environment-image="neutral" ' +
            'id="mvEl-' + a.id + '" ' +
          '></model-viewer>' +
        '</div>' +
        '<div class="el-method-text">' +
          '<div class="ey">Breve explicación · ' + a.tag + '</div>' +
          '<h4>' + a.title + '</h4>' +
          '<p>' + a.shortInfo + '</p>' +
          '<div class="el-method-steps">' +
            '<div class="el-method-step"><div class="n">A</div><div class="tx"><b>Anatomía</b> — estructura afectada y relaciones normales.</div></div>' +
            '<div class="el-method-step"><div class="n">B</div><div class="tx"><b>Bases</b> embriológicas — origen y periodo crítico del desarrollo.</div></div>' +
            '<div class="el-method-step"><div class="n">D</div><div class="tx"><b>Diagnóstico</b> clínico y de imagen — hallazgos orientativos.</div></div>' +
            '<div class="el-method-step"><div class="n">I</div><div class="tx"><b>Impacto</b> funcional y pronóstico — tratamiento y consecuencias.</div></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  var quizHTML = (a.quiz && a.quiz.length) ? renderQuiz(quizId, a.quiz, a.title) : '';

  // Navegación inferior: volver a la lista y (si hay) siguiente anomalía
  var nextAnom = t.anomalies[ai + 1];
  var prevAnom = t.anomalies[ai - 1];
  var actionsHTML = '<div class="el-detail-actions">' +
    '<button class="el-action-btn" id="elBackToList">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>' +
      'Volver a anomalías' +
    '</button>' +
    (nextAnom ?
      '<button class="el-action-btn next" data-next-anomaly="' + nextAnom.id + '">' +
        'Siguiente: ' + nextAnom.title +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>' +
      '</button>' : '') +
    '</div>';

  host.innerHTML = '' +
    '<article class="el-detail-card">' +
      '<div class="el-detail-top">' +
        '<div class="el-media">' +
          (hasModel ? '<a class="el-ar-float" href="' + a.model3d.url + '" target="_blank" rel="noopener" aria-label="Ver en AR">' +
            '<span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9V5a2 2 0 0 1 2-2h4M3 15v4a2 2 0 0 0 2 2h4M21 9V5a2 2 0 0 0-2-2h-4M21 15v4a2 2 0 0 1-2 2h-4M12 7l4 2.5v5L12 17l-4-2.5v-5L12 7z"/></svg></span>' +
            '<span><span class="t">Ver en AR</span><span class="d" style="display:block">Realidad Aumentada</span></span>' +
            '<svg class="ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M7 17L17 7M8 7h9v9"/></svg>' +
          '</a>' : '') +
          '<div class="el-media-hud">' +
            '<div class="el-hud-pill">CASO · ' + String(ai+1).padStart(2,'0') + ' / ' + String(t.anomalies.length).padStart(2,'0') + '</div>' +
            (hasModel ? '<div class="el-hud-pill">VECTARY · 3D</div>' : '') +
            '<div class="el-hud-pill accent">' + (hasModel ? 'LIVE' : 'PRONTO') + '</div>' +
          '</div>' +
          '<div class="el-media-brackets"><span class="bk tl"></span><span class="bk tr"></span><span class="bk bl"></span><span class="bk br"></span></div>' +
          mediaHTML +
          '<div class="el-media-foot">' +
            '<div class="l"><span>' + t.short + '</span><span>ID · ' + a.id + '</span></div>' +
            '<div class="r"><span>' + (hasModel ? 'INTERACT · AR' : 'PENDING') + '</span></div>' +
          '</div>' +
        '</div>' +
        '<div class="el-intro">' +
          '<span class="el-intro-cat">' + t.short + ' · ' + a.tag + '</span>' +
          '<h3 class="el-intro-title">' + a.title + '</h3>' +
          '<p class="el-intro-desc">' + a.desc + '</p>' +
          '<div class="el-intro-chips">' +
            '<span class="el-chip accent">Anomalía ' + String(ai+1).padStart(2,'0') + '</span>' +
            '<span class="el-chip">' + t.short + '</span>' +
            '<span class="el-chip">' + a.tag + '</span>' +
          '</div>' +
          specsHTML +
        '</div>' +
      '</div>' +
      methodHTML +
      quizHTML +
    '</article>' +
    actionsHTML;

  // Bind quiz
  $$('.el-opt', host).forEach(function(btn){ btn.addEventListener('click', handleQuizAnswer); });
  $$('.el-retry', host).forEach(function(btn){ btn.addEventListener('click', handleQuizRetry); });

  // Bind acciones inferiores
  var backListBtn = $('#elBackToList', host);
  if (backListBtn){
    backListBtn.addEventListener('click', function(){
      navigateTo('anomaliesList', { topicId: topicId });
    });
  }
  $$('[data-next-anomaly]', host).forEach(function(btn){
    btn.addEventListener('click', function(){
      navigateTo('detail', { topicId: topicId, anomalyId: btn.getAttribute('data-next-anomaly') });
    });
  });

  // Ocultar loading cuando el modelo termine de cargar
  var mv = $('#mvEl-' + a.id, host);
  var loader = $('#methodLoading-' + a.id, host);
  if (mv && loader){
    mv.addEventListener('load', function(){ loader.classList.add('hidden'); });
    mv.addEventListener('error', function(){
      loader.innerHTML = '<div class="ic" style="background:linear-gradient(135deg,#6b7280,#4b5563);animation:none"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4M12 17h.01"/><circle cx="12" cy="12" r="10"/></svg></div>' +
                         '<div class="lb">Modelo no disponible</div>' +
                         '<div class="tx">Verifica que el archivo <code style="font-family:monospace;padding:2px 6px;background:rgba(255,255,255,.08);border-radius:3px">abdi-method.glb</code> esté junto al HTML.</div>';
    });
  }
}

/* ════════════════════════════════════════════════════════════
   QUIZ
   ════════════════════════════════════════════════════════════ */

function renderQuiz(quizId, quiz, title){
  var letters = ['A','B','C','D','E','F'];
  return '' +
    '<div class="el-quiz" id="' + quizId + '" data-total="' + quiz.length + '" data-correct="0" data-answered="0">' +
      '<div class="el-quiz-head">' +
        '<div class="el-quiz-head-l">' +
          '<div class="el-quiz-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>' +
          '<div><div class="el-quiz-ey">Autoevaluación · ' + quiz.length + ' preguntas</div><h3 class="el-quiz-h3">Examen: ' + title + '</h3></div>' +
        '</div>' +
        '<div class="el-quiz-prog"><span class="el-prog-lb">0/' + quiz.length + '</span><div class="el-prog-bar"><div class="fill"></div></div></div>' +
      '</div>' +
      quiz.map(function(q, qi){
        return '' +
          '<div class="el-q" data-q="' + qi + '" data-correct="' + q.correct + '">' +
            '<div class="el-q-num"><span class="n">' + (qi+1) + '</span>Pregunta ' + (qi+1) + '</div>' +
            '<div class="el-q-txt">' + q.q + '</div>' +
            '<div class="el-q-opts">' +
              q.options.map(function(opt, oi){
                return '<button class="el-opt" data-quiz="' + quizId + '" data-q="' + qi + '" data-opt="' + oi + '">' +
                  '<span class="lt">' + letters[oi] + '</span><span>' + opt + '</span>' +
                '</button>';
              }).join('') +
            '</div>' +
            '<div class="el-fb" id="' + quizId + '-fb-' + qi + '"><b>Explicación:</b> ' + q.explain + '</div>' +
          '</div>';
      }).join('') +
      '<div class="el-result" id="' + quizId + '-result">' +
        '<div class="sc"><span class="sc-n">0</span><small>/' + quiz.length + '</small></div>' +
        '<div class="msg"><div class="msg-t">Resultado</div><div class="msg-d" id="' + quizId + '-msg"></div></div>' +
        '<button class="el-retry" data-quiz="' + quizId + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5"/></svg>Reintentar' +
        '</button>' +
      '</div>' +
    '</div>';
}

function handleQuizAnswer(e){
  var btn = e.currentTarget;
  var quizId = btn.getAttribute('data-quiz');
  var qi = +btn.getAttribute('data-q');
  var oi = +btn.getAttribute('data-opt');

  var questionBlock = btn.closest('.el-q');
  if (questionBlock.classList.contains('done')) return;

  var correct = +questionBlock.getAttribute('data-correct');
  var quizWrap = document.getElementById(quizId);
  var isCorrect = oi === correct;

  $$('.el-opt', questionBlock).forEach(function(o, idx){
    o.classList.add('disabled');
    if (idx === correct) o.classList.add('correct');
    if (idx === oi && !isCorrect) o.classList.add('wrong');
  });

  var fb = document.getElementById(quizId + '-fb-' + qi);
  fb.classList.add('show');
  fb.classList.add(isCorrect ? 'ok' : 'err');
  questionBlock.classList.add('done');

  var total = +quizWrap.getAttribute('data-total');
  var answered = +quizWrap.getAttribute('data-answered') + 1;
  var correctCount = +quizWrap.getAttribute('data-correct') + (isCorrect ? 1 : 0);
  quizWrap.setAttribute('data-answered', answered);
  quizWrap.setAttribute('data-correct', correctCount);

  var pct = (answered / total) * 100;
  $('.el-prog-bar .fill', quizWrap).style.width = pct + '%';
  $('.el-prog-lb', quizWrap).textContent = answered + '/' + total;

  if (answered === total){
    var resultBox = document.getElementById(quizId + '-result');
    var msgEl = document.getElementById(quizId + '-msg');
    $('.sc-n', resultBox).textContent = correctCount;

    var msg;
    var pct2 = (correctCount/total)*100;
    if (pct2 === 100) msg = 'Excelente dominio. Estás preparado para el parcial.';
    else if (pct2 >= 80) msg = 'Muy bien. Solo queda afinar algunos detalles clínicos.';
    else if (pct2 >= 60) msg = 'Buen punto de partida. Repasa la información y vuelve a intentarlo.';
    else msg = 'Conviene repasar la explicación antes de reintentar.';
    msgEl.textContent = msg;

    setTimeout(function(){
      resultBox.classList.add('show');
      resultBox.scrollIntoView({ behavior:'smooth', block:'center' });
    }, 300);
  }
}

function handleQuizRetry(e){
  var quizId = e.currentTarget.getAttribute('data-quiz');
  var quizWrap = document.getElementById(quizId);

  quizWrap.setAttribute('data-answered', 0);
  quizWrap.setAttribute('data-correct', 0);
  $('.el-prog-bar .fill', quizWrap).style.width = '0%';
  var total = quizWrap.getAttribute('data-total');
  $('.el-prog-lb', quizWrap).textContent = '0/' + total;

  $$('.el-q', quizWrap).forEach(function(q){
    q.classList.remove('done');
    $$('.el-opt', q).forEach(function(o){ o.classList.remove('disabled','correct','wrong'); });
    $('.el-fb', q).classList.remove('show','ok','err');
  });

  document.getElementById(quizId + '-result').classList.remove('show');
  quizWrap.scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ════════════════════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════════════════════ */

function init(){
  setupTheme();
  renderIndexView();
  updateNavControls();

  var goToIndex = $('#goToIndex');
  if (goToIndex){
    goToIndex.addEventListener('click', function(){ navigateTo('index'); });
  }
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

})(window, document);
