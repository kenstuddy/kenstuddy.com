<template>
    <div class="container" v-cloak>
        <header class="section-header">
            <h2 class="section-title" :class="contact_text_class"><span>Contact</span></h2>
            <div class="spacer"></div>
            <p class="section-subtitle" :class="contact_title_class">{{ contact_subtitle }}</p>
        </header>
        <div class="row">
            <div class="col-sm-5 contact-info">
                <h3 :class="contact_text_class">Contact Info</h3>
                <p :class="contact_text_class"><i v-if="contact_email.length > 0" class="fa fa-envelope-o"></i>{{ contact_email }}</p>
                <p :class="contact_text_class"><i v-if="contact_phone.length > 0" class="fa fa-phone"></i>{{ contact_phone }}</p>
            </div>
            <div class="col-sm-7">
                <h3 :class="contact_text_class">{{ contact_sentence }}</h3>
                <form class="form-horizontal" @submit.prevent="submitContact()" id="contact_form" v-show="form">
                    <div class="control-group">
                        <label for="name" class="control-label" :class="contact_text_class">Name</label>
                        <input type="text" class="form-control" :class="[contact_form_background_class, contact_input_class]" v-model="name" name="name" placeholder="Your name" id="name" v-validate="'required'" :disabled="submitted">
                        <p class="help-block text-danger" v-show="errors.has('name')"><ul role="alert"><li :class="contact_error_class">{{ errors.first('name') }}</li></ul></p>
                    </div>
                    <div class="control-group">
                        <label for="email" class="control-label" :class="contact_text_class">Email</label>
                        <input type="email" class="form-control" :class="[contact_form_background_class, contact_input_class]" id="email" v-model="email" placeholder="Your email address" name="email" v-validate="'required|email'" :disabled="submitted">
                        <p class="help-block text-danger" v-show="errors.has('email')"><ul role="alert"><li :class="contact_error_class">{{ errors.first('email') }}</li></ul></p>
                    </div>
                    <div class="control-group">
                        <label for="message" class="control-label" :class="contact_text_class">Message</label>
                        <textarea class="form-control" :class="[contact_form_background_class, contact_input_class]" id="message" rows="6" v-model="message" name="message" placeholder="Your message" v-validate="'required'" :disabled="submitted"></textarea>
                        <p class="help-block text-danger" v-show="errors.has('message')"><ul role="alert"><li :class="contact_error_class">{{ errors.first('message') }}</li></ul></p>
                    </div>
                    <div v-if="successful" name="alert" id="alert" class="control-group alert alert-success">
                        <button type="button" class="close" @click="resetContact">×</button>
                        <span>{{ successful }}</span>
                    </div>
                    <div v-if="unsuccessful" name="alert" id="alert" class="control-group alert alert-danger">
                         <button type="button" class="close" @click="resetContact">×</button>
                        <span>{{ unsuccessful }}</span>
                    </div>
                  <div v-if="use_recaptcha" data-size="invisible" id="g-recaptcha" class="g-recaptcha"
                      :data-sitekey="datasite_key">
                  </div>
                    <div class="control-group">
                        <button type="submit" class="btn btn-contact btn-block btn-lg" :class="[contact_btn_class, contact_btn_border_class]" :disabled="submitted">{{ submitText }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'contact',
        props: [
            'contact_subtitle',
            'contact_email',
            'contact_phone',
            'contact_sentence',
            'use_recaptcha',
            'datasite_key',
            'contact_title_class',
            'contact_text_class',
            'contact_error_class',
            'contact_btn_class',
            'contact_btn_border_class',
            'contact_border_class',
            'contact_form_background_class',
            'contact_input_class'
        ],
        mounted() {
            //This is where the custom error messages for the Contact component are defined.
            const messages = {
              custom: {
                email: {
                  required: 'Please enter your email address.',
                  email: 'Please enter a valid email address.'
                },
                name: {
                  required: 'Please enter your name.'
                },
                message: {
                  required: 'Please enter your message.'
                }
              }
            };
            //This is where the custom error messages are loaded when the Contact component is mounted.
            this.$validator.localize('en', messages);
        },
        data() {
            return {
                submitted: false, //This should be true if the form has been submitted (submit has been clicked). Setting this to true disables the form input, textarea, and button elements.
                email: "", //Email of person contacting me.
                name: "", //Name of person contacting me.
                message: "", //This is the message of the person contacting me.
                successful: "", //This is the successful response message from the API.
                unsuccessful: "", //This is the unsuccessful response message from the API.
                form: true, //The form is visible when this is true because of v-show in the form tag.
                submitText: "Submit Message", //This is the text of the submit button.
                resetContactTime: 4000 //This is the time in ms to wait before resetting the contact form after sending a message.
            };
        },
        methods: {
            submitContact() {
                this.submitText = "Submitting Message...";
                this.submitted = true;
                //The then method returns a Promise that is handled by an arrow function.
                this.$validator.validateAll().then((valid) => {
                    if (valid) {
                        let data = {
                            "name": this.name,
                            "email": this.email,
                            "message": this.message,
                            "g-recaptcha-response": this.use_recaptcha ? document.getElementById("g-recaptcha-response").value : ""
                        };
                        //Send the HTTP POST API request to be handled by the Laravel ContactController send method. This also returns a Promise since it once again uses the then method.
                        axios.post("/api/contact/send", data)
                            .then((response) => {
                                this.submitText = "Submitted Message.";
                                this.submitted = true;
                                this.successful = response.data.message;
                                //Reset the form using the asynchronous setTimeout method, if we use parenthesis for the resetContact method it will immediately invoke the method instead of waiting the duration of resetContactTime, which is not what we want.
                                setTimeout(this.resetContact, this.resetContactTime);
                            }).catch((error) => {
                                this.unsuccessful = "An error has occurred: " + error.message;
                                this.submitText = "Submit Message";
                                this.submitted = false;
                            });
                    } else {
                        this.submitText = "Submit Message";
                        this.submitted = false;
                    }

                });
            },
            resetContact() {
                //We only want to reset the contact form if it has been submitted (in other words, if it was not already reset) or if there was an error, otherwise we might reset it twice by accident (for example, automatically 5 seconds later after form submission when someone already submit and reset the form once and now might be entering another message).
                if (this.submitted || this.unsuccessful) {
                    //Only reset the name, email, and message if it the message was successfully sent.
                    if (this.successful) {
                        this.name = "";
                        this.email = "";
                        this.message = "";
                    }
                    this.successful = "";
                    this.unsuccessful = "";
                    //On the next tick, reset the validator so that no error messages occur from resetting the form. This still allows error messages to occur the following tick (when there are actually errors like invalid email).
                    this.$nextTick(() => {
                        this.$validator.reset();
                    });
                    this.submitted = false;
                    this.submitText = "Submit Message";
                }
            }
        }
    };
</script>
