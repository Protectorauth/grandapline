(function () {
  'use strict';

  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    return;
  }

  const cards = document.querySelectorAll('.tilt-card, .activity-card, .tilt-image');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.4s ease';
    });

    card.addEventListener('mouseenter', function () {
      card.style.transition = 'transform 0.1s ease';
    });
  });
})();
