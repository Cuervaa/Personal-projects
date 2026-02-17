document.addEventListener("DOMContentLoaded", function () {

    const carousel = document.querySelector(".news-carousel");
    const cards = document.querySelectorAll(".news-card");
    const nextBtn = document.querySelector(".news-arrow.next");
    const prevBtn = document.querySelector(".news-arrow.prev");

    let index = 0;
    const intervalTime = 4000;
    const gap = 30;

    function getCardWidth() {
        return cards[0].offsetWidth + gap;
    }

    function getVisibleSlides() {
        const containerWidth = document.querySelector(".news-wrapper").offsetWidth;
        return Math.floor(containerWidth / getCardWidth());
    }

    function getMaxIndex() {
        return cards.length - getVisibleSlides();
    }

    function updateSlider() {
        const offset = index * getCardWidth();
        carousel.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
        index++;
        if (index > getMaxIndex()) {
            index = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        index--;
        if (index < 0) {
            index = getMaxIndex();
        }
        updateSlider();
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    let autoSlide = setInterval(nextSlide, intervalTime);

    document.querySelector(".news-wrapper").addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    document.querySelector(".news-wrapper").addEventListener("mouseleave", () => {
        autoSlide = setInterval(nextSlide, intervalTime);
    });

    window.addEventListener("resize", () => {
        updateSlider();
    });

});

// Resultados Partidos
document.addEventListener("DOMContentLoaded", function () {

    const resultCards = document.querySelectorAll(".result-card");

    resultCards.forEach(card => {

        const scoreBox = card.querySelector(".score");
        const homeScore = parseInt(scoreBox.dataset.home);
        const awayScore = parseInt(scoreBox.dataset.away);

        const homeScoreEl = scoreBox.querySelector(".home-score");
        const awayScoreEl = scoreBox.querySelector(".away-score");
        const badge = card.querySelector(".badge");
        const league = card.querySelector(".result-league");

        const teams = card.querySelectorAll(".team span");

        const homeTeamName = teams[0].textContent;
        const awayTeamName = teams[1].textContent;

        // Pintar marcador
        homeScoreEl.textContent = homeScore;
        awayScoreEl.textContent = awayScore;

        let urolaScore, rivalScore;
        let isHome = false;

        if (homeTeamName.includes("Urola")) {
            urolaScore = homeScore;
            rivalScore = awayScore;
            isHome = true;
        } else if (awayTeamName.includes("Urola")) {
            urolaScore = awayScore;
            rivalScore = homeScore;
            isHome = false;
        } else {
            return;
        }

        // Limpiar clases previas
        card.classList.remove("victoria", "derrota", "empate");

        if (urolaScore > rivalScore) {
            card.classList.add("victoria");
            badge.textContent = "Victoria";
        } else if (urolaScore < rivalScore) {
            card.classList.add("derrota");
            badge.textContent = "Derrota";
        } else {
            card.classList.add("empate");
            badge.textContent = "Empate";
        }

    });

});


// -----------------------Sponsors Carousel --------------------------------
document.addEventListener("DOMContentLoaded", function () {

    const sponsorLogos = document.querySelectorAll(
        ".sponsors-main img, .sponsors-secondary img"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {

                sponsorLogos.forEach((logo, index) => {
                    setTimeout(() => {
                        logo.classList.add("visible");
                    }, index * 150); // delay escalonado
                });

                observer.disconnect(); // solo una vez
            }
        });
    }, { threshold: 0.3 });

    observer.observe(document.querySelector(".sponsors"));

});

// ----------------------- Seccion de Noticias -------------------------------- // 
document.addEventListener("DOMContentLoaded", function () {

    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        threshold: 0.2
    });

    reveals.forEach(el => observer.observe(el));

});