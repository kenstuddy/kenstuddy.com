<template>
    <div class="container" v-cloak>
        <header class="section-header">
            <h2 class="section-title"><span>Contact</span></h2>
            <div class="spacer"></div>
            <p class="section-subtitle">Feel free to contact me any time of day and I'll get back to you as soon as I can.</p>
        </header>
        <div class="row">
            <div class="col-sm-5 contact-info">
                <h3>Contact Info</h3>
                <p><i class="fa fa-envelope-o"></i>kenstuddy@gmail.com</p>
            </div>
            <div class="col-sm-7">
                <h3>Get in Touch</h3>
                <form class="form-horizontal" @submit.prevent="submitContact()" id="contact_form" v-show="form">
                    <div class="control-group">
                        <label for="name" class="control-label">Name</label>
                        <input type="text" class="form-control" v-model="name" name="name" placeholder="Your Name" id="name" v-validate="'required'" :disabled="submitted">
                        <p class="help-block text-danger" v-show="errors.has('name')"><ul role="alert"><li>{{ errors.first('name') }}</li></ul></p>
                    </div>
                    <div class="control-group">
                        <label for="email" class="control-label">Email</label>
                        <input type="email" class="form-control" id="email" v-model="email" placeholder="Your email address" name="email" v-validate="'required|email'" :disabled="submitted">
                        <p class="help-block text-danger" v-show="errors.has('email')"><ul role="alert"><li>{{ errors.first('email') }}</li></ul></p>
                    </div>
                    <div class="control-group">
                        <label for="message" class="control-label">Message</label>
                        <textarea class="form-control" id="message" rows="6" v-model="message" name="message" placeholder="" v-validate="'required'" :disabled="submitted"></textarea>
                        <p class="help-block text-danger" v-show="errors.has('message')"><ul role="alert"><li>{{ errors.first('message') }}</li></ul></p>
                    </div>
                    <div v-if="success" name="alert" id="alert" class="control-group alert alert-success">
                        <button type="button" class="close" @click="resetContact">×</button>
                        <span>{{ success }}</span>
                    </div>
                    <div class="control-group">
                        <button type="submit" class="btn btn-contact btn-block btn-lg" :disabled="submitted">{{ submitText }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "contact",
        data() {
            return {
                submitted: false, //This should be true if the form has been submitted (submit has been clicked). Setting this to true disables the form input, textarea, and button elements.
                email: "", //Email of person contacting me.
                name: "", //Name of person contacting me.
                success: "", //This is the success response message from the API.
                message: "", //Form message.
                form: true, //The form is visible when this is true because of v-show in the form tag.
                submitText: "Submit Message", //This is the text of the submit button.
                resetContactTime: 4000 //This is the time in ms for resetting the contact form after sending a message.
            };
        },
        methods: {
            submitContact() {
                this.submitText = "Submitting Message...";
                this.submitted = true;
                //The then method returns a Promise that is handled by an arrow function.
                this.$validator.validateAll().then((response) => {
                    let data = {
                        "name": this.name,
                        "email": this.email,
                        "message": this.message
                    };
                    //Send the HTTP POST API request to be handled by the Laravel ContactController send method. This also returns a Promise since it once again uses the then method.
                    axios.post("/api/contact/send", data)
                        .then((response) => {
                            this.submitted = true;
                            this.submitText = "Submitted Message.";
                            this.success = response.data.message;
                            //Reset the form using the asynchronous setTimeout method, if we use parenthesis for the resetContact method it will immediately invoke the method instead of waiting the duration of resetContactTime, which is not what we want.
                            setTimeout(this.resetContact, this.resetContactTime);
                        }).catch((error) => {
                            this.errors = error.response.data.errors;
                            this.submitText = "Submit Message";
                            this.submitted = false;
                        });
                });
            },
            resetContact() {
                //We only want to reset the contact form if it has been submitted (in other words, not reset), otherwise we might reset it twice by accident (for example, automatically 4 seconds later after form submission when someone already submit and reset the form once and now might be entering another message).
                if (this.submitted) {               
                    this.name = "";
                    this.email = "";
                    this.message = "";
                    //On the next tick, reset the validator so that no error messages occur from resetting the form. This still allows error messages to occur the following tick (when there are actually errors like invalid email).
                    this.$nextTick(() => { 
                        this.$validator.reset();
                    });
                    this.submitted = false;
                    this.success = false;
                    this.form = true;
                    this.submitText = "Submit Message";
                }
            }
        }
    };
</script>
