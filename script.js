/* =========================================================
   THEME
========================================================= */

const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    body.classList.add("light-theme");
}

function updateThemeIcon() {
    if (body.classList.contains("light-theme")) {
        themeIcon.textContent = "☾";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark technical theme"
        );
        themeToggle.setAttribute(
            "title",
            "Dark technical theme"
        );
    } else {
        themeIcon.textContent = "☀";
        themeToggle.setAttribute(
            "aria-label",
            "Switch to light professional theme"
        );
        themeToggle.setAttribute(
            "title",
            "Light professional theme"
        );
    }
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {

    body.classList.toggle("light-theme");

    const theme =
        body.classList.contains("light-theme")
            ? "light"
            : "dark";

    localStorage.setItem("portfolio-theme", theme);

    updateThemeIcon();
});


/* =========================================================
   MOUSE FOLLOWING LIGHT
========================================================= */

const isTouchDevice =
    window.matchMedia("(hover: none)").matches;

if (!isTouchDevice) {

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

    });

    function animateGlow() {

        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        document.documentElement.style.setProperty(
            "--mouse-x",
            `${currentX}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${currentY}px`
        );

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("main section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");

const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const currentId =
                    entry.target.getAttribute("id");

                navLinks.forEach((link) => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentId}`
                    );

                });

            });

        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   SUBTLE 3D CARD GESTURE
========================================================= */

if (!isTouchDevice) {

    const cards =
        document.querySelectorAll(".interactive-card");

    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateY =
                ((x - centerX) / centerX) * 2.2;

            const rotateX =
                ((centerY - y) / centerY) * 2.2;

            card.style.setProperty(
                "--rx",
                `${rotateX}deg`
            );

            card.style.setProperty(
                "--ry",
                `${rotateY}deg`
            );

        });

        card.addEventListener("mouseleave", () => {

            card.style.setProperty(
                "--rx",
                "0deg"
            );

            card.style.setProperty(
                "--ry",
                "0deg"
            );

        });

    });

}


/* =========================================================
   KEYBOARD SHORTCUT
   T = SWITCH THEME
========================================================= */

document.addEventListener("keydown", (event) => {

    const tag =
        document.activeElement.tagName;

    if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT"
    ) {
        return;
    }

    if (event.key.toLowerCase() === "t") {

        themeToggle.click();

    }

});


/* =========================================================
   EXTERNAL LINKS
========================================================= */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach((link) => {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});
