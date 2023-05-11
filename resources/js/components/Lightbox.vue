<template>
    <div id="grid" class="row grid-wrapper">
        <div
            v-for="(portfolio, index) in portfolios"
            :key="index"
            :class="['mix', 'col-xs-12', 'col-sm-12', `col-md-${12 / Math.min(4, portfolios.length)}`, `col-lg-${12 / Math.min(4, portfolios.length)}`, 'container-portfolio', 'text-center']"
        >
            <div class="overlay">
                <a :href="portfolio.large" class="glightbox">
                    <img
                        loading="lazy"
                        :src="portfolio.small"
                        class="mobile-img img-fluid center-block mx-auto overlayblue "
                        :alt="portfolio.alt_text"
                        :title="portfolio.title"
                    />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue';
    import GLightbox from 'glightbox';
    export default {
        name: "Lightbox",
        props: ["portfolios", "containerId"],
        setup(props) {
            onMounted(() => {
                //We create the GLightbox and use a variable to store it so that we can modify it later.
                const lightbox = GLightbox({
                    selector: ".glightbox",
                    openEffect: "none",
                    closeEffect: "none",
                    slideEffect: "none",
                    touchNavigation: false,
                    loop: true,
                    onClose: () => {
                        //Here we scroll the lightbox container back into view on mobile.
                        if (window.innerWidth <= 768) {
                            document.getElementById(props.containerId).scrollIntoView({
                                behavior: "instant"
                            });
                        }
                    }
                });
                //This code executes when the lightbox is opened.
                lightbox.on("open", () => {
                    let lightboxBody = document.querySelector('#glightbox-body');
                    //We want to define both click and touchend so that it will close on desktop and mobile.
                    let eventNames = ["click", "touchend"];
                    for (const eventName of eventNames) {
                        lightboxBody.addEventListener(eventName, function(event) {
                            //Here we make sure that we have the right event target.
                            if (event.target.className === "ginner-container") {
                                //First we need to call preventDefault() to prevent new modals opening from clicks overlapping underneath the container.
                                event.preventDefault();
                                //Call the glightbox close method to actually close the lightbox modal, including removing any newly created events.
                                lightbox.close();
                            }
                        });
                    }
                });
            });
        }
    };
</script>
