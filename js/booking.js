(function () {
  'use strict';

  /* Booking bar visibility */
  const bookingBar = document.querySelector('.booking-bar');
  const heroSection = document.querySelector('.hero');

  if (bookingBar && heroSection && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          bookingBar.classList.add('visible');
        } else {
          bookingBar.classList.remove('visible');
        }
      });
    }, { threshold: 0.1 });

    heroObserver.observe(heroSection);
  }

  /* Booking bar submit */
  const bookingForm = document.querySelector('.booking-bar__inner');
  if (bookingForm) {
    const bookBtn = bookingForm.querySelector('.btn--amber');
    if (bookBtn) {
      bookBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'contact.html';
      });
    }
  }

  /* Contact form */
  const reservationForm = document.querySelector('.reservation-form');
  const formSuccess = document.querySelector('.form-success');

  if (reservationForm && formSuccess) {
    reservationForm.addEventListener('submit', function (e) {
      e.preventDefault();
      reservationForm.style.display = 'none';
      formSuccess.classList.add('visible');
    });
  }

  /* Activity filter */
  const filterBtns = document.querySelectorAll('.filter-bar__btn');
  const activityCards = document.querySelectorAll('.activity-card[data-activity-season]');

  if (filterBtns.length && activityCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter;
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        activityCards.forEach(function (card) {
          const season = card.dataset.activitySeason;
          const show = filter === 'all' || season === filter || season === 'year-round';
          card.classList.toggle('filter-hidden', !show);
        });
      });
    });
  }

  /* Book activity buttons */
  document.querySelectorAll('[data-book-activity]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.location.href = 'contact.html';
    });
  });
})();
