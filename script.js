// ---------- Mobile nav ----------
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Hero answer-card demo ----------
const demos = [
  {
    query: 'What year was the first transatlantic cable laid?',
    answer: '1858 — though it failed within weeks. A lasting connection followed in 1866.',
    chips: ['Source A', 'Source B', 'Source C'],
  },
  {
    query: 'Is decaf coffee actually caffeine-free?',
    answer: 'No. Most decaf still has 2–15mg of caffeine per cup, down from 95mg.',
    chips: ['Source A', 'Source B'],
  },
  {
    query: 'How long do sea otters stay with their mothers?',
    answer: 'About 6 months, learning to forage and groom before going independent.',
    chips: ['Source A', 'Source B', 'Source C'],
  },
];

const typedQueryEl = document.getElementById('typed-query');
const answerTextEl = document.getElementById('answer-text');
const answerChipsEl = document.getElementById('answer-chips');
const answerBlock = document.getElementById('answer-block');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderChips(chips) {
  answerChipsEl.innerHTML = '';
  chips.forEach((label) => {
    const span = document.createElement('span');
    span.className = 'chip';
    span.textContent = '✓ ' + label;
    answerChipsEl.appendChild(span);
  });
}

async function typeText(el, text, speed = 32) {
  el.textContent = '';
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await new Promise((r) => setTimeout(r, speed));
  }
}

async function runDemoLoop() {
  let i = 0;
  while (true) {
    const demo = demos[i % demos.length];

    answerBlock.style.opacity = '0';
    answerTextEl.textContent = '';
    answerChipsEl.innerHTML = '';

    await typeText(typedQueryEl, demo.query);
    await new Promise((r) => setTimeout(r, 450));

    answerBlock.style.transition = 'opacity 0.4s ease';
    answerBlock.style.opacity = '1';
    await typeText(answerTextEl, demo.answer, 14);
    renderChips(demo.chips);

    await new Promise((r) => setTimeout(r, 3200));
    i++;
  }
}

if (typedQueryEl && answerTextEl) {
  if (prefersReducedMotion) {
    const demo = demos[0];
    typedQueryEl.textContent = demo.query;
    answerTextEl.textContent = demo.answer;
    renderChips(demo.chips);
  } else {
    runDemoLoop();
  }
}

// ---------- Contact form ----------
const form = document.getElementById('contact-form');
const formNote = document.getElementById('form-note');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formNote.textContent = 'Sending…';
    formNote.className = 'form-note';

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        formNote.textContent = "Thanks — we'll get back to you soon.";
        formNote.className = 'form-note success';
        form.reset();
      } else {
        formNote.textContent = 'Something went wrong. Please email us directly instead.';
        formNote.className = 'form-note error';
      }
    } catch (err) {
      formNote.textContent = 'Something went wrong. Please email us directly instead.';
      formNote.className = 'form-note error';
    } finally {
      submitBtn.disabled = false;
    }
  });
}
