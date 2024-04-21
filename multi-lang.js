const Language = {
    current: "AR",
    toggle: function () {
        this.current = this.current === "EN" ? "AR" : "EN";
        this.loadLanguage();
        loading();
        reinitializeSwipers()
        updateSwipers()
    },
    loadLanguage: function () {
        const langFile = `./${this.current.toLowerCase()}.json`;
        fetch(langFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.translateUI(data);
                // Update HTML dir and lang attributes based on the selected language
                document.documentElement.dir = this.current === 'AR' ? 'rtl' : 'ltr';
                document.documentElement.lang = this.current.toLowerCase();
            })
            .catch(error => console.error(`Error fetching ${this.current} language file:`, error));
    },
    translateUI: function (data) {
        const langOption = document.querySelector(".lang-option");
        langOption.textContent = this.current === 'AR' ? 'EN' : 'AR';

        // Translate content in home section
        document.querySelector(".home h2").textContent = data.home.title;
        document.querySelector(".home p").innerHTML = data.home.subtitle + "<br><span>" + data.home.highlight + "</span>";
        document.querySelector(".home .btn").textContent = data.home.button;
        // Translate content in about section
        document.querySelector(".about h1").textContent = data.about.title;
        document.querySelector(".about p").textContent = data.about.content;
        // Translate content in service section
        document.querySelector(".service h1").textContent = data.service.title;
        const serviceContainer = document.querySelector('.service .service-container');

        // Check if the swiper wrapper element exists
        if (serviceContainer) {
            serviceContainer.innerHTML = '';
            // Map over the service items and create swiper slides
            data.service.items.forEach(item => {
                // Create a swiper slide element
                const slide = document.createElement('div');
                slide.classList.add('service-card');

                // Create and append the title element
                const title = document.createElement('h3');
                title.classList.add('card-title');
                title.textContent = item.title;
                slide.appendChild(title);

                // Create and append the description paragraph element
                const description = document.createElement('p');
                description.textContent = item.description;
                slide.appendChild(description);

                // Append the swiper slide to the swiper wrapper
                serviceContainer.appendChild(slide);
            });
        } else {
            console.error('Swiper wrapper element not found.');
        }
        const projectsserviceContainer = document.querySelector('.projects .swiper-wrapper');
        if (projectsserviceContainer) {
            projectsserviceContainer.innerHTML = '';
            for (let i = 0; i < 2; i++) {
                // Map over the project items and create swiper slides
                data.projects.forEach(project => {
                    // Create a swiper slide element
                    const slide = document.createElement('div');
                    slide.classList.add('swiper-slide');

                    // Create and append the image element
                    const image = document.createElement('img');
                    image.src = project.image;
                    image.alt = project.title;
                    slide.appendChild(image);

                    // Create and append the slide content container
                    const slideCont = document.createElement('div');
                    slideCont.classList.add('slide-cont');
                    slide.appendChild(slideCont);

                    // Create and append the title element
                    const title = document.createElement('h5');
                    title.textContent = project.title;
                    slideCont.appendChild(title);

                    // Create and append the description paragraph element
                    const description = document.createElement('p');
                    description.textContent = project.description;
                    slideCont.appendChild(description);

                    // Append the swiper slide to the swiper wrapper
                    projectsserviceContainer.appendChild(slide);
                });
            }
        } else {
            console.error('Projects swiper wrapper element not found.');
        }


        // Translate content in about us section
        document.querySelector(".about-us .label").textContent = data.aboutUs.label;
        document.querySelector(".about-us h2").textContent = data.aboutUs.title;
        document.querySelector(".about-us p").textContent = data.aboutUs.content;
        document.querySelector("#mission-btn").textContent = data.aboutUs.missionButton;
        document.querySelector("#vision-btn").textContent = data.aboutUs.visionButton;
        document.querySelector("#message-btn").textContent = data.aboutUs.messageButton;
        document.querySelector("#mission-text").textContent = data.aboutUs.missionText;
        document.querySelector("#vision-text").textContent = data.aboutUs.visionText;
        document.querySelector("#message-text").textContent = data.aboutUs.messageText;
        // Translate content in projects section
        document.querySelector(".projects .title h2").textContent = data.project.title;
        document.querySelector(".projects .title h3").textContent = data.project.subtitle;
        document.querySelector(".partners .title h2").textContent = data.partners.title;
        document.querySelector(".partners .title h3").textContent = data.partners.subtitle;
        document.querySelector(".form-container h3").textContent = data.form.title;
        // Translate content in contact section
        document.querySelector(".contact .title h2").textContent = data.contact.title;
        document.querySelector("input[name='fullname']").setAttribute('placeholder', data.placeholders.fullname);
        document.querySelector("input[name='email']").setAttribute('placeholder', data.placeholders.email);
        document.querySelector("input[name='phone']").setAttribute('placeholder', data.placeholders.phone);
        document.querySelector("textarea[name='message']").setAttribute('placeholder', data.placeholders.message);

        // Translate button text
        document.querySelector(".contact-form button").textContent = data.buttonText;

        // Translate footer content
        document.querySelector(".footer-box .box:nth-child(1) h3").textContent = data.footer.aboutNoy.title;
        document.querySelector(".footer-box .box:nth-child(1) p").textContent = data.footer.aboutNoy.content;
        document.querySelector(".footer-box .box:nth-child(2) h3").textContent = data.footer.contact.title;
        document.querySelector(".footer-box .box:nth-child(2) li:nth-child(1)").innerHTML = `<i class="fa-solid fa-location-dot"></i>${data.footer.contact.address}`;
        document.querySelector(".footer-box .box:nth-child(2) li:nth-child(2)").innerHTML = `<i class="fa-solid fa-phone-volume"></i>${data.footer.contact.phoneNumber}`;
        document.querySelector(".footer-box .box:nth-child(2) li:nth-child(3)").innerHTML = `<i class="fa-regular fa-envelope"></i>${data.footer.contact.email}`;

        document.querySelector(".credits").textContent = data.footer.copyright;

    }

};

// UI module
const UI = {
    init: function () {
        document.querySelector(".lang-option").addEventListener("click", () => Language.toggle());
        document.addEventListener("DOMContentLoaded", () => Language.loadLanguage());
    },
    // Other UI-related functions
};

// Initialize the UI
UI.init();
