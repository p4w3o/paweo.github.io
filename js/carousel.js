document.querySelectorAll(".carousel").forEach((carousel) => {
  const folder = carousel.dataset.folder;
  const imageCount = parseInt(carousel.dataset.count);
  const track = carousel.querySelector(".carousel-track");

  // Fonction utilitaire pour ajouter un zéro initial si le nombre est < 10
  // Ex: 1 -> "01", 10 -> "10"
  const formatIndex = (i) => {
    return i < 10 ? `0${i}` : `${i}`;
  };

  // generate slides
  for (let i = 1; i <= imageCount; i++) {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";

    const img = document.createElement("img");

    // 💥 NOUVEAUTÉ : Utilisation de formatIndex pour obtenir "01", "02", etc.
    const indexStr = formatIndex(i);

    // 1. UTILISER LA VERSION MED POUR L'AFFICHAGE INITIAL (optimisation)
    img.src = `${folder}med${indexStr}.jpg`;
    img.alt = `image ${i}`;
    img.style.cursor = "pointer";

    // 2. STOCKER L'URL DE LA VERSION HD DANS UN ATTRIBUT data-hd-src
    // Utilise également le formatIndex pour le nom du fichier HD
    img.dataset.hdSrc = `${folder}hd${indexStr}.jpg`;

    // fullscreen event
    img.addEventListener("click", () => {
      const currentImg = img;
      const carouselElement = currentImg.closest(".carousel");

      if (!document.fullscreenElement) {
        // AVANT de passer en plein écran, changer la source pour charger l'image HD
        currentImg.src = currentImg.dataset.hdSrc;

        // Entrer en mode plein écran
        if (carouselElement.requestFullscreen)
          carouselElement.requestFullscreen();
        else if (carouselElement.webkitRequestFullscreen)
          carouselElement.webkitRequestFullscreen();
        else if (carouselElement.msRequestFullscreen)
          carouselElement.msRequestFullscreen();
      } else {
        // Lorsque l'utilisateur quitte le plein écran, on peut remettre la version MED
        // Utilisez indexStr ici aussi si vous voulez recharger le "med0X.jpg"
        document.exitFullscreen();
        currentImg.src = `${folder}med${indexStr}.jpg`; // Recharger l'image MED
      }
    });

    slide.appendChild(img);
    track.appendChild(slide);
  }

  const slides = [...carousel.querySelectorAll(".carousel-slide")];
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  let index = 0;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.onclick = () => {
    index = (index + 1) % slides.length;
    update();
  };

  prevBtn.onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  // keyboard support (only when hovered/focused)
  carousel.addEventListener("mouseenter", () => {
    window.addEventListener("keydown", handleKeys);
  });
  carousel.addEventListener("mouseleave", () => {
    window.removeEventListener("keydown", handleKeys);
  });

  function handleKeys(e) {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  }

  // swipe support
  let startX = 0;
  track.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
  track.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextBtn.click();
    if (endX - startX > 50) prevBtn.click();
  });
});
