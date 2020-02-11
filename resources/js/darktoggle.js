toggleDarkMode = () => {
    if (document.getElementById('darkmode').value = !document.getElementById('darkmode').value) {
        enableDarkMode();
        localStorage.setItem("darkmode", "true");
    } else {
        disableDarkMode();
        localStorage.setItem("darkmode", "false");
    }
}

loadDarkMode = () => {
    if (localStorage.getItem("darkmode") == "true") {
        document.getElementById('darkmode').value = true;
        enableDarkMode();
    } else {
        document.getElementById('darkmode').value = false;
        disableDarkMode();
    }
}

enableDarkMode = () => {
    DarkReader.enable({
        brightness: 100,
        contrast: 90,
        sepia: 10
    });
}

disableDarkMode = () => {
    DarkReader.disable();
}