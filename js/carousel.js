document.querySelectorAll('.carousel').forEach(carousel => {

    const folder = carousel.dataset.folder;
    const imageCount = parseInt(carousel.dataset.count);
    const track = carousel.querySelector('.carousel-track');

    // generate slides
    for (let i = 1; i <= imageCount; i++) {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';

        const img = document.createElement('img');
        img.src = `${folder}img${i}.png`;
        img.alt = `image ${i}`;
        img.style.cursor = 'pointer'; // montre que c'est cliquable

        // fullscreen event
        img.addEventListener('click', () => {
            const carousel = img.closest('.carousel');
            if (!document.fullscreenElement) {
                if (carousel.requestFullscreen) carousel.requestFullscreen();
                else if (carousel.webkitRequestFullscreen) carousel.webkitRequestFullscreen();
                else if (carousel.msRequestFullscreen) carousel.msRequestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });

        slide.appendChild(img);
        track.appendChild(slide);
    }


    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
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
    track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    track.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) nextBtn.click();
        if (endX - startX > 50) prevBtn.click();
    });
    

});
