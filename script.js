// Independent Matrix streams: dense columns, staggered starts and varied fall speeds.
(() => {
  const canvas = document.getElementById('matrixRain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const chars = 'アァカサタナハマヤャラワガザダバパ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let width = 0, height = 0, streams = [], dpr = 1;
  const fontSize = 13;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth; height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px'; canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.ceil(width / (fontSize * 0.82));
    streams = Array.from({length: count}, (_, i) => ({
      x: i * fontSize * 0.82,
      y: -Math.random() * height * 2,
      speed: 1.2 + Math.random() * 3.6,
      length: 8 + Math.floor(Math.random() * 24),
      tick: Math.floor(Math.random() * 8),
      alpha: .22 + Math.random() * .42
    }));
  }
  function draw() {
    ctx.fillStyle = 'rgba(1, 8, 10, 0.12)';
    ctx.fillRect(0, 0, width, height);
    ctx.font = `bold ${fontSize}px monospace`;
    streams.forEach(s => {
      if (++s.tick % 2 === 0) {
        const head = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = `rgba(205,255,190,${Math.min(.9, s.alpha + .35)})`;
        ctx.shadowColor = '#8dff00'; ctx.shadowBlur = 10;
        ctx.fillText(head, s.x, s.y);
        ctx.shadowBlur = 0;
        for (let n = 1; n < s.length; n++) {
          const ch = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillStyle = `rgba(0, ${145 + Math.floor(Math.random()*95)}, ${65 + Math.floor(Math.random()*55)}, ${s.alpha * (1 - n/s.length)})`;
          ctx.fillText(ch, s.x, s.y - n * fontSize);
        }
      }
      s.y += s.speed;
      if (s.y - s.length * fontSize > height && Math.random() > .965) {
        s.y = -Math.random() * height * .7;
        s.speed = 1.2 + Math.random() * 3.6;
        s.length = 8 + Math.floor(Math.random() * 24);
        s.alpha = .22 + Math.random() * .42;
      }
    });
    setTimeout(draw, 1000 / 30);
  }
  resize();
  window.addEventListener('resize', resize, {passive:true});
  draw();
})();

const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

const dropdown = document.querySelector('.nav-dropdown');
const dropdownToggle = document.querySelector('.dropdown-toggle');
dropdownToggle?.addEventListener('click', () => {
  const open = dropdown.classList.toggle('open');
  dropdownToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks?.classList.remove('open');
  dropdown?.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = '☰';
}));

document.getElementById('year').textContent = new Date().getFullYear();

const modal = document.getElementById('overviewModal');
const overviewButton = document.getElementById('overviewButton');
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
overviewButton?.addEventListener('click', () => {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('.modal-close').focus();
});
modal?.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
document.getElementById('modalContact')?.addEventListener('click', closeModal);

const BUSINESS_EMAIL = 'ask.an.it.now@gmail.com';
document.getElementById('contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`G-Plus project inquiry: ${form.get('service')}`);
  const body = encodeURIComponent(
    `Name: ${form.get('name')}\nEmail: ${form.get('email')}\nService: ${form.get('service')}\n\nProject details:\n${form.get('message')}`
  );
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});




