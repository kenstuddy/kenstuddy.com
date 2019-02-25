<template>
    <div class="slides">
        <div class="slides">
            <div :key="slide.key" class="slide" v-for="slide in slides" v-bind:class="{ fadeOut: slide.fadeOut }"
              v-bind:style="{ 'background-image': 'url(' + slide.image + ')' }">
            </div>
        </div>

        <div class="center-intro">
            <header class="centered">
                <h1 class="my-name">Ken Studdy</h1>
                <p class="my-title">Full Stack Web Developer</p>
            </header>
            <div class="socia-icons">
                <a href="https://www.linkedin.com/in/kenstuddy" target="_blank" class="btn btn-round btn-clear btn-lin"><i class="fa my-fa-linkedin-square"></i></a>
                <a href="https://github.com/kenstuddy" target="_blank" class="btn btn-round btn-clear btn-github"><i class="fa my-fa-github-square"></i></a>
            </div>
            <a href="#page-contact" class="btn btn-contact contact-me">Contact Me</a>
        </div>
        <a class="arrow arrow-prev" @click="previousSlide"></a>
        <a class="arrow arrow-next" @click="nextSlide"></a>
    </div>
</template>

<script>
    export default {
        name: "slider",
        data() {
            return {
                currentIndex: 0, //This is the number of the current slide.
                uniqueKey: 0, //Unique key used to prevent re-rendering.
                slides: [], //This is slides array, it will only ever contain two images
                slideTimeout: null, //The ID of the slide timeout, assigned by the setTimeout method.
                slideSpeed: 3000, //Automatic slide speed in ms.
                slideDuration: 1000, //CSS transition speed in ms.
                largeHeight: 1200, //The maximum height for regular size slider images.
                images: [
                    "/img/slider/01.jpg",
                    "/img/slider/02.jpg",
                    "/img/slider/03.jpg",
                    "/img/slider/04.jpg"
                ] //Array containing all of the slider images.
            };
        },
        mounted() {
            //If the screen height is larger than the large height, use the large size images.
            if (window.screen.height > this.largeHeight) {
                this.images = this.images.map((image) => {
                    return image.replace('.jpg', '-large.jpg');
                });
            }
            //Add the first image to the beginning of the slides array.
            this.slides.unshift({
                image: this.images[0],
                key: this.uniqueKey
            });
            this.startSlideTimeout();
        },
        methods: {
            previousSlide() {
                this.activateSlide(-1);
            },
            nextSlide() {
                this.activateSlide(1);
            },
            activateSlide(offset) {
                //This removes the slide timer since we have loaded a new image.
                clearTimeout(this.slideTimeout);
                //Start a new slide timer since we have removed the last one.
                this.startSlideTimeout();

                let imageIndex = this.currentIndex + offset;

                //If the index of the next image is a negative number, go to the end. If the index of the next image is past the end, go back to the beginning.
                if (imageIndex < 0) {
                    imageIndex = this.images.length - 1;
                } else if (imageIndex == this.images.length) {
                    imageIndex = 0;
                }

                //Here we call the addSlide method to add the next image (based on the imageIndex) to the slides array.
                this.addSlide(this.images[imageIndex]);
                this.currentIndex = imageIndex;
            },
            addSlide(image) {
                this.uniqueKey++;
                //Add the next image to the beginning of the slides array.
                this.slides.unshift({
                    image: image,
                    key: this.uniqueKey
                });
                this.slides[1].fadeOut = true;
                //Remove the last image from the slides array after the transition duration (using the asynchronous setTimeout method) since we have added the next image.
                setTimeout(() => {
                    this.slides.pop();
                }, this.slideDuration);
            },
            startSlideTimeout() {
                //Assign the ID of the timer that is set by the asynchronous setTimeout method (which starts the slider by going to the next slide after the slide timer duration). We need this ID for the clearTimeout method so it knows which timer to remove.
                this.slideTimeout = setTimeout(() => {
                    this.nextSlide();
                }, this.slideSpeed);
            }
        }
    };
</script>
