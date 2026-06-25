(function () {
  'use strict';

  const STORAGE_KEY = 'grandalpine-season';
  const DEFAULT_SEASON = 'summer';

  function getSeason() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_SEASON;
  }

  function setSeason(season) {
    localStorage.setItem(STORAGE_KEY, season);
    document.body.setAttribute('data-season', season);
    updateToggleButtons(season);
  }

  function updateToggleButtons(season) {
    document.querySelectorAll('.season-toggle__btn').forEach(function (btn) {
      const btnSeason = btn.dataset.season;
      btn.classList.toggle('active', btnSeason === season);
      btn.setAttribute('aria-pressed', btnSeason === season ? 'true' : 'false');
    });

    document.querySelectorAll('[data-booking-season]').forEach(function (select) {
      select.value = season;
    });
  }

  document.body.setAttribute('data-season', getSeason());
  updateToggleButtons(getSeason());

  document.querySelectorAll('.season-toggle__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setSeason(btn.dataset.season);
    });
  });
})();
