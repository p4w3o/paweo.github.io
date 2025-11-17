const furnitureItems = [
  {
    x: 0.06,
    y: 0.08,
    width: 0.3,
    height: 0.22,
    fill: "#555555",
    link: "/portfolio/illus.html",
  },
  {
    x: 0.06,
    y: 0.299,
    width: 0.25,
    height: 0.49,
    fill: "#555555",
    link: "/portfolio/others.html",
  },
  {
    x: 0.63,
    y: 0.08,
    width: 0.35,
    height: 0.125,
    fill: "#555555",
    link: "/portfolio/photos.html",
  },
  {
    x: 0.63,
    y: 0.38,
    width: 0.35,
    height: 0.6,
    fill: "#555555",
    link: "/portfolio/movies.html",
  },
  {
    x: 0.43,
    y: 0.4,
    width: 0.55,
    height: 0.2,
    fill: "#555555",
    link: "https://example.com/bed",
  },
];

fetch("/static/roomplannav.svg")
  .then((res) => res.text())
  .then((svgText) => {
    const container = document.getElementById("floorplan-container");

    // Inject SVG inline
    container.innerHTML = svgText;
    const svg = container.querySelector("svg");
    if (!svg) return;

    const svgWidth = svg.viewBox.baseVal.width || svg.clientWidth;
    const svgHeight = svg.viewBox.baseVal.height || svg.clientHeight;

    // Create furniture group first
    const furnGroup = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "g",
    );
    furnGroup.setAttribute("id", "furn");

    furnitureItems.forEach((item) => {
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect",
      );
      rect.setAttribute("x", item.x * svgWidth);
      rect.setAttribute("y", item.y * svgHeight);
      rect.setAttribute("width", item.width * svgWidth);
      rect.setAttribute("height", item.height * svgHeight);
      rect.setAttribute("fill", item.fill);
      rect.classList.add("furniture");
      rect.dataset.link = item.link;

      const originalFill = item.fill;
      rect.addEventListener("mouseenter", () =>
        rect.setAttribute("fill", "red"),
      );
      rect.addEventListener("mouseleave", () =>
        rect.setAttribute("fill", originalFill),
      );
      rect.addEventListener("click", () => {
        const audio = new Audio("/sounds/seesaw.wav");

        // Disable clicking again while sound plays
        rect.style.pointerEvents = "none";

        audio.play().catch((err) => {
          console.error("Audio play failed:", err);
          // fallback: redirect immediately if audio fails
          window.location.href = rect.dataset.link;
        });

        audio.addEventListener("ended", () => {
          window.location.href = rect.dataset.link;
        });
      });

      furnGroup.appendChild(rect);
    });

    // Prepend furniture so floorplan overlays it
    svg.insertBefore(furnGroup, svg.firstChild);
  })
  .catch((err) => console.error(err));
