/***********************
 *  Navegação / UI base
 ***********************/
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  addRandomDecorations();
  smoothScroll();
});

function addRandomDecorations() {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    for (let i = 0; i < 3; i++) {
      const leaf = document.createElement('div');
      leaf.classList.add('leaf-decoration', 'float');
      leaf.style.top = `${Math.random() * 80 + 10}%`;
      leaf.style.left = `${Math.random() * 80 + 10}%`;
      leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
      leaf.style.animationDelay = `${Math.random() * 2}s`;
      if (Math.random() > 0.7) {
        section.appendChild(leaf);
      }
    }
  });
}

function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card, .feature-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });
});

/***********************
 *       QUIZ
 ***********************/
const quizContainer = document.querySelector('.quiz-container');

const quizzes = {
  food: [
    { question: "Quando você se olha no espelho, o que geralmente pensa?",
      answers: [
        { text: "Me sinto bem com minha aparência", points: 0 },
        { text: "Sempre encontro defeitos em mim", points: 2 },
        { text: "Depende do dia, às vezes gosto, às vezes não", points: 1 },
        { text: "Evito até me olhar no espelho", points: 3 },
      ],
    },
    { question: "Qual dessas situações mais se parece com você?",
      answers: [
        { text: "Como tranquilo(a), sem pensar muito em calorias", points: 0 },
        { text: "Penso em comida quase o tempo todo", points: 2 },
        { text: "Às vezes como demais e depois me sinto culpado(a)", points: 3 },
        { text: "Já deixei de sair para evitar comer com outras pessoas", points: 2 },
      ],
    },
    { question: "Verdadeiro ou falso: já deixei de comer de propósito mesmo com fome.",
      answers: [
        { text: "Verdadeiro", points: 3 },
        { text: "Falso", points: 0 },
      ],
    },
    { question: "Você costuma pular refeições?",
      answers: [
        { text: "Nunca", points: 0 },
        { text: "Às vezes", points: 1 },
        { text: "Com frequência", points: 2 },
        { text: "Quase sempre", points: 3 },
      ],
    },
    { question: "Seus amigos marcam uma pizza à noite. O que você faz?",
      answers: [
        { text: "Vou tranquilo(a), é só um encontro", points: 0 },
        { text: "Penso se vale a pena pelas calorias", points: 2 },
        { text: "Vou, mas depois penso em compensar", points: 3 },
        { text: "Prefiro não ir para evitar comer", points: 2 },
      ],
    },
    { question: "Você se sente culpado(a) depois de comer algo que gosta?",
      answers: [
        { text: "Não, comida é prazer também", points: 0 },
        { text: "Depende do dia", points: 1 },
        { text: "Quase sempre me sinto culpado(a)", points: 2 },
        { text: "Sim, e tento compensar depois", points: 3 },
      ],
    },
    { question: "Qual dessas frases combina mais com você?",
      answers: [
        { text: "Gosto de comer com a família/amigos", points: 0 },
        { text: "Prefiro comer sozinho(a)", points: 2 },
        { text: "Às vezes evito comer perto de outras pessoas", points: 2 },
        { text: "Não me sinto bem em nenhuma refeição", points: 3 },
      ],
    },
    { question: "Quando pensa em saúde, o que vem primeiro na mente?",
      answers: [
        { text: "Bem-estar geral", points: 0 },
        { text: "Peso e aparência", points: 2 },
        { text: "Evitar engordar a qualquer custo", points: 3 },
        { text: "Ter energia para viver bem", points: 1 },
      ],
    },
  ],

  mental: [
    { question: "Como você se sentiria se tivesse uma apresentação importante amanhã?",
      answers: [
        { text: "Normal, com um friozinho na barriga", points: 0 },
        { text: "Ansioso(a) a ponto de não conseguir dormir", points: 3 },
        { text: "Um pouco nervoso(a), mas consigo lidar", points: 1 },
        { text: "Provavelmente inventaria uma desculpa para não ir", points: 2 },
      ],
    },
    { question: "Qual dessas frases combina mais com você nos últimos dias?",
      answers: [
        { text: "Tenho me sentido bem e animado(a)", points: 0 },
        { text: "Sinto que nada tem graça", points: 3 },
        { text: "Meu humor varia bastante, do nada", points: 2 },
        { text: "Me sinto sobrecarregado(a), mas tento continuar", points: 1 },
      ],
    },
    { question: "Você já deixou de fazer algo que queria por causa do medo do que os outros vão pensar?",
      answers: [
        { text: "Não, sigo em frente sem pensar nisso", points: 0 },
        { text: "Algumas vezes, mas consigo superar", points: 1 },
        { text: "Muitas vezes, já perdi várias oportunidades", points: 2 },
        { text: "Quase sempre, isso me paralisa", points: 3 },
      ],
    },
    { question: "Com que frequência você sente que está sempre cansado(a) ou sem energia?",
      answers: [
        { text: "Quase nunca", points: 0 },
        { text: "Às vezes", points: 1 },
        { text: "Muitas vezes", points: 2 },
        { text: "Quase sempre", points: 3 },
      ],
    },
    { question: "Verdadeiro ou falso: Já tive crises de choro ou irritação sem motivo aparente.",
      answers: [
        { text: "Verdadeiro", points: 2 },
        { text: "Falso", points: 0 },
      ],
    },
    { question: "Se algo dá errado no seu dia, qual dessas frases mais se parece com você?",
      answers: [
        { text: "Penso que amanhã será melhor", points: 0 },
        { text: "Me culpo e fico remoendo o erro", points: 2 },
        { text: "Levo como aprendizado, mesmo se for difícil", points: 1 },
        { text: "Sinto que nada nunca dá certo", points: 3 },
      ],
    },
    { question: "Como você se sente em eventos sociais?",
      answers: [
        { text: "Tranquilo(a), gosto de conversar", points: 0 },
        { text: "Um pouco tímido(a), mas participo", points: 1 },
        { text: "Ansioso(a), evito falar muito", points: 2 },
        { text: "Prefiro não ir, me sinto mal", points: 3 },
      ],
    },
    { question: "Na maior parte do tempo, você se sente…",
      answers: [
        { text: "Motivado(a) e otimista", points: 0 },
        { text: "Cansado(a), mas sigo em frente", points: 1 },
        { text: "Sem vontade de fazer nada", points: 2 },
        { text: "Triste e sem esperança", points: 3 },
      ],
    },
  ],
};

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;

