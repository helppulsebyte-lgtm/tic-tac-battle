(function () {
  // hamburger menu
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('mainNav');
  if (btn && nav) {
    function setOpen(open) {
      nav.classList.toggle('open', open);
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('menu-open', open);
    }
    btn.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.tagName === 'A') setOpen(false); });
    document.addEventListener('click', function (e) { if (!nav.contains(e.target) && e.target !== btn) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 720) setOpen(false); });
  }

  // tables: copy each column heading onto its cells so they can stack into labelled cards on phones
  document.querySelectorAll('table').forEach(function (t) {
    var heads = Array.prototype.map.call(t.querySelectorAll('tr:first-child th'), function (h) { return h.textContent.trim(); });
    t.querySelectorAll('tr').forEach(function (row, i) {
      if (i === 0) return;
      Array.prototype.forEach.call(row.children, function (cell, c) { if (heads[c]) cell.setAttribute('data-label', heads[c]); });
    });
  });

  // highlight the section being read in the contents list
  var links = document.querySelectorAll('.toc a[href^="#"]');
  if ('IntersectionObserver' in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.classList.remove('cur'); });
          map[en.target.id].classList.add('cur');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
