/* =========================
   DARK / LIGHT THEME
========================= */

const themeToggle =
    document.getElementById("theme-toggle");


function applyTheme(theme) {

    if (theme === "light") {

        document.body.classList.add(
            "light-theme"
        );

        if (themeToggle) {

            themeToggle.textContent = "☾";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark theme"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark theme"
            );
        }

    } else {

        document.body.classList.remove(
            "light-theme"
        );

        if (themeToggle) {

            themeToggle.textContent = "☀";

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light theme"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light theme"
            );
        }
    }
}


/* =========================
   LOAD SAVED THEME
========================= */

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme) {

    applyTheme(savedTheme);

} else {

    applyTheme("dark");
}


/* =========================
   THEME TOGGLE
========================= */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const isLight =
                document.body.classList.contains(
                    "light-theme"
                );


            const newTheme =
                isLight ? "dark" : "light";


            applyTheme(newTheme);


            localStorage.setItem(
                "theme",
                newTheme
            );

        }
    );
}



/* =========================
   FOOTER YEAR
========================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}



/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        "nav a"
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop - 160;


            if (
                window.scrollY >=
                sectionTop
            ) {

                currentSection =
                    section.getAttribute(
                        "id"
                    );

            }

        }
    );


    navLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);



/* =========================
   SMOOTH NAVIGATION
========================= */

navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetID ||
                    !targetID.startsWith("#")
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }
        );

    }
);



/* =========================
   PROJECT LINKS
========================= */

const projectLinks =
    document.querySelectorAll(
        ".project-link"
    );


projectLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                console.log(
                    "Opening project:",
                    link.href
                );

            }
        );

    }
);



/* =========================
   PAGE LOADING
========================= */

document.documentElement.classList.add(
    "page-loading"
);


window.addEventListener(
    "load",
    () => {

        document.documentElement.classList.remove(
            "page-loading"
        );

    }
);



/* =========================
   SCROLL REVEAL
========================= */

const revealItems =
    document.querySelectorAll(

        ".research-item, " +
        ".timeline-item, " +
        ".project, " +
        ".skill-group, " +
        ".simple-list > div"

    );


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "cyber-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.08
            }

        );


    revealItems.forEach(
        (item) => {

            item.classList.add(
                "cyber-reveal"
            );


            observer.observe(
                item
            );

        }
    );

}



/* =========================
   INITIAL NAVIGATION
========================= */

updateActiveNavigation();