function showQuizChoice() {
  if (!quizContainer) return;
  quizContainer.innerHTML = `
    <div class="quiz-card" style="text-align:center;">
      <h3 class="quiz-question">Escolha um quiz para começar</h3>
      <div class="quiz-choice-buttons" style="display:flex; justify-content:center; gap:20px;">
        <button class="btn" id="start-food-disorder-quiz">Quiz: Transtornos Alimentares</button>
        <button class="btn" id="start-mental-disorder-quiz">Quiz: Transtornos Mentais</button>
      </div>
    </div>
  `;
  document.getElementById('start-food-disorder-quiz')?.addEventListener('click', () => startQuiz('food'));
  document.getElementById('start-mental-disorder-quiz')?.addEventListener('click', () => startQuiz('mental'));
}

function startQuiz(type) {
  currentQuiz = quizzes[type];
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  if (!quizContainer || !currentQuiz) return;
  const questionObj = currentQuiz[currentQuestionIndex];
  quizContainer.innerHTML = `
    <div class="quiz-card">
      <h3 class="quiz-question">${questionObj.question}</h3>
      <div class="quiz-options">
        ${questionObj.answers.map(answer => `<div class="quiz-option" data-points="${answer.points}"><p>${answer.text}</p></div>`).join('')}
      </div>
      <div class="quiz-buttons">
        <button class="btn" id="prev-btn" ${currentQuestionIndex === 0 ? 'disabled style="opacity:.6;cursor:not-allowed;"' : ''}>Anterior</button>
        <button class="btn" id="next-btn" disabled>Próxima</button>
      </div>
    </div>
  `;

  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const options = document.querySelectorAll('.quiz-option');
  let selectedPoints = null;

  options.forEach(option => {
    option.addEventListener('click', () => {
      options.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      selectedPoints = parseInt(option.getAttribute('data-points'));
      nextBtn.disabled = false;
    });
  });

  nextBtn.addEventListener('click', () => {
    if (selectedPoints === null) return;
    score += selectedPoints;
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
      showQuestion();
    } else {
      showResult();
    }
  });
  prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      showQuestion();
    }
  });
}

