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

// Nav: full width at top, compact pill after scrolling
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

// Upgraded Interactive Array Workbench (Moved to blog page)
var play = document.getElementById('play');
if (play) {
  var cells = play.querySelectorAll('.cell');
  var data = [
    { val: '85', addr: '0x2000', msg: 'COUNTING STARTS AT ZERO. FIRST ELEMENT.', emoji: '😎' },
    { val: '72', addr: '0x2004', msg: '4 BYTES LATER IN RAM. CONTIGUOUS MEMORY.', emoji: '🪄' },
    { val: '90', addr: '0x2008', msg: 'THE HIGHEST VALUE IN THIS ARRAY!', emoji: '🏆' },
    { val: '67', addr: '0x200C', msg: 'ONE MORE STEP BEFORE THE BOUNDARY.', emoji: '😬' },
    { val: '88', addr: '0x2010', msg: 'LAST VALID ELEMENT AT INDEX 4.', emoji: '💀' }
  ];
  var meme = document.getElementById('meme'), mt = document.getElementById('mt'),
      mb = document.getElementById('mb'), em = document.getElementById('em'), out = document.getElementById('out');

  var selectCell = function (i) {
    cells.forEach(function (c, j) { 
      c.classList.toggle('on', i === j); 
      c.setAttribute('aria-pressed', i === j); 
    });
    mt.textContent = 'marks[' + i + '] = ' + data[i].val;
    mb.textContent = data[i].msg;
    em.textContent = data[i].emoji;
    meme.classList.remove('pop'); void meme.offsetWidth; meme.classList.add('pop');
  };

  cells.forEach(function (c, i) {
    c.addEventListener('click', function () { 
      selectCell(i); 
      out.textContent = '> Accessing marks[' + i + '] at RAM Address ' + data[i].addr + ' → Value = ' + data[i].val; 
    });
  });

  // Action 1: For-loop traversal
  var run = document.getElementById('run');
  if (run) {
    run.addEventListener('click', function () {
      var i = 0, text = 'Loop Output: ';
      run.disabled = true;
      var t = setInterval(function () {
        selectCell(i);
        text += data[i].val + ' ';
        out.textContent = text;
        i++;
        if (i === data.length) { 
          clearInterval(t); 
          out.textContent = text + ' | ✓ loop finished (i = 5 terminated)'; 
          run.disabled = false; 
        }
      }, 700);
    });
  }

  // Action 2: Find Max value
  var findMaxBtn = document.getElementById('find-max');
  if (findMaxBtn) {
    findMaxBtn.addEventListener('click', function() {
      var maxIdx = 2; // 90 is max
      selectCell(maxIdx);
      out.textContent = '> Max mark found at marks[' + maxIdx + '] = ' + data[maxIdx].val;
    });
  }

  // Action 3: Edit random cell value
  var editBtn = document.getElementById('edit-val');
  if (editBtn) {
    editBtn.addEventListener('click', function() {
      var randomIdx = Math.floor(Math.random() * data.length);
      var newVal = Math.floor(Math.random() * 30) + 70; // random score between 70-100
      data[randomIdx].val = String(newVal);
      cells[randomIdx].querySelector('b').textContent = newVal;
      selectCell(randomIdx);
      out.textContent = '> Updated marks[' + randomIdx + '] value to ' + newVal;
    });
  }
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
