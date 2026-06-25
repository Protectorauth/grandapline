(function () {
  'use strict';

  const STORAGE_KEY = 'grandalpine-lang';
  const DEFAULT_LANG = 'en';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    if (lang === 'mi') {
      document.body.classList.add('lang-mi');
    } else {
      document.body.classList.remove('lang-mi');
    }
    updateLangToggle(lang);
    updateTextContent(lang);
  }

  function updateLangToggle(lang) {
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'mi' ? 'MI / EN' : 'EN / MI';
      btn.setAttribute('aria-label', lang === 'mi' ? 'Switch to English' : 'Switch to Te Reo Māori');
    });
  }

  function updateTextContent(lang) {
    document.querySelectorAll('[data-en][data-mi]').forEach(function (el) {
      const text = lang === 'mi' ? el.dataset.mi : el.dataset.en;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else {
        el.textContent = text;
      }
    });
  }

  const initialLang = getLang();
  if (initialLang === 'mi') {
    document.body.classList.add('lang-mi');
  }
  updateLangToggle(initialLang);
  updateTextContent(initialLang);

  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const current = getLang();
      setLang(current === 'en' ? 'mi' : 'en');
    });
  });
})();
