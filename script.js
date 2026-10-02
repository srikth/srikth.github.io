/* =========================================================
   THEME SYSTEM
========================================================= */

const html = document.documentElement;

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


function getStoredTheme() {

    try {
        return localStorage.getItem("portfolio-theme");
    } catch (error) {
        return null;
    }
}


function saveTheme(theme) {

    try {
        localStorage.setItem(
            "portfolio-theme",
            theme
        );
    } catch (error) {
        /* localStorage unavailable */
    }
}


function setTheme(theme) {

    html.setAttribute(
        "data-theme",
        theme
    );

    saveTheme(theme);

    if (theme === "dark") {

        themeIcon.textContent = "☀";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light theme"
        );

        themeToggle.setAttribute(
            "title",
            "Light professional theme"
        );

    } else {

        themeIcon.textContent = "☾";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark theme"
        );

        themeToggle.setAttribute(
            "title",
            "Dark technical theme"
        );
    }
}


/*
   ALWAYS START LIGHT unless
   the user previously selected dark.
*/

const savedTheme = getStoredTheme();

if (savedTheme === "dark") {

    setTheme("dark");

} else {

    setTheme("light");
}


/* toggle */

themeToggle.addEventListener(
    "click",
    () => {

        const current =
            html.getAttribute("data-theme");

        if (current === "dark") {

            setTheme("light");

        } else {

            setTheme("dark");
        }
    }
);


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

                entry.target.classList.add(
                    "revealed"
                );

                observer.unobserve(
                    entry.target
                );

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
   ACTIVE NAV
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


const navObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const id =
                    entry.target.id;

                navLinks.forEach((link) => {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href")
                        === `#${id}`
                    );

                });

            });

        },
        {
            rootMargin:
                "-40% 0px -50% 0px"
        }
    );


sections.forEach((section) => {

    navObserver.observe(section);

});


/* =========================================================
   SUBTLE MOUSE GESTURE
========================================================= */

const canHover =
    window.matchMedia(
        "(hover: hover)"
    ).matches;


if (canHover) {

    const cards =
        document.querySelectorAll(
            ".interactive-card"
        );

    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((centerY - y) /
                        centerY) * 1.5;

                const rotateY =
                    ((x - centerX) /
                        centerX) * 1.5;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-3px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });

}


/* =========================================================
   KEYBOARD THEME SHORTCUT
   T = THEME
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key.toLowerCase() !== "t"
        ) {
            return;
        }

        const active =
            document.activeElement;

        if (
            active &&
            (
                active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA" ||
                active.tagName === "SELECT"
            )
        ) {
            return;
        }

        themeToggle.click();

    }
);