// Reliable automatic custom-systems showcase beside WHO WE ARE.
// Resolve every image from the folder containing this script so it also works
// on GitHub Pages project URLs (which may include a repository sub-path).
(() => {
  const root = document.getElementById('systemsCarousel');
  if (!root) return;

  const scriptElement = document.currentScript;
  const scriptBase = new URL('.', scriptElement && scriptElement.src
    ? scriptElement.src
    : window.location.href);

  const image = document.getElementById('systemsCarouselImage');
  const title = document.getElementById('systemsTitle');
  const category = document.getElementById('systemsCategory');
  const counter = document.getElementById('systemsCounter');
  const dots = Array.from(root.querySelectorAll('.systems-dot'));
  const slides = Array.from(root.querySelectorAll('.systems-slide-data span')).map(item => ({
    src: new URL(item.dataset.src, scriptBase).href,
    title: item.dataset.title,
    category: item.dataset.category
  }));

  if (!image || !title || !category || !counter || slides.length < 2) return;

  let current = 0;
  let rotationTimer = null;
  let requestToken = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    const slide = slides[current];
    const token = ++requestToken;

    title.textContent = slide.title;
    category.textContent = slide.category;
    counter.textContent =
      `${String(current + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      if (i === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });

    image.classList.add('is-loading');
    const preload = new Image();
    preload.onload = () => {
      if (token !== requestToken) return;
      image.src = slide.src;
      image.alt = `${slide.title} dashboard screenshot`;
      image.classList.remove('is-loading');
      image.classList.remove('image-error');
    };
    preload.onerror = () => {
      if (token !== requestToken) return;
      image.classList.remove('is-loading');
      image.classList.add('image-error');
      console.error('G-Plus showcase image could not be loaded:', slide.src);
    };
    preload.src = slide.src;
  }

  function startRotation() {
    if (rotationTimer) window.clearInterval(rotationTimer);
    rotationTimer = window.setInterval(() => {
      showSlide(current + 1);
    }, 5000);
  }

  // Dot navigation remains available, but the carousel does not depend on clicks.
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      startRotation();
    });
  });

  // Keep the carousel moving while the pointer is over it. Only pause when the
  // browser tab is hidden, then resume automatically when the visitor returns.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rotationTimer) window.clearInterval(rotationTimer);
      rotationTimer = null;
    } else {
      startRotation();
    }
  });

  // Force the initial image through the same reliable URL-resolution path.
  showSlide(0);
  startRotation();
})();


// G-Plus visitor support: separate contact pop-out and company information assistant.
(() => {
  const contactModal = document.getElementById('contactSupportModal');
  const companyModal = document.getElementById('companyAiModal');
  const contactTrigger = document.getElementById('aiQueryTrigger');
  const chatTrigger = document.getElementById('aiChatTrigger');
  let lastTrigger = null;

  function openSupport(modal, trigger) {
    if (!modal) return;
    [contactModal, companyModal].forEach(item => {
      if (item) {
        item.classList.remove('open');
        item.setAttribute('aria-hidden', 'true');
      }
    });
    lastTrigger = trigger;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.support-close')?.focus();
  }

  function closeSupport(modal) {
    if (!modal || !modal.classList.contains('open')) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    lastTrigger?.focus();
  }

  contactTrigger?.addEventListener('click', () => openSupport(contactModal, contactTrigger));
  chatTrigger?.addEventListener('click', () => openSupport(companyModal, chatTrigger));

  document.querySelectorAll('[data-close-support]').forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.support-modal');
      closeSupport(modal);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      [contactModal, companyModal].forEach(closeSupport);
    }
  });

  document.getElementById('copySupportEmail')?.addEventListener('click', async event => {
    const button = event.currentTarget;
    const email = 'ask.an.it.now@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      button.textContent = 'COPIED!';
    } catch {
      button.textContent = email;
    }
    window.setTimeout(() => { button.textContent = 'COPY EMAIL'; }, 2200);
  });

  // Zero-cost G-Plus company knowledge assistant.
  // Runs entirely in the visitor's browser: no API key, external AI call, or paid service.
  const chatMessages = document.getElementById('aiChatMessages');
  const chatForm = document.getElementById('aiChatForm');
  const chatInput = document.getElementById('aiChatInput');

  const knowledge = [
    {
      id: 'services',
      terms: ['services','service list','what do you offer','what can you do','offerings'],
      title: 'G-Plus services',
      answer: 'G-Plus Tech Solution serves businesses and individuals through nine services: Website Creation; AI Solutions & Automation; Customized Business System development; IT & Digital Solutions; UI/UX Design; Digital Marketing; Computer & Technical Support; Business Process Automation; and IT Computer Maintenance for businesses.',
      follow: 'Which of these areas would you like to explore?'
    },
    {
      id: 'website',
      terms: ['website','web site','web design','web development','website creation','create a website','landing page','online presence','website redesign'],
      title: 'Website creation',
      answer: 'G-Plus provides website creation, design, and development for businesses and individuals. A project can include planning the page structure, visual design, responsive layouts for phones and desktops, and implementation. The exact scope depends on the pages and functions you need.',
      follow: 'Are you looking for a new website, a redesign, or a specific feature?'
    },
    {
      id: 'systems',
      terms: ['custom system','customized business system','customised business system','business system','software','web application','management system','dashboard','system development'],
      title: 'Customized business systems',
      answer: 'G-Plus develops customized business systems based on the way an organization works. The website showcase includes examples across point of sale, clinic and patient management, gasoline station operations, HR, industrial inventory, lending, payroll, personal finance, and sugarcane farm operations. Features and scope are planned around each client’s requirements.',
      follow: 'What type of business do you operate, and which process would you like the system to manage?'
    },
    {
      id: 'pos',
      terms: ['pos','point of sale','cash register','retail sales','sales system'],
      title: 'POS management systems',
      answer: 'The G-Plus showcase includes a POS Management System. A tailored POS project can be scoped around your products or services, sales workflow, records, and reporting needs. Specific functions should be confirmed during project discovery.',
      follow: 'Is your POS for a retail store, restaurant, or another type of business?'
    },
    {
      id: 'clinic',
      terms: ['doctor','clinic','patient','medical','appointment','healthcare'],
      title: 'Doctor and patient management',
      answer: 'The G-Plus portfolio includes a Doctor and Patient Management System. If you need a clinic solution, we can discuss the workflows you want to support, such as patient records, appointments, and administrative processes. Any medical-data requirements need to be reviewed carefully before development.',
      follow: 'Are you managing a clinic, a private practice, or another healthcare service?'
    },
    {
      id: 'gas',
      terms: ['gasoline','gas station','fuel station','petrol station','bir','fuel inventory'],
      title: 'Gasoline station management',
      answer: 'The portfolio includes a Gasoline Station Management System with BIR-related workflow coverage. We can discuss your station’s sales, inventory, purchasing, invoice records, reporting, and compliance-related requirements. Exact tax and filing features must be validated against your current requirements.',
      follow: 'Would you like to focus on sales, inventory, purchase invoices, or reporting?'
    },
    {
      id: 'hrpayroll',
      terms: ['hris','human resources','hr management','employee records','payroll','salary','attendance','leave'],
      title: 'HR and payroll systems',
      answer: 'G-Plus showcases HR Management and Payroll Management systems. A project can be scoped around employee information, attendance, leave, payroll calculations, deductions, and reports. Statutory rules and payroll settings should be confirmed for the country and business involved.',
      follow: 'Do you need HR records, payroll, attendance, or a combined HR and payroll system?'
    },
    {
      id: 'inventory',
      terms: ['inventory','stock','warehouse','industrial inventory','project return','materials tracking'],
      title: 'Inventory and project tracking',
      answer: 'The G-Plus portfolio includes an Industrial Inventory and Project Return Tracker. We can discuss stock records, item movement, project allocations, returns, and reporting based on your operation. The final features depend on your workflow.',
      follow: 'Are you tracking warehouse stock, project materials, retail inventory, or all three?'
    },
    {
      id: 'lending',
      terms: ['lending','loan','borrower','collection','amortization','payment schedule'],
      title: 'Lending management',
      answer: 'The portfolio includes a Lending Management System. If you operate a lending business, we can discuss borrower records, loan tracking, payment schedules, collections, and management reports. The applicable legal and financial requirements need to be confirmed for your location.',
      follow: 'Are you looking for loan tracking, collections, payment schedules, or a complete lending workflow?'
    },
    {
      id: 'finance',
      terms: ['personal finance','cash flow','budget tracker','expenses','income tracker'],
      title: 'Personal finance and cash flow',
      answer: 'The G-Plus showcase includes a Personal Finance and Cash Flow Tracker. It is an example of a tool designed to help organize financial information. Tell us whether you need personal budgeting, income and expense tracking, or cash-flow summaries.',
      follow: 'Which financial activities would you like to track?'
    },
    {
      id: 'farm',
      terms: ['sugarcane','sugar cane','farm management','agriculture','farm payroll','farm operations'],
      title: 'Agriculture and farm systems',
      answer: 'The portfolio includes a Sugarcane Farm and Payroll Management System. We can discuss farm operations, workforce records, payroll workflows, and reporting that fit your operation. The precise modules are agreed during project planning.',
      follow: 'Are you managing one farm or multiple sites, and what information do you need to track?'
    },
    {
      id: 'ai',
      terms: ['artificial intelligence',' ai ','ai solution','ai tools','chatbot','automation','automate','workflow automation','repetitive task'],
      title: 'AI solutions and automation',
      answer: 'G-Plus offers AI Solutions & Automation and Business Process Automation. We can help assess repetitive tasks, information handoffs, and workflows that may be simplified with automation. The right approach depends on the tools you already use and the outcome you want.',
      follow: 'What task takes the most time in your business right now?'
    },
    {
      id: 'marketing',
      terms: ['digital marketing','social media','email marketing','online advertising','brand awareness','marketing campaign'],
      title: 'Digital marketing',
      answer: 'Digital Marketing is one of G-Plus’s listed services. Tell us about your business, audience, and marketing goal so the team can discuss an appropriate scope. Specific campaign deliverables and platforms are confirmed per project.',
      follow: 'Are you mainly looking for social media, email marketing, website visibility, or a broader digital strategy?'
    },
    {
      id: 'it',
      terms: ['computer support','technical support','computer maintenance','it computer maintenance','business computer maintenance','maintain computers','pc maintenance','troubleshoot','troubleshooting','computer repair','it support','technical issue'],
      title: 'IT computer maintenance and technical support',
      answer: 'G-Plus can discuss IT computer maintenance for businesses, including routine computer checks, setup, troubleshooting, and technical support needs. Contact the team with the number and type of computers, your business location, and the issue or maintenance you need so the scope can be reviewed.',
      follow: 'Are you looking for routine maintenance, troubleshooting, computer setup, or ongoing support for your business?' 
    },
    {
      id: 'uiux',
      terms: ['ui ux','ui/ux','user interface','user experience','interface design','app design','prototype'],
      title: 'UI/UX design',
      answer: 'G-Plus offers UI/UX Design for digital experiences. We can discuss the intended users, key tasks, screen layouts, and usability goals for a website, application, or business system.',
      follow: 'Are you designing a new product or improving an existing interface?'
    },
    {
      id: 'process',
      terms: ['process','how do you work','project steps','development process','how does it work','start a project'],
      title: 'Project process',
      answer: 'The G-Plus project approach is organized around four stages: Discover goals and challenges; Plan & Design the solution; Build, test, and refine it; then Launch & Support. The details and timeline are agreed according to the project scope.',
      follow: 'Do you already have a project brief, or would you like help defining the requirements?'
    },
    {
      id: 'pricing',
      terms: ['price','pricing','cost','how much','quotation','quote','estimate','budget','rates'],
      title: 'Project pricing and quotations',
      answer: 'G-Plus does not publish fixed prices on this website. Costs depend on the project type, features, integrations, complexity, and support requirements. The team can review your needs and discuss a suitable scope and quotation.',
      follow: 'What are you looking to build, and which features are essential?'
    },
    {
      id: 'contact',
      terms: ['contact','email','phone','call','reach your team','talk to someone','human representative'],
      title: 'Contact G-Plus',
      answer: 'You can contact G-Plus Tech Solution at ask.an.it.now@gmail.com. Select the AI QUERY tab for the contact pop-out or use the email link to send your project inquiry. A business phone number has not been provided for publication.',
      follow: 'Would you like to prepare an email about a new project or a technical support request?'
    },
    {
      id: 'audience',
      terms: ['who do you serve','target customer','small business','individual','businesses','who can use'],
      title: 'Who G-Plus serves',
      answer: 'G-Plus Tech Solution works with businesses and individuals. The solution is shaped around the client’s goals, processes, and technical requirements.',
      follow: 'Are you asking on behalf of a business or for a personal project?'
    }
  ];

  let lastTopic = null;
  let previousQuestion = '';

  function normalizeQuestion(value) {
    return ` ${value.toLowerCase().replace(/[^a-z0-9+#/ ]/g, ' ').replace(/\s+/g, ' ').trim()} `;
  }

  function findKnowledge(question) {
    const normalized = normalizeQuestion(question);
    let best = null;
    let bestScore = 0;

    knowledge.forEach(item => {
      let score = 0;
      item.terms.forEach(term => {
        const cleanTerm = term.trim().toLowerCase();
        if (cleanTerm && normalized.includes(` ${cleanTerm} `)) {
          score += cleanTerm.includes(' ') ? 3 : 1;
        }
      });
      if (score > bestScore) {
        best = item;
        bestScore = score;
      }
    });
    return bestScore > 0 ? best : null;
  }

  function getCompanyAnswer(question) {
    const q = question.trim().toLowerCase();
    const followUp = /^(and|also|what about|how about|what if|does it|can it|will it|how much|how long|why|which one|tell me more|more details)/i.test(q);

    if (followUp && lastTopic) {
      const followupAnswers = {
        pricing: 'The price depends on the requirements, features, integrations, and project complexity. G-Plus would need to understand the scope before providing a quotation. ' + lastTopic.follow,
        systems: 'The system can be planned around your actual workflow rather than forcing you into a generic template. The required modules, users, reports, and deployment approach should be identified first. ' + lastTopic.follow,
        gas: 'Those functions can be discussed as part of a gasoline station system scope. Tax and compliance details must be checked against your current obligations. ' + lastTopic.follow,
        hrpayroll: 'The modules can be scoped together or separately, depending on your current process and applicable payroll requirements. ' + lastTopic.follow,
        ai: 'Automation opportunities are assessed by looking at the task, the tools involved, and the result you want. Not every task needs AI; some can be handled with simpler workflow automation. ' + lastTopic.follow
      };
      return followupAnswers[lastTopic.id] || `Regarding ${lastTopic.title.toLowerCase()}: ${lastTopic.answer} ${lastTopic.follow}`;
    }

    const found = findKnowledge(question);
    if (found) {
      lastTopic = found;
      previousQuestion = question;
      return `${found.answer}\n\n${found.follow}`;
    }

    if (/^(hi|hello|hey|good morning|good afternoon|good evening)\b/i.test(q)) {
      return 'Hello! Welcome to G-Plus Tech Solution. I can help you explore our websites, custom business systems, AI and automation, IT support, UI/UX, and digital marketing services. What are you hoping to accomplish?';
    }
    if (/thank(s| you)/i.test(q)) {
      return 'You’re welcome! If you would like to discuss a project or ask about a service, I can help you find the right information. You can also reach the team at ask.an.it.now@gmail.com.';
    }
    if (/^(yes|no|okay|ok|sure)\b/i.test(q) && lastTopic) {
      return `Thanks. To help narrow this down for ${lastTopic.title.toLowerCase()}, ${lastTopic.follow.toLowerCase()}`;
    }

    previousQuestion = question;
    return 'I want to make sure I give you accurate information. I can answer questions about G-Plus services, website development, custom business systems, POS, clinic systems, gasoline station systems, HR and payroll, inventory, lending, farm systems, AI automation, project process, pricing, and contact details. Could you tell me a little more about what you need?';
  }

  function appendChatMessage(text, type) {
    const wrapper = document.createElement('div');
    wrapper.className = `ai-message ${type === 'user' ? 'ai-message-user' : 'ai-message-assistant'}`;
    const label = document.createElement('b');
    label.textContent = type === 'user' ? 'YOU' : 'G-PLUS AI';
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    wrapper.append(label, paragraph);
    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function askCompanyAssistant(question) {
    const cleanQuestion = question.trim();
    if (!cleanQuestion || !chatMessages) return;
    appendChatMessage(cleanQuestion, 'user');
    appendChatMessage(getCompanyAnswer(cleanQuestion), 'assistant');
  }

  chatForm?.addEventListener('submit', event => {
    event.preventDefault();
    askCompanyAssistant(chatInput.value);
    chatInput.value = '';
    chatInput.focus();
  });

  document.querySelectorAll('[data-ai-question]').forEach(button => {
    button.addEventListener('click', () => askCompanyAssistant(button.dataset.aiQuestion));
  });
})();
