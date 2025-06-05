// Fondo jungla: hojas cayendo y árboles de fondo
(function() {
  // Árboles de fondo
  const trees = document.getElementById('trees-bg');
  let W = window.innerWidth, H = window.innerHeight;
  function drawTrees() {
    trees.innerHTML = '';
    const n = Math.ceil(W / 180);
    for (let i = 0; i < n; i++) {
      const tree = document.createElement('div');
      tree.className = 'jungle-tree';
      tree.style.left = (i * 180 + Math.random()*40) + 'px';
      tree.style.bottom = '0px';
      tree.style.height = (120 + Math.random()*80) + 'px';
      tree.style.width = '48px';
      tree.style.background = 'linear-gradient(180deg,#388e3c 60%,#1b5e20 100%)';
      tree.style.position = 'absolute';
      tree.style.borderRadius = '0 0 32px 32px';
      tree.style.opacity = 0.7 + Math.random()*0.2;
      trees.appendChild(tree);
    }
  }
  window.addEventListener('resize', () => {
    W = window.innerWidth; H = window.innerHeight;
    drawTrees();
  });
  drawTrees();
})();

(function() {
  // Hojas cayendo
  const canvas = document.getElementById('jungle-bg');
  const ctx = canvas.getContext('2d');
  let W = window.innerWidth, H = window.innerHeight;
  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }
  window.addEventListener('resize', resize);
  resize();
  const leafColors = ['#43a047','#66bb6a','#a5d6a7','#388e3c'];
  const leaves = Array.from({length: 24}, () => ({
    x: Math.random()*W,
    y: -40 - Math.random()*H,
    r: 12 + Math.random()*16,
    dx: -0.5 + Math.random()*1.2,
    dy: 1.2 + Math.random()*1.5,
    angle: Math.random()*Math.PI*2,
    dAngle: -0.01 + Math.random()*0.02,
    color: leafColors[Math.floor(Math.random()*leafColors.length)]
  }));
  function drawLeaf(l) {
    ctx.save();
    ctx.translate(l.x, l.y);
    ctx.rotate(l.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(l.r, -l.r, l.r, l.r, 0, l.r*1.5);
    ctx.bezierCurveTo(-l.r, l.r, -l.r, -l.r, 0, 0);
    ctx.fillStyle = l.color;
    ctx.globalAlpha = 0.7;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }
  function animate() {
    ctx.clearRect(0, 0, W, H);
    for (const l of leaves) {
      drawLeaf(l);
      l.x += l.dx;
      l.y += l.dy;
      l.angle += l.dAngle;
      if (l.y > H+40 || l.x < -40 || l.x > W+40) {
        l.x = Math.random()*W;
        l.y = -40 - Math.random()*H*0.2;
        l.r = 12 + Math.random()*16;
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// --- Proyecto 1: Búsqueda en datos históricos (Google Trends) ---
let trendsData = [];
fetch('trends_data.json')
  .then(r => r.json())
  .then(data => {
    trendsData = data.sort((a,b)=>a.term.localeCompare(b.term));
  });
function buscarTrends() {
  const input = document.getElementById('searchInput').value.trim();
  const type = document.getElementById('searchType').value;
  let res = null;
  if(type==="binaria") {
    res = busquedaBinaria(trendsData, input);
  } else {
    res = busquedaLineal(trendsData, input);
  }
  document.getElementById('searchResult').textContent = res ? `Found: ${res.term} (${res.value})` : 'Not found';
}
function busquedaLineal(arr, key) {
  for(const obj of arr) if(obj.term.toLowerCase()===key.toLowerCase()) return obj;
  return null;
}
function busquedaBinaria(arr, key) {
  let l=0, r=arr.length-1;
  while(l<=r) {
    let m=Math.floor((l+r)/2);
    if(arr[m].term.toLowerCase()===key.toLowerCase()) return arr[m];
    if(arr[m].term.toLowerCase()<key.toLowerCase()) l=m+1; else r=m-1;
  }
  return null;
}

// --- Proyecto 2: Simulador de pila y cola ---
let stack = [], queue = [];
function pushStack() {
  const val = document.getElementById('stackInput').value.trim();
  if(val) stack.push(val);
  renderStackQueue();
}
function popStack() {
  stack.pop();
  renderStackQueue();
}
function enqueueQueue() {
  const val = document.getElementById('stackInput').value.trim();
  if(val) queue.push(val);
  renderStackQueue();
}
function dequeueQueue() {
  queue.shift();
  renderStackQueue();
}
function renderStackQueue() {
  document.getElementById('stackVisual').innerHTML = stack.slice().reverse().map(x=>`<li>${x}</li>`).join('');
  document.getElementById('queueVisual').innerHTML = queue.map(x=>`<li>${x}</li>`).join('');
}

// --- Proyecto 3: Calculadora infijo-posfijo y árbol de expresión ---
function convertirEvaluar() {
  const expr = document.getElementById('exprInput').value.trim();
  if(!expr) return;
  const postfix = infixToPostfix(expr);
  const tree = buildExprTree(postfix);
  const val = evalExprTree(tree);
  document.getElementById('exprResult').textContent = `Postfix: ${postfix.join(' ')}\nResult: ${val}`;
  document.getElementById('treeVisual').innerHTML = tree ? renderTree(tree) : '';
}
function infixToPostfix(expr) {
  const prec = {"+":1,"-":1,"*":2,"/":2,"^":3};
  const stack=[], out=[];
  const tokens = expr.match(/\d+|[()+\-*/^]/g);
  for(const t of tokens) {
    if(/\d+/.test(t)) out.push(t);
    else if(t==='(') stack.push(t);
    else if(t===')') { while(stack.length && stack[stack.length-1]!=='(') out.push(stack.pop()); stack.pop(); }
    else { while(stack.length && prec[stack[stack.length-1]]>=prec[t]) out.push(stack.pop()); stack.push(t); }
  }
  while(stack.length) out.push(stack.pop());
  return out;
}
function buildExprTree(postfix) {
  if(!postfix) return null;
  const stack=[];
  for(const t of postfix) {
    if(/\d+/.test(t)) stack.push({val:t});
    else {
      const r=stack.pop(), l=stack.pop();
      stack.push({val:t,left:l,right:r});
    }
  }
  return stack[0];
}
function evalExprTree(node) {
  if(!node.left && !node.right) return Number(node.val);
  const l=evalExprTree(node.left), r=evalExprTree(node.right);
  switch(node.val) {
    case '+': return l+r;
    case '-': return l-r;
    case '*': return l*r;
    case '/': return l/r;
    case '^': return Math.pow(l,r);
  }
}
function renderTree(node) {
  if(!node) return '';
  if(!node.left && !node.right) return `<span class='leaf'>${node.val}</span>`;
  return `<div class='tree-node'><span class='op'>${node.val}</span><div class='tree-children'>${renderTree(node.left)}${renderTree(node.right)}</div></div>`;
}
// Estilos para el árbol
(function(){
  const style = document.createElement('style');
  style.innerHTML = `
    #treeVisual { font-family: monospace; }
    .tree-node { display: inline-block; text-align: center; margin: 0 8px; }
    .tree-children { display: flex; justify-content: center; }
    .op { color: #388e3c; font-weight: bold; font-size: 1.2em; }
    .leaf { color: #1b5e20; font-weight: bold; }
  `;
  document.head.appendChild(style);
})();
