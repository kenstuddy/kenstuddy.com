<?php
/*
 * This function is used for dark mode functionality,
 * it returns the first (dark) class string
 * or second (light class string).
 */
function theme($class, $secondClass) {
    if (isset($_SESSION['darkmode']) && $_SESSION['darkmode'] == true) {
        return $class;
    }
    return $secondClass;
}

