document.querySelectorAll('.yr').forEach(function (el) { el.textContent = new Date().getFullYear(); });

// Reading progress bar (blog page only)
var bar = document.querySelector('.bar');
if (bar) {
  var update = function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// Simple C syntax colouring
var re = /(\/\/.*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*")|(#\w+(?:\s*&lt;\w+\.h&gt;)?)|\b(int|float|char|double|return|for|while|if|else|void)\b|\b(\d+\.?\d*)\b|\b(printf|scanf|main)\b(?=\()/g;
document.querySelectorAll('code.lang-c').forEach(function (el) {
  var t = el.textContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  el.innerHTML = t.replace(re, function (m, com, str, pre, kw, num, fn) {
    var cls = com ? 'c' : str ? 's' : pre ? 'p' : kw ? 'k' : num ? 'n' : 'f';
    return '<span class="' + cls + '">' + m + '</span>';
  });
});
