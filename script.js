/* =========================================================
SRIkth.github.io
JAVASCRIPT
========================================================= */

/* =========================================================
THEME TOGGLE
========================================================= */

const themeToggle =
document.getElementById("themeToggle");

const savedTheme =
localStorage.getItem("theme");

if (savedTheme === "light") {

```
document.body.classList.add("light-theme");

themeToggle.textContent = "☀";
```

} else {

```
themeToggle.textContent = "☾";
```

}

themeToggle.addEventListener("click", () => {

```
document.body.classList.toggle("light-theme");


const isLight =
    document.body.classList.contains("light-theme");


if (isLight) {

    themeToggle.textContent = "☀";

    localStorage.setItem(
        "theme",
        "light"
    );

} else {

    themeToggle.textContent = "☾";

    localStorage.setItem(
        "theme",
        "dark"
    );

}
```

});

/* =========================================================
CURRENT YEAR
========================================================= */

const yearElement =
document.getElementById("year");

if (yearElement) {

```
yearElement.textContent =
    new Date().getFullYear();
```

}

/* =========================================================
ACTIVE NAVIGATION
========================================================= */

const sections =
document.querySelectorAll("section[id]");

const navLinks =
document.querySelectorAll(".nav-links a");

const observerOptions = {

```
root: null,

rootMargin:
    "-25% 0px -60% 0px",

threshold: 0
```

};

const sectionObserver =
new IntersectionObserver(
(entries) => {

```
        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }


            const id =
                entry.target.getAttribute("id");


            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${id}`
                ) {

                    link.classList.add("active");

                }

            });

        });

    },
    observerOptions
);
```

sections.forEach(section => {

```
sectionObserver.observe(section);
```

});

/* =========================================================
SMOOTH NAVIGATION
========================================================= */

navLinks.forEach(link => {

```
link.addEventListener("click", event => {

    const targetId =
        link.getAttribute("href");


    if (!targetId.startsWith("#")) {
        return;
    }


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
```

});

/* =========================================================
REVEAL ANIMATION
========================================================= */

const revealElements =
document.querySelectorAll(
".research-card, " +
".project-card, " +
".timeline-card, " +
".skill-group, " +
".award-item"
);

revealElements.forEach(element => {

```
element.style.opacity = "0";

element.style.transform =
    "translateY(18px)";

element.style.transition =
    "opacity 0.6s ease, transform 0.6s ease";
```

});

const revealObserver =
new IntersectionObserver(
entries => {

```
        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }


            entry.target.style.opacity = "1";

            entry.target.style.transform =
                "translateY(0)";


            revealObserver.unobserve(
                entry.target
            );

        });

    },
    {
        threshold: 0.12
    }
);
```

revealElements.forEach(element => {

```
revealObserver.observe(element);
```

});

/* =========================================================
KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", event => {

```
if (
    event.key === "t" &&
    !event.ctrlKey &&
    !event.altKey &&
    !event.metaKey &&
    document.activeElement.tagName !== "INPUT" &&
    document.activeElement.tagName !== "TEXTAREA"
) {

    themeToggle.click();

}
```

});
