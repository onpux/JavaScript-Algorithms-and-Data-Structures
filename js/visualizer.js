document.addEventListener("DOMContentLoaded", () => {
  const algoSelect = document.getElementById("algo-select");
  const startBtn = document.getElementById("start-visualization");
  const canvasContainer = document.getElementById("visualization-canvas");

  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 400;
  canvas.style.border = "1px solid #000";
  canvasContainer.innerHTML = "";
  canvasContainer.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  startBtn.addEventListener("click", () => {
    const algorithm = algoSelect.value;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (algorithm) {
      case "bubble":
        visualizeBubbleSort(ctx, canvas.width, canvas.height);
        break;
      case "quick":
        visualizeQuickSort(ctx, canvas.width, canvas.height);
        break;
      case "bfs":
        visualizeBFS(ctx);
        break;
      case "dfs":
        visualizeDFS(ctx);
        break;
      default:
        alert("Unknown algorithm selected");
    }
  });
});

// Bubble Sort visualization (basic example)
function visualizeBubbleSort(ctx, width, height) {
  const array = Array.from({ length: 50 }, () => Math.floor(Math.random() * height));
  let i = 0, j = 0;

  const interval = setInterval(() => {
    ctx.clearRect(0, 0, width, height);
    drawBars(ctx, array, width, height);
    
    if (i < array.length) {
      if (j < array.length - i - 1) {
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
        j++;
      } else {
        j = 0;
        i++;
      }
    } else {
      clearInterval(interval);
    }
  }, 50);
}

function drawBars(ctx, array, width, height) {
  const barWidth = width / array.length;
  array.forEach((val, idx) => {
    ctx.fillStyle = "steelblue";
    ctx.fillRect(idx * barWidth, height - val, barWidth - 1, val);
  });
}

function visualizeQuickSort(ctx) {
  // Placeholder: podrías implementar quicksort aquí
  ctx.fillText("QuickSort no implementado aún", 10, 50);
}

function visualizeBFS(ctx) {
  ctx.fillText("BFS no implementado aún", 10, 50);
}

function visualizeDFS(ctx) {
  ctx.fillText("DFS no implementado aún", 10, 50);
}