function showResult() {
  if (!quizContainer || !currentQuiz) return;
  let diagnosis = "";
  let advice = "";

  if (currentQuiz === quizzes.food) {
    if (score <= 5) {
      diagnosis = "Você não apresenta sinais fortes de transtornos alimentares.";
      advice = "Continue cuidando bem da sua saúde e procure ajuda se sentir necessidade.";
    } else if (score <= 10) {
      diagnosis = "Você pode estar em risco de desenvolver um transtorno alimentar.";
      advice = "Fique atento aos sinais e, se possível, busque orientação profissional.";
    } else {
      diagnosis = "Você apresenta sinais que indicam a possibilidade de um transtorno alimentar.";
      advice = "É muito importante procurar um profissional de saúde para avaliação e apoio.";
    }
  } else if (currentQuiz === quizzes.mental) {
    if (score <= 5) {
      diagnosis = "Você não apresenta sinais fortes de transtornos mentais.";
      advice = "Continue cuidando da sua saúde mental e procure ajuda se necessário.";
    } else if (score <= 10) {
      diagnosis = "Você pode estar em risco de desenvolver um transtorno mental.";
      advice = "Fique atento aos sinais e considere buscar orientação profissional.";
    } else {
      diagnosis = "Você apresenta sinais que indicam a possibilidade de um transtorno mental.";
      advice = "É muito importante procurar um profissional de saúde mental para avaliação e suporte.";
    }
  }

  quizContainer.innerHTML = `
    <div class="quiz-card" style="text-align:center; padding:40px;">
      <h3 class="quiz-question" style="font-size:1.6rem; margin-bottom:25px; color:var(--verde-forte);">🎉 Resultado do Quiz</h3>
      <div style="background: var(--verde-claro); color: var(--preto); padding:20px; border-radius:15px; margin-bottom:20px; box-shadow: var(--sombra-suave);">
        <p style="font-size:1.2rem; font-weight:700; margin-bottom:10px;">${diagnosis}</p>
        <p style="font-size:1rem;">${advice}</p>
      </div>
      <button class="btn" id="restart-btn" style="margin-top:20px;">Refazer Quiz</button>
    </div>
  `;
  document.getElementById('restart-btn')?.addEventListener('click', showQuizChoice);
}
showQuizChoice();

/***********************
 *  CHAT – Fluxo determinístico (reset a cada reload)
 ***********************/
