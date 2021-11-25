<nav class="navbar navbar-light navbar-expand-md fixed-top {{ theme("bg-nav-darker", "bg-nav-lighter" )}}">
    <div class="container container-custom">
        <span class="icon-bar"></span>
        <input type="checkbox" class="navbar-toggler collapsed" id="navbar-toggle-cbox">
        <div class="navbar-header">
            <label id="navbar-toggle-label" for="navbar-toggle-cbox" class="navbar-toggler collapsed  {{ theme("bg-nav-dark", "bg-nav-light" )}}" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false" aria-controls="navbar">
                &#x2630;
            </label>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav flex-row ml-md-auto d-md-flex">
                <li class="nav-item"><a href="/#page-welcome" class="nav-link smooth-scroll {{ theme("text-gray-link", "text-gray-dark-link") }}">Home</a></li>
                <li class="nav-item"><a href="/#page-profile" class="nav-link smooth-scroll {{ theme("text-gray-link", "text-gray-dark-link") }}">Profile</a></li>
                <li class="nav-item"><a href="/#page-education" class="nav-link smooth-scroll {{ theme("text-gray-link", "text-gray-dark-link") }}">Education</a></li>
                <li class="nav-item"><a href="/#page-experience" class="nav-link smooth-scroll {{ theme("text-gray-link", "text-gray-dark-link") }}">Experience</a></li>
                <li class="nav-item"><a href="/#page-portfolio" class="nav-link smooth-scroll {{ theme("text-gray-link", "text-gray-dark-link") }}">Portfolio</a></li>
                <li class="nav-item"><a href="#page-contact" class="nav-link smooth-scroll {{ theme("text-gray-link", "text-gray-dark-link") }}">Contact</a></li>
                @if(config("app.articles_enabled") === true)
                    <li class="nav-item"><a href="/articles" class="nav-link {{ theme("text-gray-link", "text-gray-dark-link") }}">Articles</a></li>
                @endif
                <li class="nav-item"><a href="#" onClick="toggleDarkMode()" class="nav-link {{ theme("text-gray-link", "text-gray-dark-link") }}">Dark Mode</a></li>
            </ul>
        </div>
      </div>
</nav>
