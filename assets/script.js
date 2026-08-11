document.addEventListener('DOMContentLoaded', function () {
  var menuBtn = document.getElementById('menuBtn');
  var navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Graceful fallback if profile.jpg hasn't been added yet
  var photo = document.getElementById('profilePhoto');
  var placeholder = document.getElementById('photoPlaceholder');
  if (photo && placeholder) {
    photo.addEventListener('error', function () {
      photo.style.display = 'none';
      placeholder.style.display = 'block';
    });
  }

  // Gallery carousel: falls back to a placeholder per-slide if the image is missing
  document.querySelectorAll('.carousel-img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.display = 'none';
      var ph = img.parentElement.querySelector('.carousel-placeholder');
      if (ph) ph.style.display = 'flex';
    });
  });

  document.querySelectorAll('.carousel').forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var prevBtn = carousel.querySelector('.car-btn.prev');
    var nextBtn = carousel.querySelector('.car-btn.next');
    var dotsWrap = carousel.querySelector('.car-dots');
    if (!track || slides.length === 0) return;

    var index = 0;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'car-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.addEventListener('click', function () { goTo(i); });
      dotsWrap.appendChild(dot);
    });
    var dots = dotsWrap.querySelectorAll('.car-dot');

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      dots.forEach(function (d, di) { d.classList.toggle('active', di === index); });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(index - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(index + 1); });

    var autoplay = setInterval(function () { goTo(index + 1); }, 6000);
    carousel.addEventListener('mouseenter', function () { clearInterval(autoplay); });
  });
});
