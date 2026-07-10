// Lightweight screenshot carousel — no dependencies.
// Drag/swipe on desktop + touch, click dots, keyboard arrows.
// Supports multiple independent carousels on the same page — each
// element with class "carousel" gets its own track/dots/state.
(function () {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((root) => {
    const track = root.querySelector('[data-carousel-track]');
    const dotsWrap = root.querySelector('[data-carousel-dots]');
    if (!track || !dotsWrap) return;

    const slides = Array.from(track.children);
    const count = slides.length;
    let index = 0;
    let startX = 0;
    let dragX = 0;
    let dragging = false;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to screenshot ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dotEls = Array.from(dotsWrap.children);

    function render(withTransition) {
      track.style.transition = withTransition ? 'transform .3s ease' : 'none';
      const offset = -index * (100 / count) + (dragging ? (dragX / track.clientWidth) * (100 / count) : 0);
      track.style.transform = `translateX(${offset}%)`;
      dotEls.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(i) {
      index = Math.max(0, Math.min(count - 1, i));
      render(true);
    }

    function clientX(e) {
      return e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX;
    }

    track.parentElement.addEventListener('pointerdown', (e) => {
      dragging = true;
      startX = clientX(e);
      dragX = 0;
    });
    window.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      dragX = clientX(e) - startX;
      render(false);
    });
    window.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      if (dragX < -40) goTo(index + 1);
      else if (dragX > 40) goTo(index - 1);
      else render(true);
      dragX = 0;
    });

    // Arrow keys act on whichever carousel the pointer is currently over,
    // so the two carousels don't fight over keyboard input.
    root.dataset.active = 'false';
    root.addEventListener('mouseenter', () => { root.dataset.active = 'true'; });
    root.addEventListener('mouseleave', () => { root.dataset.active = 'false'; });
    document.addEventListener('keydown', (e) => {
      if (carousels.length > 1 && root.dataset.active !== 'true') return;
      if (e.key === 'ArrowRight') goTo(index + 1);
      if (e.key === 'ArrowLeft') goTo(index - 1);
    });

    // Set explicit track width so slides sit side by side.
    track.style.width = count * 100 + '%';
    slides.forEach((s) => { s.style.width = 100 / count + '%'; });

    render(false);
  });
})();
