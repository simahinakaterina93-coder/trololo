document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // МУЗЫКАЛЬНЫЙ ПЛЕЕР
    // =========================

    const audio = document.getElementById("audio");
    const playBtn = document.getElementById("playBtn");
    const vinyl = document.getElementById("vinyl");

    const trackName = document.getElementById("trackName");
    const trackNumber = document.getElementById("trackNumber");
    const trackDesc = document.getElementById("trackDesc");

    const tracks = document.querySelectorAll(".track");

    let currentTrack = 0;

    // Включение / пауза
    playBtn.addEventListener("click", () => {

        if (audio.paused) {
            audio.play();

            playBtn.textContent = "Ⅱ";
            vinyl.classList.add("playing");

        } else {
            audio.pause();

            playBtn.textContent = "▶";
            vinyl.classList.remove("playing");
        }

    });


    // Переключение треков
    tracks.forEach((track, index) => {

        track.addEventListener("click", () => {

            currentTrack = index;

            const file = track.dataset.track;
            const name = track.dataset.name;
            const desc = track.dataset.desc;

            // Меняем музыку
            audio.src = file;

            // Меняем информацию
            trackName.textContent = name;
            trackDesc.textContent = desc;
            trackNumber.textContent =
                String(index + 1).padStart(2, "0") + " / TRACK";

            // Активная кнопка
            tracks.forEach(item => {
                item.classList.remove("active");
            });

            track.classList.add("active");

            // Запускаем выбранный трек
            audio.play();

            playBtn.textContent = "Ⅱ";
            vinyl.classList.add("playing");

        });

    });


    // Когда музыка закончилась
    audio.addEventListener("ended", () => {

        playBtn.textContent = "▶";
        vinyl.classList.remove("playing");

    });


    // =========================
    // ПОЯВЛЕНИЕ СЕКЦИЙ
    // =========================

    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.15
    });


    sections.forEach(section => {
        observer.observe(section);
    });


    // =========================
    // ПЛАВНАЯ ПРОКРУТКА
    // =========================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // =========================
    // ДВИЖЕНИЕ ФОТО
    // =========================

    const photos = document.querySelectorAll(".photo-frame, .film-photo");

    if (window.innerWidth > 800) {

        photos.forEach(photo => {

            photo.addEventListener("mousemove", (e) => {

                const rect = photo.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (e.clientY - rect.top) /
                    rect.height - 0.5;

                photo.style.transform =
                    `perspective(800px)
                     rotateY(${x * 5}deg)
                     rotateX(${-y * 5}deg)`;

            });

            photo.addEventListener("mouseleave", () => {

                photo.style.transform =
                    "perspective(800px) rotateY(0deg) rotateX(0deg)";

            });

        });

    }


    // =========================
    // ВИНИЛ
    // =========================

    if (window.innerWidth > 800 && vinyl) {

        vinyl.addEventListener("mousemove", (e) => {

            const rect = vinyl.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) /
                rect.width - 0.5;

            const y =
                (e.clientY - rect.top) /
                rect.height - 0.5;

            vinyl.style.transform =
                `rotate(${x * 8}deg)
                 rotateX(${y * 5}deg)`;

        });

        vinyl.addEventListener("mouseleave", () => {

            vinyl.style.transform = "";
        });

    }


    // =========================
    // КУРСОР
    // =========================

    if (window.innerWidth > 800) {

        const cursor = document.createElement("div");

        cursor.className = "custom-cursor";

        document.body.appendChild(cursor);

        document.addEventListener("mousemove", (e) => {

            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";

        });

    }

});