(function(){
  const qs = sel => document.querySelector(sel);
  const chatMessages = qs('#chatMessages');
  const chatForm = qs('#chatForm');
  const chatInput = qs('#chatInput');
  const chatTyping = qs('#chatTyping');
  if(!chatMessages || !chatForm || !chatInput) return;

  // ===== Helpers UI =====
  const nowTime = () => new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  const sanitize = s => String(s||'').replace(/[<>]/g, m => ({'<':'&lt;','>':'&gt;'}[m]));
  function appendMsg({role, text, time}){
    const div = document.createElement('div');
    div.className = `message ${role === 'user' ? 'message-sent' : 'message-received'}`;
    div.innerHTML = `${sanitize(text)}<span class="message-time">${time || nowTime()}</span>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  function setTyping(show){
    chatTyping?.classList.toggle('show', !!show);
    chatTyping?.setAttribute('aria-hidden', show ? 'false':'true');
  }

  // ===== Normalização & detecção =====
  const rmDia = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const norm   = s => rmDia(String(s||'').toLowerCase().trim());

  const THEMES = [
    { key:'risco',    patt:[/suicid/,/me\s*matar/,/tirar\s*a\s*vida/,/auto(a)?gress/,/me\s*machucar/] },
    { key:'ansiedade',patt:[/ansios/,/nervos/,/taquicard/,/preocupad/,/angust/,/panico/] },
    { key:'tristeza', patt:[/trist/,/desanima/,/chorar/,/sem\s*esper/,/pra\s*baixo/] },
    { key:'sono',     patt:[/insonia/,/dormir/,/sono/,/pesadelo/] },
    { key:'motivacao',patt:[/motiv/,/procrast/,/sem\s*vontade/] }
  ];

  function detectTheme(text){
    const t = norm(text);
    if (THEMES[0].patt.some(re=>re.test(t))) return 'risco';
    for (const th of THEMES.slice(1)){
      if (th.patt.some(re=>re.test(t))) return th.key;
    }
    return null;
  }

  // ===== Respostas determinísticas =====
  const RESP = {
    risco: [
      "Sinto muito que você esteja passando por isso. Você não está sozinho(a).",
      "Se estiver em perigo imediato, ligue 190.",
      "O CVV atende 24h no 188 (gratuito)."
    ],
    ansiedade: [
      "A ansiedade aperta mesmo. Experimente a técnica 4-7-8: inspire 4s, segure 7s e expire 8s.",
      "Outra dica: anote o pensamento e pergunte-se se há evidências reais para ele.",
      "Solte ombros e respire devagar por 60s."
    ],
    tristeza: [
      "Sinto muito. Você quer me contar um pouco mais sobre o que te deixou assim?",
      "Às vezes ajuda escrever 5 linhas sobre o que sente — sem se julgar.",
      "Falar com alguém de confiança pode aliviar."
    ],
    sono: [
      "Uma rotina de sono ajuda: tente deitar e levantar nos mesmos horários.",
      "Evite cafeína nas 6h antes de dormir.",
      "Descarregue a mente num papel antes de deitar."
    ],
    motivacao: [
      "Comece com 5 minutos só — às vezes a motivação vem depois de começar.",
      "Separe planejar (no papel) de executar (ação).",
      "Celebre microvitórias: marcar 'feito' reativa a motivação."
    ],
    generico: [
      "Obrigado por compartilhar. Quer me contar mais?",
      "Entendi. O que você acha que te ajudaria agora?",
      "Estou aqui para ouvir."
    ]
  };

  // ===== Estado simples em memória (reseta no reload) =====
  let theme = null;
  let step  = 0;

  async function planReply(userText){
    // detecção de tema se ainda não fixado
    if (!theme) theme = detectTheme(userText);

    if (theme && RESP[theme]){
      const arr = RESP[theme];
      const msg = arr[step % arr.length];
      step++;
      return msg;
    }

    // fallback genérico
    const arr = RESP.generico;
    const msg = arr[step % arr.length];
    step++;
    return msg;
  }

  // ===== Envio / UI =====
  chatForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    let text = chatInput.value.trim();
    if(!text) return;

    appendMsg({role:'user', text});
    chatInput.value = '';

    setTyping(true);
    let reply = '';
    try{
      await new Promise(r=>setTimeout(r, 300));
      reply = await planReply(text);
    }catch{
      reply = 'Desculpe, não consegui responder agora.';
    } finally {
      setTyping(false);
    }

    appendMsg({role:'bot', text: reply});
  });

  chatInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
      e.preventDefault();
      chatForm.requestSubmit();
    }
  });

  // Mensagem inicial
  appendMsg({role:'bot', text:'Olá! Como você está se sentindo hoje?'});
})();
