/* EmbryoLab PRO · DATA — temas, anomalías, quizzes */
(function(window){
  'use strict';

/* ════════════════════════════════════════════════════════════
   CONFIG
   ════════════════════════════════════════════════════════════ */

// URL del archivo .glb del Método ABDI (debe estar junto al HTML)
var ABDI_METHOD_MODEL = './public/abdi-method.glb';

var ICONS = {
  muscular: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2c0 4 2 6 6 6s6-2 6-6"/><path d="M6 22c0-4 2-6 6-6s6 2 6 6"/><path d="M8 8c0 2 1.5 3 4 4s4 2 4 4"/><path d="M16 8c0 2-1.5 3-4 4s-4 2-4 4"/></svg>',
  esqueletico: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="5" r="2"/><circle cx="17" cy="5" r="2"/><circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M9 5h6M9 19h6M7 7v10M17 7v10M5 12h14"/></svg>',
  cardiovascular: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-4.5-9-9C1.5 8.5 4 5 7.5 5c1.7 0 3.3 1 4.5 2.5C13.2 6 14.8 5 16.5 5 20 5 22.5 8.5 21 12c-2 4.5-9 9-9 9z"/></svg>',
  faringeos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M6 6c2 1 4 1 6 1s4 0 6-1"/><path d="M5 10c2.5 1 4.5 1 7 1s4.5 0 7-1"/><path d="M5 14c2.5 1 4.5 1 7 1s4.5 0 7-1"/><path d="M6 18c2 1 4 1 6 1s4 0 6-1"/></svg>',
  cara: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c5 0 8 4 8 9 0 6-3 9-8 9s-8-3-8-9c0-5 3-9 8-9z"/><circle cx="9" cy="11" r=".8" fill="currentColor"/><circle cx="15" cy="11" r=".8" fill="currentColor"/><path d="M10 16c.8.8 3.2.8 4 0"/></svg>'
};

/* ════════════════════════════════════════════════════════════
   DATA
   ════════════════════════════════════════════════════════════ */

var TEMA_MUSCULAR = {
  id: 'muscular',
  name: 'Sistema muscular',
  short: 'Muscular',
  icon: ICONS.muscular,
  desc: 'El tejido muscular se origina del mesodermo. Los somitas, derivados del mesodermo paraxial, dan lugar a la musculatura esquelética del tronco y las extremidades.',
  anomalies: [
    {
      id: 'prune-belly',
      title: 'Abdomen en ciruela pasa',
      tag: 'Síndrome de Eagle-Barrett',
      desc: 'Ausencia parcial o total de la musculatura del abdomen, con piel arrugada característica que recuerda una ciruela pasa.',
      shortInfo: 'El síndrome de <b>Eagle-Barrett</b> o <b>Prune Belly</b> es un trastorno congénito raro caracterizado por una tríada clásica: deficiencia de la musculatura abdominal, anomalías severas del tracto urinario y criptorquidia bilateral. Afecta casi exclusivamente a varones (<b>> 95% de los casos</b>) y su incidencia es de aproximadamente <b>1:30.000–40.000</b> nacidos vivos. El defecto embriológico ocurre entre la <b>6ª y 10ª semana</b>, comprometiendo el mesodermo lateral somático. La laxitud de la pared abdominal produce el característico aspecto "en ciruela pasa". El pronóstico depende principalmente del grado de displasia renal e hipoplasia pulmonar asociadas.',
      model3d: { provider: 'vectary', url: 'https://app.vectary.com/p/4wFcqbCxqrIEwaYv5DMvsD' },
      quickSpecs: [
        { v: '1:30K', l: 'Incidencia' },
        { v: '♂ 95%', l: 'Sexo' },
        { v: '6–10ª', l: 'Semana' }
      ],
      quiz: [
        { q: '¿Cuál es la tríada clásica del síndrome del abdomen en ciruela pasa?',
          options: ['Polidactilia + sindactilia + craneosinostosis','Ausencia de musculatura abdominal + anomalías urinarias + criptorquidia bilateral','Hernia diafragmática + escoliosis + pie equinovaro','Dextrocardia + situs inversus + agenesia esplénica'],
          correct: 1,
          explain: 'La tríada clásica de <b>Eagle-Barrett</b> incluye: <b>(1)</b> deficiencia de la musculatura abdominal, <b>(2)</b> anomalías severas del tracto urinario (megavejiga, megauréteres), y <b>(3)</b> criptorquidia bilateral.' },
        { q: '¿En qué sexo y con qué frecuencia se presenta predominantemente el Prune Belly?',
          options: ['Mujeres, en más del 80% de los casos','Varones, en más del 95% de los casos','Distribución equitativa entre ambos sexos','Solamente en recién nacidos pretérmino'],
          correct: 1,
          explain: 'El síndrome afecta casi exclusivamente al <b>sexo masculino</b> (<b>> 95%</b> de los casos). La presentación femenina es excepcional y generalmente más leve.' },
        { q: '¿Qué hoja del mesodermo está involucrada en la formación de la pared abdominal defectuosa?',
          options: ['Mesodermo paraxial (somitas)','Mesodermo intermedio','Mesodermo lateral somático (hoja parietal)','Mesodermo axial (notocorda)'],
          correct: 2,
          explain: 'La musculatura y el tejido conectivo de la pared abdominal derivan del <b>mesodermo lateral somático</b> (hoja parietal).' },
        { q: '¿Qué complicación pulmonar grave puede acompañar al Prune Belly y por qué?',
          options: ['Fibrosis pulmonar idiopática, por toxicidad del líquido amniótico','Hipoplasia pulmonar, por oligohidramnios secundario a la displasia renal','Enfisema congénito, por exceso de presión abdominal','Neumonía aspirativa, por inmadurez del reflejo deglutorio'],
          correct: 1,
          explain: 'La displasia renal genera <b>oligohidramnios</b>, lo que impide la distensión adecuada de los pulmones fetales y provoca <b>hipoplasia pulmonar</b>.' },
        { q: '¿Cuál de las siguientes afirmaciones sobre el manejo del Prune Belly es correcta?',
          options: ['La orquidopexia bilateral debe realizarse en la pubertad','La abdominoplastia reconstructiva es habitualmente innecesaria','El pronóstico depende del grado de displasia renal e hipoplasia pulmonar','No requiere seguimiento urológico a largo plazo'],
          correct: 2,
          explain: 'El <b>pronóstico vital y funcional</b> depende del grado de <b>displasia renal</b> y la severidad de la <b>hipoplasia pulmonar</b>.' }
      ]
    },
    {
      id: 'distrofia-muscular',
      title: 'Distrofia Muscular',
      tag: 'Miopatía progresiva',
      desc: 'Agotamiento y debilidad muscular progresiva. La más común es la de Duchenne, que afecta más a hombres. Causada por mutación del gen distrofina.',
      shortInfo: 'La <b>distrofia muscular de Duchenne</b> (DMD) es la miopatía congénita más frecuente. Se produce por una mutación en el gen <b>DMD</b> localizado en el brazo corto del cromosoma X (<b>Xp21.2</b>), que codifica la proteína <b>distrofina</b>. Su herencia es <b>recesiva ligada al X</b>, por lo que afecta casi exclusivamente a varones (≈ <b>1:3.500 nacidos vivos</b>). Clínicamente debuta entre los <b>2 y 5 años</b> con retraso de la marcha, caídas frecuentes, pseudohipertrofia de pantorrillas y el característico <b>signo de Gowers</b>. La elevación de la <b>creatina fosfoquinasa (CPK)</b> hasta 10–100 veces los valores normales es el marcador bioquímico de sospecha. La variante de <b>Becker</b> es alélica y más benigna.',
      model3d: { provider: 'vectary', url: 'https://app.vectary.com/p/3mVBsDrblGOm0UqJPNFF9i' },
      quickSpecs: [
        { v: '1:3.5K', l: 'Incidencia' },
        { v: 'X-R', l: 'Herencia' },
        { v: '2–5 y', l: 'Debut' }
      ],
      quiz: [
        { q: '¿Cuál es el gen mutado y su localización cromosómica en la distrofia muscular de Duchenne?',
          options: ['DMD, localizado en Xp21.2','LMNA, localizado en el cromosoma 1q22','SMN1, localizado en el cromosoma 5q13','COL6A1, localizado en el cromosoma 21q22'],
          correct: 0,
          explain: 'El gen <b>DMD</b> se localiza en el brazo corto del cromosoma X (<b>Xp21.2</b>) y codifica la distrofina.' },
        { q: '¿Por qué la distrofia de Duchenne afecta predominantemente a varones?',
          options: ['Porque la testosterona acelera la degeneración muscular','Porque la herencia es recesiva ligada al cromosoma X','Porque el gen es autosómico dominante con expresividad variable','Porque los varones tienen más fibras musculares tipo II'],
          correct: 1,
          explain: 'La DMD es <b>recesiva ligada al X</b>. Los varones con un único cromosoma X expresan la enfermedad si heredan el alelo mutado.' },
        { q: '¿Qué signo clínico característico refleja la debilidad proximal de los miembros inferiores en la DMD?',
          options: ['Signo de Babinski','Signo de Lasègue','Signo de Gowers','Signo de Tinel'],
          correct: 2,
          explain: 'El <b>signo de Gowers</b> consiste en que el niño se incorpora del suelo apoyando las manos sobre sus muslos para "trepar" por sus piernas.' },
        { q: 'Respecto al origen embriológico del músculo esquelético afectado en la DMD, ¿cuál es correcto?',
          options: ['Deriva del mesodermo intermedio','Deriva del dermomiotoma de los somitas (mesodermo paraxial)','Deriva del ectodermo superficial','Deriva del endodermo visceral'],
          correct: 1,
          explain: 'El músculo esquelético se origina del <b>dermomiotoma</b> de los somitas, derivados del <b>mesodermo paraxial</b>.' },
        { q: '¿Qué marcador bioquímico se encuentra notablemente elevado y es útil para el cribado de DMD?',
          options: ['Troponina I cardíaca','Creatina fosfoquinasa (CPK)','Lactato deshidrogenasa (LDH) exclusivamente','Alfa-fetoproteína'],
          correct: 1,
          explain: 'La <b>creatina fosfoquinasa (CPK)</b> se eleva <b>10 a 100 veces</b> desde el nacimiento y es el marcador bioquímico clave.' }
      ]
    },
    {
      id: 'poland',
      title: 'Secuencia de Poland',
      tag: 'Hipoplasia torácica unilateral',
      desc: 'Ausencia de pectoral menor y parcial del pectoral mayor, pezón y areola desplazados o ausentes, sindactilia (dedos fusionados), braquidactilia (dedos cortos).',
      shortInfo: 'La <b>secuencia de Poland</b> es una malformación congénita caracterizada por <b>ausencia unilateral de la porción esternocostal del pectoral mayor</b>, asociada a anomalías homolaterales de la pared torácica, mama y extremidad superior (sindactilia, braquidactilia). Su etiología más aceptada es la <b>interrupción vascular transitoria</b> de la arteria subclavia durante la <b>6ª semana</b> del desarrollo embrionario. Es habitualmente esporádica, con incidencia de <b>1:20.000–30.000</b> nacimientos, predominio en varones (3:1) y afectación preferente del <b>lado derecho</b> (≈ 75%). Cuando se asocia a parálisis facial congénita forma el <b>síndrome de Poland-Möbius</b>.',
      model3d: { provider: 'vectary', url: 'https://app.vectary.com/p/0rNONmiuheRoSEV9Lmg5uq' },
      quickSpecs: [
        { v: '1:20K', l: 'Incidencia' },
        { v: 'Der. 75%', l: 'Lateralidad' },
        { v: '6ª sem.', l: 'Origen' }
      ],
      quiz: [
        { q: '¿Cuál es la hipótesis etiológica más aceptada para la secuencia de Poland?',
          options: ['Mutación dominante del gen HOXD13','Interrupción vascular de la arteria subclavia en la 6ª semana','Déficit materno de ácido fólico','Exposición fetal a talidomida'],
          correct: 1,
          explain: 'La teoría más aceptada propone una <b>interrupción transitoria del flujo sanguíneo en la arteria subclavia</b> o sus ramas hacia la <b>6ª semana</b>.' },
        { q: '¿Qué músculo está característicamente afectado en la secuencia de Poland?',
          options: ['La porción clavicular del pectoral mayor','La porción esternocostal del pectoral mayor','El músculo dorsal ancho','El músculo trapecio superior'],
          correct: 1,
          explain: 'El signo cardinal es la ausencia de la <b>porción esternocostal (cabeza inferior) del pectoral mayor</b>.' },
        { q: 'Señala la combinación clínica más característica de la secuencia de Poland:',
          options: ['Ausencia pectoral + sindactilia + braquidactilia ipsilaterales','Polidactilia bilateral + luxación de cadera','Escoliosis lumbar + pie equinovaro','Macrodactilia + hemangioma facial'],
          correct: 0,
          explain: 'La tríada típica combina <b>ausencia parcial del pectoral mayor</b>, <b>sindactilia</b> y <b>braquidactilia</b>, todos del <b>mismo lado</b>.' },
        { q: '¿Cuál es la distribución epidemiológica clásica de la secuencia de Poland?',
          options: ['Predominio en mujeres y afectación izquierda','Predominio en varones y afectación derecha','Distribución equitativa entre sexos y lados','Predominio en mujeres y afectación bilateral'],
          correct: 1,
          explain: 'Predominio en <b>varones</b> (3:1) y afectación preferente del <b>lado derecho</b> (≈ 75%).' },
        { q: '¿Qué estructura embrionaria se ve afectada, explicando simultáneamente el defecto muscular y el de la mano?',
          options: ['El tubo neural en su porción cervical','El brote de la extremidad superior y el miotomo torácico adyacente','El endodermo del intestino anterior','El ectodermo superficial del cuello'],
          correct: 1,
          explain: 'La isquemia afecta al <b>brote de la extremidad superior</b> y al <b>miotomo torácico adyacente</b>, explicando ambos defectos ipsilaterales.' }
      ]
    }
  ]
};

var TOPICS = [
  TEMA_MUSCULAR,
  { id: 'esqueletico', name: 'Sistema esquelético', short: 'Esquelético', icon: ICONS.esqueletico, desc: 'Malformaciones del desarrollo óseo, cartilaginoso y articular derivadas del mesodermo paraxial y de la cresta neural.', pending: true },
  { id: 'cardiovascular', name: 'Sistema cardiovascular', short: 'Cardiovascular', icon: ICONS.cardiovascular, desc: 'Cardiopatías congénitas originadas en defectos de tabicación y del tracto de salida durante la 3ª–8ª semana.', pending: true },
  { id: 'faringeos', name: 'Arcos faríngeos', short: 'Faríngeos', icon: ICONS.faringeos, desc: 'Anomalías derivadas de los arcos, bolsas y hendiduras faríngeas del cuello, oído y glándulas.', pending: true },
  { id: 'cara', name: 'Desarrollo de la cara', short: 'Cara', icon: ICONS.cara, desc: 'Malformaciones de los procesos frontonasal, maxilar y mandibular y de la fusión palatina.', pending: true }
];

/* ════════════════════════════════════════════════════════════
   STATE & ROUTER
   ════════════════════════════════════════════════════════════ */

  window.EL_DATA = { ICONS: ICONS, TOPICS: TOPICS, ABDI_METHOD_MODEL: ABDI_METHOD_MODEL };
})(window);
