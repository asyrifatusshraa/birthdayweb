// =========================================================
// BACKGROUND MUSIC
// =========================================================

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");

let musicPlaying = false;


// Mulai musik setelah user berinteraksi
function startMusic() {
    if (!musicPlaying) {
        music.volume = 0.45;

        music.play()
            .then(() => {
                musicPlaying = true;
                musicButton.classList.add("playing");
                musicButton.textContent = "♫";
            })
            .catch(() => {
                console.log("Music needs user interaction.");
            });
    }
}


// Tombol music
musicButton.addEventListener("click", () => {

    if (music.paused) {

        music.play()
            .then(() => {
                musicPlaying = true;
                musicButton.classList.add("playing");
                musicButton.textContent = "♫";
            })
            .catch(() => {
                console.log("Music could not be played.");
            });

    } else {

        music.pause();

        musicPlaying = false;

        musicButton.classList.remove("playing");

        musicButton.textContent = "♪";
    }

});


// =========================================================
// SECTION
// =========================================================

const opening = document.getElementById("opening");
const codeSection = document.getElementById("codeSection");
const birthdaySection = document.getElementById("birthdaySection");

const letterSection = document.getElementById("letterSection");
const memoriesSection = document.getElementById("memoriesSection");
const finalSection = document.getElementById("finalSection");


// Fungsi untuk menampilkan section
function showSection(section) {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    setTimeout(() => {

        section.style.display = "flex";

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 100);
}


// =========================================================
// OPENING → SECRET CODE
// =========================================================

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {

    // Mulai musik
    startMusic();

    // Sembunyikan opening
    opening.style.display = "none";

    // Tampilkan code section
    codeSection.style.display = "flex";

    codeSection.scrollIntoView({
        behavior: "smooth"
    });

});


// =========================================================
// SECRET CODE
// =========================================================

const numberButtons =
    document.querySelectorAll(".number-button[data-number]");

const deleteNumber =
    document.getElementById("deleteNumber");

const codeDots =
    document.querySelectorAll(".code-dot");

const wrongCode =
    document.getElementById("wrongCode");


// GANTI ANGKA INI kalau mau kode berbeda
const secretCode = "0908";

let enteredCode = "";


// Klik angka
numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (enteredCode.length >= secretCode.length) {
            return;
        }

        const number = button.dataset.number;

        enteredCode += number;

        updateCodeDots();

        wrongCode.classList.remove("show");


        // Kalau jumlah angka sudah 4
        if (enteredCode.length === secretCode.length) {

            setTimeout(() => {

                checkCode();

            }, 350);

        }

    });

});


// =========================================================
// UPDATE DOTS
// =========================================================

function updateCodeDots() {

    codeDots.forEach((dot, index) => {

        if (index < enteredCode.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }

    });

}


// =========================================================
// DELETE CODE
// =========================================================

deleteNumber.addEventListener("click", () => {

    enteredCode =
        enteredCode.slice(0, -1);

    updateCodeDots();

    wrongCode.classList.remove("show");

});


// =========================================================
// CHECK CODE
// =========================================================

function checkCode() {

    if (enteredCode === secretCode) {

        // Kode benar
        setTimeout(() => {

            codeSection.style.display = "none";

            birthdaySection.style.display = "flex";

            birthdaySection.scrollIntoView({
                behavior: "smooth"
            });

        }, 300);


    } else {

        // Kode salah
        wrongCode.classList.add("show");

        // Getar sedikit
        codeSection
            .querySelector(".code-container")
            .animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(-8px)" },
                    { transform: "translateX(8px)" },
                    { transform: "translateX(-5px)" },
                    { transform: "translateX(5px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 350
                }
            );


        // Reset
        setTimeout(() => {

            enteredCode = "";

            updateCodeDots();

        }, 500);

    }

}


// =========================================================
// BIRTHDAY → LETTER
// =========================================================

const letterButton =
    document.getElementById("letterButton");

letterButton.addEventListener("click", () => {

    letterSection.scrollIntoView({
        behavior: "smooth"
    });

});


// =========================================================
// LETTER → MEMORIES
// =========================================================

const memoriesButton =
    document.getElementById("memoriesButton");

memoriesButton.addEventListener("click", () => {

    memoriesSection.scrollIntoView({
        behavior: "smooth"
    });

});


// =========================================================
// REVEAL PHOTO ANIMATION
// =========================================================

const photoCards =
    document.querySelectorAll(".photo-card");

const photoObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        entry.target.classList.contains("photo-one")
                            ? "rotate(-3deg) translateY(0)"
                            : entry.target.classList.contains("photo-two")
                                ? "rotate(3deg) translateY(0)"
                                : "rotate(-2deg) translateY(0)";

                }

            });

        },
        {
            threshold: 0.2
        }
    );


photoCards.forEach(card => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(40px) rotate(0deg)";

    card.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    photoObserver.observe(card);

});


// =========================================================
// FINAL SECTION
// =========================================================

// Final section memang langsung ada di bawah memories.
// Jadi user cukup scroll ke bawah untuk melihatnya.


// =========================================================
// KEEP MUSIC PLAYING
// =========================================================

// Kalau halaman kembali aktif,
// musik tetap dicoba untuk dilanjutkan.

document.addEventListener("visibilitychange", () => {

    if (
        document.visibilityState === "visible" &&
        musicPlaying &&
        music.paused
    ) {

        music.play().catch(() => {});

    }

});


// =========================================================
// PREVENT MUSIC FROM RESTARTING
// =========================================================

// Musik hanya dibuat satu kali.
// Tidak ada music.play() saat pindah section ,
// sehingga posisi lagu tetap melanjutkan dari sebelumnya.

console.log("Birthday website ready ♡");
