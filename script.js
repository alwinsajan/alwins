document.querySelectorAll('.yr').forEach(function (el) { el.textContent = new Date().getFullYear(); });

// Dark mode toggle
var root = document.documentElement;
var tg = document.querySelector('.tg');
function paint() {
  var dark = root.dataset.theme === 'dark';
  if (!tg) return;
  tg.textContent = dark ? '☀' : '☾';
  tg.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
if (tg) {
  tg.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    paint();
  });
  paint();
}

// Nav: full width at the top, compact pill after scrolling
var nav = document.querySelector('nav');
var bar = document.querySelector('.bar');
function onScroll() {
  if (nav) nav.classList.toggle('mini', window.scrollY > 40);
  if (bar) {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Simple C syntax colouring
var re = /(\/\/.*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|(#\w+(?:\s*&lt;\w+\.h&gt;)?)|\b(int|float|char|double|return|for|while|if|else|void)\b|\b(\d+\.?\d*)\b|\b(printf|scanf|main)\b(?=\()/g;
document.querySelectorAll('code.lang-c').forEach(function (el) {
  var t = el.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  el.innerHTML = t.replace(re, function (m, com, str, pre, kw, num) {
    var cls = com ? 'c' : str ? 's' : pre ? 'p' : kw ? 'k' : num ? 'n' : 'f';
    return '<span class="' + cls + '">' + m + '</span>';
  });
});

// Interactive array with meme captions
var play = document.getElementById('play');
if (play) {
  var cells = play.querySelectorAll('.cell');
  var data = [
    ['85', 'COUNTING STARTS AT ZERO. SURPRISE.', '😎'],
    ['72', 'ONE VARIABLE. MANY VALUES. MAGIC.', '🪄'],
    ['90', 'THE MIDDLE CHILD OF THE ARRAY', '😌'],
    ['67', 'ONE MORE STEP AND YOU’RE ALMOST OUT OF BOUNDS', '😬'],
    ['88', 'THE LAST ONE. INDEX 5 DOES NOT EXIST.', '💀']
  ];
  var meme = document.getElementById('meme'), mt = document.getElementById('mt'),
      mb = document.getElementById('mb'), em = document.getElementById('em'), out = document.getElementById('out');
  var select = function (i) {
    cells.forEach(function (c, j) { c.classList.toggle('on', i === j); c.setAttribute('aria-pressed', i === j); });
    mt.textContent = 'marks[' + i + '] = ' + data[i][0];
    mb.textContent = data[i][1];
    em.textContent = data[i][2];
    meme.classList.remove('pop'); void meme.offsetWidth; meme.classList.add('pop');
  };
  cells.forEach(function (c, i) {
    c.addEventListener('click', function () { select(i); out.textContent = '> marks[' + i + '] gives ' + data[i][0]; });
  });
  var run = document.getElementById('run');
  run.addEventListener('click', function () {
    var i = 0, text = 'Output: ';
    run.disabled = true;
    var t = setInterval(function () {
      select(i);
      text += data[i][0] + ' ';
      out.textContent = text;
      i++;
      if (i === data.length) { clearInterval(t); out.textContent = text + '✓ loop finished'; run.disabled = false; }
    }, 700);
  });
}

// Tabs
document.querySelectorAll('.tabs').forEach(function (tabs) {
  var btns = tabs.querySelectorAll('button');
  btns.forEach(function (b) {
    b.addEventListener('click', function () {
      btns.forEach(function (x) {
        var on = x === b;
        x.setAttribute('aria-selected', on);
        document.getElementById(x.dataset.t).hidden = !on;
      });
    });
  });
});

// Quiz
document.querySelectorAll('.quiz').forEach(function (q) {
  var res = q.querySelector('.res');
  q.querySelectorAll('.opts button').forEach(function (b, i) {
    b.addEventListener('click', function () {
      var ok = String(i) === q.dataset.a;
      q.querySelectorAll('.opts button').forEach(function (x) { x.classList.remove('ok', 'no'); });
      b.classList.add(ok ? 'ok' : 'no');
      res.textContent = ok ? q.dataset.yes : q.dataset.no;
    });
  });
});
