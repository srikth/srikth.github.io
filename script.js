/* =========================================================
   SRIKANTH SHANMUGAM
   CYBERPUNK RESEARCH PORTFOLIO
   ========================================================= */


/* ================= CURRENT YEAR ================= */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* ================= ACTIVE NAVIGATION ================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll("nav a");


function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 140;

        if (window.scrollY >= sectionTop) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const href =
            link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* ================= SMOOTH NAVIGATION ================= */

navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                !targetID.startsWith("#")
            ) {

                return;

            }


            const target =
                document.querySelector(targetID);


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

});


/* ================= PROJECT LINKS ================= */

const projectLinks =
    document.querySelectorAll(
        ".project-link"
    );


projectLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            console.log(
                "Opening project:",
                link.href
            );

        }
    );

});


/* ================= PAGE LOAD ================= */

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


/* ================= SECTION REVEAL ================= */

const revealItems =
    document.querySelectorAll(
        ".research-item, " +
        ".timeline-item, " +
        ".project, " +
        ".skill-group, " +
        ".simple-list li"
    );


if ("IntersectionObserver" in window) {


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


    revealItems.forEach((item) => {

        item.classList.add(
            "cyber-reveal"
        );

        observer.observe(item);

    });

}


/* ================= INITIAL STATE ================= */

updateActiveNavigation();
