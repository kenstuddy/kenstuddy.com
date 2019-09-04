/*
 * This adds smooth scrolling for all the links on the page.
 * Any links that require smooth scrolling need to have a class of "smooth-scroll".
 */
//Select all of the HTML elements with the class "smooth-scroll".
links = document.querySelectorAll('.smooth-scroll');
//Convert the NodeList to an Array so that older web browsers can loop through it.
linkItems = [].slice.call(links);
//Loop through the Array of HTML elements.
links.forEach((item, idx) => {
    item.addEventListener('click', event => {
        //Prevent the default action of the click event, this means the link does not use regular navigation.
        event.preventDefault();
        //Scroll the HTML element into the view of the browser using smooth scrolling.
        document.getElementById(item.href.substring(item.href.indexOf('#') + 1, item.href.length)).scrollIntoView({behavior: "smooth"});
    });
});
