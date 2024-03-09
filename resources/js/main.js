/*
 * This file contains miscellaneous JavaScript features of this website, such as navbar smooth scrolling and optional reCAPTCHA handling.
*/
//If we want to have mobile clicks toggle the mobile navbar, set this to true.
const mobileLinkClickTogglesNavbar = true;
/*
 * This adds smooth scrolling for all the links on the page.
 * Any links that require smooth scrolling need to have a class of "smooth-scroll".
 */
//Select all of the HTML elements with the class "smooth-scroll".
links = document.querySelectorAll('.smooth-scroll');
//Convert the NodeList to an Array so that older web browsers can loop through it.
linkItems = [].slice.call(links);
//Loop through the Array of HTML elements if we're on the home page.
if (window.location.pathname == '/') {
    links.forEach((item, idx) => {
        item.addEventListener('click', event => {
            //Prevent the default action of the click event, this means the link does not use regular navigation.
            event.preventDefault();
            //Scroll the HTML element into the view of the browser using smooth scrolling.
            document.getElementById(item.href.substring(item.href.indexOf('#') + 1, item.href.length)).scrollIntoView({behavior: "smooth"});
            //If we're on mobile view, collapse the navbar when clicking on a link.
            if (window.innerWidth <= 768 && mobileLinkClickTogglesNavbar) {
                const navbarToggleLabel = document.getElementById('navbar-toggle-label');
                if (navbarToggleLabel) {
                    navbarToggleLabel.click();
                }
            }
        });
    });
}

/*
 * Since we are using invisible reCAPTCHA, we must execute recaptcha manually.
 * If we wanted to use regular reCAPTCHA, we could remove the MutationObserver.
 * We probably only want to check one field first before checking for reCAPTCHA,
 * since if we check all fields it's possible the submit button could be clicked 
 * very quickly before a reCAPTCHA response resulting in a failed submission.
 */
const contactFormRecaptchaObserver = new MutationObserver(() => {
    if (window.grecaptcha && window.grecaptcha.execute && isFieldNotEmpty("name")) {
        window.grecaptcha.execute();
    }
});
contactFormRecaptchaObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
});

function isFieldNotEmpty(field) {
    return document.getElementById(field) && document.getElementById(field).value !== "";
}
