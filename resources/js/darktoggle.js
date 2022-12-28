toggleDarkMode = () => {
    if ((document.getElementById('darkmode').value = !document.getElementById('darkmode').value) === true) {
        enableDarkMode();
        localStorage.setItem("darkmode", "true");
        document.cookie = "darkmode=true;max-age=31540000;path=/";
    } else {
        disableDarkMode();
        localStorage.setItem("darkmode", "false");
        document.cookie = "darkmode=false;max-age=31540000;path=/";
    }
}

loadDarkMode = () => {
    console.log("loading dark mode.");
    if (localStorage.getItem("darkmode") === "true") {
        document.getElementById('darkmode').value = true;
        enableDarkMode();
    } else {
        document.getElementById('darkmode').value = false;
        disableDarkMode();
    }
}

enableDarkMode = () => {
    document.querySelectorAll(".text-slider-light").forEach((it) => {
        it.classList.remove('text-slider-light');
        it.classList.add('text-slider-dark');
    });
    document.querySelectorAll(".text-gray").forEach((it) => {
        it.classList.remove('text-gray');
        it.classList.add('text-gray-light');
    });
    document.querySelectorAll(".text-dark-title").forEach((it) => {
        it.classList.remove('text-dark-title');
        it.classList.add('text-dark-title-light');
    });
    document.querySelectorAll(".bg-nav-lighter").forEach((it) => {
        it.classList.remove('bg-nav-lighter');
        it.classList.add('bg-nav-darker');
    });
    document.querySelectorAll(".text-gray-dark-link").forEach((it) => {
        it.classList.remove('text-gray-dark-link');
        it.classList.add('text-gray-link');
    });
    document.querySelectorAll(".bg-white").forEach((it) => {
        it.classList.remove('bg-white');
        it.classList.add('bg-darker');
    });
    document.querySelectorAll(".bg-gray").forEach((it) => {
        it.classList.remove('bg-gray');
        it.classList.add('bg-gray-dark');
    });
    document.querySelectorAll(".bg-nav-light").forEach((it) => {
        it.classList.remove('bg-nav-light');
        it.classList.add('bg-nav-dark');
    });
    document.querySelectorAll(".btn-light").forEach((it) => {
        it.classList.remove('btn-light');
        it.classList.add('btn-dark');
    });
    document.querySelectorAll(".border-light").forEach((it) => {
        it.classList.remove('border-light');
        it.classList.add('border-dark');
    });
    document.querySelectorAll(".border-btn-light").forEach((it) => {
        it.classList.remove('border-btn-light');
        it.classList.add('border-btn-dark');
    });
    document.querySelectorAll(".text-primary").forEach((it) => {
        it.classList.remove('text-primary');
        it.classList.add('text-light');
    });
    document.querySelectorAll(".text-contact-light").forEach((it) => {
        it.classList.remove('text-contact-light');
        it.classList.add('text-contact-dark');
    });
    document.querySelectorAll(".text-error-light").forEach((it) => {
        it.classList.remove('text-error-light');
        it.classList.add('text-error-dark');
    });
    document.querySelectorAll(".bg-contact-light").forEach((it) => {
        it.classList.remove('bg-contact-light');
        it.classList.add('bg-contact-dark');
    });
    document.querySelectorAll(".text-contact-input-dark").forEach((it) => {
        it.classList.remove('text-contact-input-dark');
        it.classList.add('text-contact-input-light');
    });
    document.querySelectorAll(".article-dark").forEach((it) => {
        it.style.display = "";
    });
    document.querySelectorAll(".article-light").forEach((it) => {
        it.style.display = "none";
    });
}

disableDarkMode = () => {
    document.querySelectorAll(".text-slider-dark").forEach((it) => {
        it.classList.remove('text-slider-dark');
        it.classList.add('text-slider-light');
    });
    document.querySelectorAll(".text-gray-light").forEach((it) => {
        it.classList.remove('text-gray-light');
        it.classList.add('text-gray');
    });
    document.querySelectorAll(".text-dark-title-light").forEach((it) => {
        it.classList.remove('text-dark-title-light');
        it.classList.add('text-dark-title');
    });
    document.querySelectorAll(".bg-nav-darker").forEach((it) => {
        it.classList.remove('bg-nav-darker');
        it.classList.add('bg-nav-lighter');
    });
    document.querySelectorAll(".text-gray-link").forEach((it) => {
        it.classList.remove('text-gray-link');
        it.classList.add('text-gray-dark-link');
    });
    document.querySelectorAll(".bg-darker").forEach((it) => {
        it.classList.remove('bg-darker');
        it.classList.add('bg-white');
    });
    document.querySelectorAll(".bg-gray-dark").forEach((it) => {
        it.classList.remove('bg-gray-dark');
        it.classList.add('bg-gray');
    });
    document.querySelectorAll(".bg-nav-dark").forEach((it) => {
        it.classList.remove('bg-nav-dark');
        it.classList.add('bg-nav-light');
    });
    document.querySelectorAll(".btn-dark").forEach((it) => {
        it.classList.remove('btn-dark');
        it.classList.add('btn-light');
    });
    document.querySelectorAll(".border-dark").forEach((it) => {
        it.classList.remove('border-dark');
        it.classList.add('border-light');
    });
    document.querySelectorAll(".border-btn-dark").forEach((it) => {
        it.classList.remove('border-btn-dark');
        it.classList.add('border-btn-light');
    });
    document.querySelectorAll(".text-light").forEach((it) => {
        it.classList.remove('text-light');
        it.classList.add('text-primary');
    });
    document.querySelectorAll(".text-contact-dark").forEach((it) => {
        it.classList.remove('text-contact-dark');
        it.classList.add('text-contact-light');
    });
    document.querySelectorAll(".text-error-dark").forEach((it) => {
        it.classList.remove('text-error-dark');
        it.classList.add('text-error-light');
    });
    document.querySelectorAll(".bg-contact-dark").forEach((it) => {
        it.classList.remove('bg-contact-dark');
        it.classList.add('bg-contact-light');
    });
    document.querySelectorAll(".text-contact-input-light").forEach((it) => {
        it.classList.remove('text-contact-input-light');
        it.classList.add('text-contact-input-dark');
    });
    document.querySelectorAll(".article-dark").forEach((it) => {
        it.style.display = "none";
    });
    document.querySelectorAll(".article-light").forEach((it) => {
        it.style.display = "";
    });
}
