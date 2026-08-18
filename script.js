/* =========================================================
   OĞUZ SAKA — PERSONAL PORTFOLIO
   GLOBAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const body =
        document.body;

    const themeToggle =
        document.getElementById(
            "theme-toggle"
        );

    const menuToggle =
        document.getElementById(
            "menu-toggle"
        );

    const navbar =
        document.getElementById(
            "navbar"
        );

    const scrollTop =
        document.getElementById(
            "scroll-top"
        );


    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    function updateThemeIcon() {

        if (!themeToggle)
            return;


        const icon =
            themeToggle.querySelector("i");


        if (!icon)
            return;


        if (
            body.classList.contains(
                "dark-mode"
            )
        ) {

            icon.classList.remove(
                "fa-moon"
            );

            icon.classList.add(
                "fa-sun"
            );


            themeToggle.setAttribute(
                "aria-label",
                "Aydınlık moda geç"
            );


            themeToggle.setAttribute(
                "title",
                "Aydınlık moda geç"
            );

        } else {

            icon.classList.remove(
                "fa-sun"
            );

            icon.classList.add(
                "fa-moon"
            );


            themeToggle.setAttribute(
                "aria-label",
                "Gece moduna geç"
            );


            themeToggle.setAttribute(
                "title",
                "Gece moduna geç"
            );
        }
    }


    function setTheme(theme) {

        if (
            theme === "dark"
        ) {

            body.classList.add(
                "dark-mode"
            );

        } else {

            body.classList.remove(
                "dark-mode"
            );
        }


        localStorage.setItem(
            "oguz-theme",
            theme
        );


        updateThemeIcon();
    }


    function loadTheme() {

        const savedTheme =
            localStorage.getItem(
                "oguz-theme"
            );


        if (savedTheme) {

            setTheme(
                savedTheme
            );

            return;
        }


        const prefersDark =
            window.matchMedia &&
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;


        if (prefersDark) {

            setTheme(
                "dark"
            );

        } else {

            setTheme(
                "light"
            );
        }
    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isDark =
                    body.classList.contains(
                        "dark-mode"
                    );


                setTheme(
                    isDark
                        ? "light"
                        : "dark"
                );
            }
        );
    }


    loadTheme();



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function closeMenu() {

        if (
            !navbar ||
            !menuToggle
        ) {

            return;
        }


        navbar.classList.remove(
            "open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        const icon =
            menuToggle.querySelector(
                "i"
            );


        if (icon) {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );
        }


        const projectModal =
            document.getElementById(
                "project-modal"
            );


        if (
            !projectModal ||
            !projectModal.classList.contains(
                "active"
            )
        ) {

            body.classList.remove(
                "no-scroll"
            );
        }
    }


    function toggleMenu() {

        if (
            !navbar ||
            !menuToggle
        ) {

            return;
        }


        const isOpen =
            navbar.classList.toggle(
                "open"
            );


        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        const icon =
            menuToggle.querySelector(
                "i"
            );


        if (icon) {

            icon.classList.toggle(
                "fa-bars",
                !isOpen
            );

            icon.classList.toggle(
                "fa-xmark",
                isOpen
            );
        }


        if (isOpen) {

            body.classList.add(
                "no-scroll"
            );

        } else {

            body.classList.remove(
                "no-scroll"
            );
        }
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );
    }


    if (navbar) {

        const navLinks =
            navbar.querySelectorAll(
                ".nav-link"
            );


        navLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        closeMenu();

                    }
                );
            }
        );
    }


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 768
            ) {

                closeMenu();
            }
        }
    );



    /* =====================================================
       SCROLL TOP BUTTON
    ===================================================== */

    function handleScroll() {

        if (!scrollTop)
            return;


        if (
            window.scrollY > 500
        ) {

            scrollTop.classList.add(
                "visible"
            );

        } else {

            scrollTop.classList.remove(
                "visible"
            );
        }
    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    if (scrollTop) {

        scrollTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });
            }
        );
    }


    handleScroll();



    /* =====================================================
       SCROLL REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        revealElements.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (
                    entries,
                    observer
                ) => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );
            }
        );

    } else {

        revealElements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );
            }
        );
    }



    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target)
                        return;


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            ".site-header"
                        );


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        headerHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });
                }
            );
        }
    );



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const currentFile =
        currentPage === ""
            ? "index.html"
            : currentPage;


    document
        .querySelectorAll(
            ".nav-link"
        )
        .forEach(
            link => {

                const linkFile =
                    link.getAttribute(
                        "href"
                    );


                if (
                    linkFile ===
                    currentFile
                ) {

                    link.classList.add(
                        "active"
                    );

                } else {

                    link.classList.remove(
                        "active"
                    );
                }
            }
        );



    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    function updateHeader() {

        if (!header)
            return;


        if (
            window.scrollY > 30
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );
        }
    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();



    /* =====================================================
       EXTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="http"]'
        )
        .forEach(
            link => {

                if (
                    !link.getAttribute(
                        "target"
                    )
                ) {

                    link.setAttribute(
                        "target",
                        "_blank"
                    );
                }


                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );
            }
        );



    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    yearElements.forEach(
        element => {

            element.textContent =
                new Date()
                    .getFullYear();
        }
    );



    /* =====================================================
       PAGE LOAD
    ===================================================== */

    window.setTimeout(
        () => {

            body.classList.add(
                "page-loaded"
            );

        },
        100
    );



    /* =====================================================
       PROJECT DETAIL MODAL
    ===================================================== */

    const projectModal =
        document.getElementById(
            "project-modal"
        );


    const projectModalClose =
        document.getElementById(
            "project-modal-close"
        );


    const projectDetailButtons =
        document.querySelectorAll(
            ".project-detail-btn"
        );



    /* =====================================================
       PROJECT DATA
    ===================================================== */

    const projectData = {


        /* =================================================
           AI SPORT / DIET APP
        ================================================= */

        "ai-sport": {

            title:
                "Yapay Zeka Destekli Spor ve Diyet Uygulaması",


            icon:
                "fa-dumbbell",


            status:
                "Geliştirme Aşamasında",


            statusClass:
                "developing",


            description:
                "Spor ve beslenme süreçlerini tek bir mobil uygulama üzerinden takip etmeyi amaçlayan, yapay zeka destekli kapsamlı bir spor ve diyet uygulaması geliştiriyorum. Uygulama; günlük beslenme takibi, kalori ve makro değerlerinin görüntülenmesi, yemek arama, fotoğraftan yemek analizi, barkod tarama ve yapay zeka destekli kalori tahmini gibi özellikler içeriyor.",


            purpose:
                "Kullanıcıların günlük beslenme ve spor süreçlerini daha düzenli takip edebilmesini sağlamak ve yapay zeka teknolojilerini gerçek bir mobil uygulama üzerinde kullanarak kapsamlı bir proje geliştirmek.",


            technologies: [

                "Flutter",

                "Dart",

                "C#",

                "ASP.NET Core",

                "SQL Server",

                "REST API",

                "Yapay Zeka"

            ],


            features: [

                "Yapay zeka destekli kalori tahmini",

                "Fotoğraftan yemek analizi",

                "Günlük kalori takibi",

                "Protein, karbonhidrat ve yağ takibi",

                "Kahvaltı, öğle, akşam ve ara öğün takibi",

                "Yemek arama",

                "Besin ve öğün ekleme",

                "Barkod tarama",

                "AI Koç",

                "Kullanıcı kayıt ve giriş sistemi",

                "Kişisel günlük kalori hedefi",

                "Mobil kullanıcı arayüzü"

            ],


            state:
                "Proje aktif olarak geliştirilmektedir. Yeni özellikler eklenmekte ve mevcut sistemler geliştirilmeye devam etmektedir."

        },



        /* =================================================
           MATCH PREDICTION
        ================================================= */

        "match-predict": {

            title:
                "Maç Sonucu Tahmin Uygulaması",


            icon:
                "fa-desktop",


            status:
                "Tamamlandı",


            statusClass:
                "completed",


            description:
                "Kullanıcı tarafından girilen verilere göre bir maçın sonucunu tahmin etmeyi hedefleyen masaüstü uygulaması.",


            purpose:
                "Girilen verileri kullanarak maç sonucu tahmini gerçekleştiren ve tahmin mantığını uygulamalı olarak deneyimlemeyi sağlayan bir masaüstü uygulaması geliştirmek.",


            technologies: [

                "C#",

                "Masaüstü",

                "Tahmin",

                "Veri İşleme"

            ],


            features: [

                "Maç verilerinin işlenmesi",

                "Tahmin sonucu oluşturma",

                "Kullanıcı veri girişi",

                "Masaüstü kullanıcı arayüzü",

                "Tahmin sonuçlarının görüntülenmesi"

            ],


            state:
                "Proje geliştirme süreci tamamlanmıştır."

        },



        /* =================================================
           PERSONAL PORTFOLIO
        ================================================= */

        "portfolio": {

            title:
                "Kişisel Portföy Web Sitesi",


            icon:
                "fa-globe",


            status:
                "Aktif Geliştiriliyor",


            statusClass:
                "developing",


            description:
                "Kişisel bilgilerimi, projelerimi, eğitimimi, deneyimlerimi ve yazılım geliştirme yolculuğumu profesyonel bir şekilde sergilemek amacıyla geliştirdiğim kişisel portföy web sitesi.",


            purpose:
                "Kendimi, projelerimi ve teknik becerilerimi profesyonel bir web sitesi üzerinden sergilemek ve zaman içerisinde geliştirmeye devam edeceğim kalıcı bir kişisel portföy oluşturmaktır.",


            technologies: [

                "HTML5",

                "CSS3",

                "JavaScript",

                "Responsive Design",

                "GitHub Pages"

            ],


            features: [

                "Responsive tasarım",

                "Karanlık / aydınlık tema",

                "Mobil navigasyon menüsü",

                "Proje detay modalı",

                "Scroll animasyonları",

                "Kişisel proje tanıtımı",

                "Özgeçmiş sayfası",

                "Hakkımda sayfası",

                "GitHub ve LinkedIn bağlantıları"

            ],


            state:
                "Portföy sitesi aktif olarak geliştirilmektedir. Yeni projeler, bilgiler ve geliştirmeler zaman içerisinde eklenmektedir."

        }

    };



    /* =====================================================
       MODAL ELEMENTS
    ===================================================== */

    const modalTitle =
        document.getElementById(
            "project-modal-title"
        );


    const modalDescription =
        document.getElementById(
            "project-modal-description"
        );


    const modalPurpose =
        document.getElementById(
            "project-modal-purpose"
        );


    const modalState =
        document.getElementById(
            "project-modal-state"
        );


    const modalStatus =
        document.getElementById(
            "project-modal-status"
        );


    const modalIcon =
        document.getElementById(
            "project-modal-icon"
        );


    const modalTags =
        document.getElementById(
            "project-modal-tags"
        );


    const modalFeatures =
        document.getElementById(
            "project-modal-features"
        );



    /* =====================================================
       OPEN PROJECT MODAL
    ===================================================== */

    function openProjectModal(
        projectId
    ) {

        if (!projectModal)
            return;


        const project =
            projectData[
                projectId
            ];


        if (!project)
            return;


        if (
            !modalTitle ||
            !modalDescription ||
            !modalPurpose ||
            !modalState ||
            !modalStatus ||
            !modalIcon ||
            !modalTags
        ) {

            return;
        }



        /* ================================================
           TITLE
        ================================================= */

        modalTitle.textContent =
            project.title;



        /* ================================================
           DESCRIPTION
        ================================================= */

        modalDescription.textContent =
            project.description;



        /* ================================================
           PURPOSE
        ================================================= */

        modalPurpose.textContent =
            project.purpose;



        /* ================================================
           STATE
        ================================================= */

        modalState.textContent =
            project.state;



        /* ================================================
           STATUS
        ================================================= */

        modalStatus.textContent =
            project.status;


        modalStatus.className =
            "project-status " +
            project.statusClass;



        /* ================================================
           ICON
        ================================================= */

        modalIcon.innerHTML =
            `<i class="fas ${project.icon}"></i>`;



        /* ================================================
           TECHNOLOGIES
        ================================================= */

        modalTags.innerHTML =
            "";


        project.technologies.forEach(
            technology => {

                const tag =
                    document.createElement(
                        "span"
                    );


                tag.textContent =
                    technology;


                modalTags.appendChild(
                    tag
                );
            }
        );



        /* ================================================
           FEATURES
        ================================================= */

        if (modalFeatures) {

            modalFeatures.innerHTML =
                "";


            if (
                project.features &&
                project.features.length > 0
            ) {

                project.features.forEach(
                    feature => {

                        const featureTag =
                            document.createElement(
                                "span"
                            );


                        featureTag.textContent =
                            feature;


                        modalFeatures.appendChild(
                            featureTag
                        );
                    }
                );

            } else {

                const emptyFeature =
                    document.createElement(
                        "span"
                    );


                emptyFeature.textContent =
                    "Bu proje için henüz özellik bilgisi eklenmedi.";


                modalFeatures.appendChild(
                    emptyFeature
                );
            }
        }



        /* ================================================
           OPEN
        ================================================= */

        projectModal.classList.add(
            "active"
        );


        projectModal.setAttribute(
            "aria-hidden",
            "false"
        );


        body.classList.add(
            "no-scroll"
        );


        if (projectModalClose) {

            projectModalClose.focus();

        }
    }



    /* =====================================================
       CLOSE PROJECT MODAL
    ===================================================== */

    function closeProjectModal() {

        if (!projectModal)
            return;


        projectModal.classList.remove(
            "active"
        );


        projectModal.setAttribute(
            "aria-hidden",
            "true"
        );


        if (
            !navbar ||
            !navbar.classList.contains(
                "open"
            )
        ) {

            body.classList.remove(
                "no-scroll"
            );
        }
    }



    /* =====================================================
       PROJECT BUTTON EVENTS
    ===================================================== */

    projectDetailButtons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const projectId =
                        button.dataset.project;


                    openProjectModal(
                        projectId
                    );
                }
            );
        }
    );



    /* =====================================================
       MODAL CLOSE BUTTON
    ===================================================== */

    if (projectModalClose) {

        projectModalClose.addEventListener(
            "click",
            closeProjectModal
        );
    }



    /* =====================================================
       MODAL OVERLAY CLOSE
    ===================================================== */

    if (projectModal) {

        projectModal.addEventListener(
            "click",
            event => {

                if (
                    event.target.hasAttribute(
                        "data-modal-close"
                    )
                ) {

                    closeProjectModal();
                }
            }
        );
    }



    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape"
            ) {

                return;
            }


            /* ---------------------------------------------
               Önce proje modalını kapat
            --------------------------------------------- */

            if (
                projectModal &&
                projectModal.classList.contains(
                    "active"
                )
            ) {

                closeProjectModal();

                return;
            }


            /* ---------------------------------------------
               Modal yoksa mobil menüyü kapat
            --------------------------------------------- */

            closeMenu();

        }
    );


});