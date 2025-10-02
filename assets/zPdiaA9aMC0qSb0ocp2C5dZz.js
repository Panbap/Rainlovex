window.addEventListener("DOMContentLoaded", () => {
  // code ở đây
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const isMobile = window.innerWidth < 768;
  const gap = isMobile ? 2 : 5;

  const shapeCanvas = document.createElement("canvas");
  shapeCanvas.width = canvas.width;
  shapeCanvas.height = canvas.height;
  const shapeCtx = shapeCanvas.getContext("2d");

  // Gán giá trị cho sticker và nhạc nền
  const sticker = document.getElementById("sticker");
  if (gif && gif.trim() !== "") {
    sticker.src = decodeURIComponent(gif);
  }

  const bgm = document.getElementById("bgm");
  if (music && music.trim() !== "") {
    bgm.src = decodeURIComponent(music);
    bgm.play().catch(() => {
      console.warn("Trình duyệt chưa cho phép phát nhạc tự động");
    });
  }
  document.addEventListener("click", () => {
    if (bgm.paused && music && music.trim() !== "") {
      bgm.play().catch(() => {
        console.warn("Không thể phát nhạc do trình duyệt hạn chế.");
      });
    }
  });

  const texts = inputText.split("|").filter((line) => line.trim() !== "");
  const found = document.getElementById("panbap.github.io");

  if (!found) {
    location.href = atob("aHR0cHM6Ly9kZXZwYW4udmVyY2VsLmFwcC8=");
  }

  let currentIndex = 0;
  let particles = [];
  let morphDelay = 600;
  let lastMorphTime = Date.now();
  let stopAnimation = false;

  function getFittedFont(text) {
    let fontSize = 300;
    shapeCtx.font = `bold ${fontSize}px Mali`;
    let textWidth = shapeCtx.measureText(text.replace("\n", "")).width;
    while (
      (textWidth > shapeCanvas.width * 0.9 ||
        fontSize > shapeCanvas.height * 0.8) &&
      fontSize > 10
    ) {
      fontSize -= 5;
      shapeCtx.font = `bold ${fontSize}px Mali`;
      textWidth = shapeCtx.measureText(text.replace("\n", "")).width;
    }
    return fontSize;
  }

  function generateDots(text) {
    shapeCtx.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
    const lines = text.split("\n");
    const fontSize = getFittedFont(text);
    shapeCtx.font = `bold ${fontSize}px Mali`;
    shapeCtx.fillStyle = "#fff";
    shapeCtx.textAlign = "center";
    shapeCtx.textBaseline = "middle";

    const lineHeight = fontSize * 1.2;
    const totalHeight = lineHeight * lines.length;
    const startY = shapeCanvas.height / 2 - totalHeight / 2 + lineHeight / 2;

    for (let i = 0; i < lines.length; i++) {
      shapeCtx.fillText(
        lines[i],
        shapeCanvas.width / 2,
        startY + i * lineHeight
      );
    }

    const imageData = shapeCtx.getImageData(
      0,
      0,
      shapeCanvas.width,
      shapeCanvas.height
    ).data;
    const dots = [];
    for (let y = 0; y < shapeCanvas.height; y += gap) {
      for (let x = 0; x < shapeCanvas.width; x += gap) {
        const i = (y * shapeCanvas.width + x) * 4;
        if (imageData[i + 3] > 128) {
          dots.push({ x, y });
        }
      }
    }
    return dots;
  }

  function interpolateParticles(toDots) {
    const max = Math.max(particles.length, toDots.length);
    const newParticles = [];

    for (let i = 0; i < max; i++) {
      const from = particles[i % particles.length] || {
        x: canvas.width / 2,
        y: canvas.height / 2,
      };
      const to = toDots[i % toDots.length];

      newParticles.push({
        x: from.x,
        y: from.y,
        tx: to.x,
        ty: to.y,
        progress: 0,
        speed: 0.06 + Math.random() * 0.05,
      });
    }

    particles = newParticles;
  }

  function updateParticles() {
    for (let p of particles) {
      if (p.progress < 1) {
        p.progress += p.speed;
        if (p.progress > 1) p.progress = 1;
      }
      p.x += (p.tx - p.x) * p.speed;
      p.y += (p.ty - p.y) * p.speed;
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(p.x, p.y, isMobile ? 1.3 : 2.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const img = new Image();
  img.src =
    "https://github.com/Panbap/anh/blob/main/error/rainlovev2a1.png?raw=true";

  img.style.display = "none";

  img.onload = () => {
    img.style.display = "block";
    img.style.maxWidth = "100%";
    img.style.height = "auto";
  };

  img.onerror = () => {
    console.warn(" ");

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    }

    window.addEventListener("resize", resize);
    resize();

    function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
      const words = text.split(" ");
      let line = "";
      const lines = [];

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          lines.push(line.trim());
          line = words[i] + " ";
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());

      lines.forEach((line, i) => {
        ctx.fillText(line, x, y + i * lineHeight);
      });
    }

    function drawBackground() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(20, 20, 20, 0.97)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 48px Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const text = "Hệ thống đang cập nhật";
      const maxWidth = canvas.width * 0.8;
      const lineHeight = 60;
      const y = canvas.height / 2 - lineHeight / 2;
      wrapText(ctx, text, canvas.width / 2, y, maxWidth, lineHeight);
    }

    Object.assign(canvas.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 9999,
      pointerEvents: "auto",
    });

    document.body.appendChild(canvas);
  };

  // Hiệu ứng trái tim particle khi không có sticker
  const pinkboard = document.getElementById("pinkboard");
  const pinkCtx = pinkboard.getContext("2d");
  pinkboard.width = window.innerWidth;
  pinkboard.height = window.innerHeight;
  pinkboard.style.display = "none";

  let hearts = [];

  function createHeart(x, y) {
    hearts.push({
      x,
      y,
      size: Math.random() * 6 + 4,
      alpha: 1,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * -2 - 1,
    });
  }

  function drawHearts() {
    pinkCtx.clearRect(0, 0, pinkboard.width, pinkboard.height);
    hearts.forEach((h, i) => {
      pinkCtx.globalAlpha = h.alpha;
      pinkCtx.fillStyle = "pink";
      pinkCtx.beginPath();
      pinkCtx.moveTo(h.x, h.y);
      pinkCtx.bezierCurveTo(
        h.x + h.size,
        h.y - h.size,
        h.x + h.size * 2,
        h.y + h.size,
        h.x,
        h.y + h.size * 2
      );
      pinkCtx.bezierCurveTo(
        h.x - h.size * 2,
        h.y + h.size,
        h.x - h.size,
        h.y - h.size,
        h.x,
        h.y
      );
      pinkCtx.fill();
      h.x += h.dx;
      h.y += h.dy;
      h.alpha -= 0.01;
      if (h.alpha <= 0) hearts.splice(i, 1);
    });
  }

  function heartLoop() {
    drawHearts();
    requestAnimationFrame(heartLoop);
  }

  function startParticleHeart() {
    pinkboard.style.display = "block";
    setInterval(() => {
      createHeart(
        Math.random() * pinkboard.width,
        Math.random() * pinkboard.height
      );
    }, 200);
    heartLoop();
  }

  function morphToNextText() {
    currentIndex++;
    if (currentIndex >= texts.length) {
      particles = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ẩn canvas chữ khi hết chữ
      canvas.style.display = "none";

      // Hiện sticker cuối hoặc hiệu ứng trái tim
      if (
        sticker.src &&
        sticker.src !== window.location.href &&
        sticker.src.trim() !== ""
      ) {
        sticker.style.display = "block";
      } else {
        startParticleHeart();
      }

      stopAnimation = true;
      return;
    }

    const nextDots = generateDots(texts[currentIndex]);
    interpolateParticles(nextDots);
    lastMorphTime = Date.now();
  }

  function animate() {
    if (stopAnimation) return;

    updateParticles();
    drawParticles();

    const allArrived = particles.every(
      (p) => Math.abs(p.x - p.tx) < 0.5 && Math.abs(p.y - p.ty) < 0.5
    );
    if (allArrived && Date.now() - lastMorphTime > morphDelay) {
      morphToNextText();
    }

    requestAnimationFrame(animate);
  }

  // Khởi tạo
  const firstDots = generateDots(texts[0]);
  particles = firstDots.map((p) => ({
    x: canvas.width / 2,
    y: canvas.height / 2,
    tx: p.x,
    ty: p.y,
    progress: 0,
    speed: 0.05 + Math.random() * 0.05,
  }));

  canvas.style.display = "none";
  setTimeout(() => {
    canvas.style.display = "block";
    lastMorphTime = Date.now();
    animate();
  }, 1000);

  // Bắt sự kiện resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    shapeCanvas.width = canvas.width;
    shapeCanvas.height = canvas.height;
    pinkboard.width = window.innerWidth;
    pinkboard.height = window.innerHeight;
  });
});
