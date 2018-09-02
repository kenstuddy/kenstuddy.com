<section id="page-contact" class="page-contact">
    <div class="container">
        <header class="section-header">
            <h2 class="section-title"><span>Contact</span></h2>
            <div class="spacer"></div>
            <p class="section-subtitle">Feel free to contact me any time of day and I'll get back to you as soon as I can.</p>
        </header>
        <div class="row">
            <div class="col-md-5 contact-info">
                <h3>Contact Info</h3>
                <p><i class="fa fa-envelope-o"></i> kenstuddy@gmail.com</p>
            </div>

            <div class="col-md-7">
                <h3>Get in Touch</h3>
                <form class="form-horizontal" id="contactForm" novalidate>
                    <div class="control-group">
                        <label class="control-label" for="name">Name</label>
                        <div class="controls">
                            <input type="text" name="name" id="name" placeholder="Your name" class="form-control input-lg"  required data-validation-required-message="Please enter your name.">
                              <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="email">Email Address</label>
                        <div class="controls">
                            <input type="email" name="email" id="email" placeholder="Your email address" class="form-control input-lg"  required data-validation-required-message="Please enter your email address.">
                              <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="message">Message</label>
                        <div class="controls">
                            <textarea name="message" id="message" rows="8" class="form-control input-lg" required data-validation-required-message="Please enter a message."></textarea>
                              <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="form-actions">
                    <div id="success"></div>
                        <button type="submit" class="btn btn-secondary btn-lg btn-block">Submit Message</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>