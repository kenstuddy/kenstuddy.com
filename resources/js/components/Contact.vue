<template>
    <div class="container container-custom" v-cloak>
        <header class="section-header">
            <h2 class="section-title" :class="contact_text_class"><span>Contact</span></h2>
            <div class="spacer"></div>
            <p class="section-subtitle" :class="contact_text_class">{{ contact_subtitle }}</p>
        </header>
        <div class="row">
            <div class="col-sm-5 contact-info">
                <h3 :class="contact_text_class">Contact Info</h3>
                <p :class="contact_text_class"><i v-if="contact_email.length > 0" class="fa fa-envelope-o"></i>{{ contact_email }}</p>
                <p :class="contact_text_class"><i v-if="contact_phone.length > 0" class="fa fa-phone"></i>{{ contact_phone }}</p>
            </div>
            <div class="col-sm-7">
                <h3 :class="contact_text_class">{{ contact_sentence }}</h3>
                <Form class="form-horizontal" @submit="submitContact" id="contact_form" v-show="form" ref="contactForm">
                    <div class="control-group">
                        <label for="name" class="control-label" :class="contact_text_class">Name</label>
                        <Field type="text" class="form-control"
                               :class="[contact_form_background_class, contact_input_class]" v-model="name" name="name"
                               placeholder="Your name" id="name" :rules="nameRules" :disabled="submitted" />
                        <ErrorMessage name="name" as="p" class="help-block text-danger">
                            <template v-slot="{ message }">
                                <ul role="alert">
                                    <li :class="contact_error_class">{{ message }}</li>
                                </ul>
                            </template>
                        </ErrorMessage>
                    </div>
                    <div class="control-group">
                        <label for="email" class="control-label" :class="contact_text_class">Email</label>
                        <Field type="email" class="form-control"
                               :class="[contact_form_background_class, contact_input_class]" id="email" v-model="email"
                               placeholder="Your email address" name="email" :rules="emailRules" :disabled="submitted" />
                        <ErrorMessage name="email" as="p" class="help-block text-danger">
                            <template v-slot="{ message }">
                                <ul role="alert">
                                    <li :class="contact_error_class">{{ message }}</li>
                                </ul>
                            </template>
                        </ErrorMessage>

                    </div>
                    <div class="control-group">
                        <label for="message" class="control-label" :class="contact_text_class">Message</label>
                        <Field as="textarea" class="form-control"
                               :class="[contact_form_background_class, contact_input_class]" id="message" rows="6"
                               v-model="message" name="message" placeholder="Your message" :rules="messageRules"
                               :disabled="submitted" />
                        <ErrorMessage name="message" as="p" class="help-block text-danger">
                            <template v-slot="{ message }">
                                <ul role="alert">
                                    <li :class="contact_error_class">{{ message }}</li>
                                </ul>
                            </template>
                        </ErrorMessage>
                    </div>
                    <div v-if="successful" name="alert" id="alert" class="control-group alert alert-success">
                        <button type="button" class="btn-close float-end" @click="resetContact">&nbsp;</button>
                        <span>{{ successful }}</span>
                    </div>
                    <div v-if="unsuccessful" name="alert" id="alert" class="control-group alert alert-danger">
                        <button type="button" class="btn-close float-end" @click="resetContact">&nbsp;</button>
                        <span>{{ unsuccessful }}</span>
                    </div>
                    <div v-if="use_recaptcha" data-size="invisible" id="g-recaptcha" class="g-recaptcha"
                         :data-sitekey="datasite_key">
                    </div>
                    <div class="control-group">
                        <button type="submit" class="btn btn-contact btn-block btn-lg"
                                :class="[contact_btn_class, contact_btn_border_class]" :disabled="submitted">
                            {{ submitText }}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { defineRule, configure, Form, Field, ErrorMessage, useForm } from 'vee-validate';
    import { required as requiredRule, email as emailRule } from '@vee-validate/rules';
    const { errors, resetForm, submitForm, validate } = useForm();
    //Here we define the validation rules and assign them an id and a validator. Rather than relying on vee-validate provided rules, we could instead provide a custom validator here if we wanted to.
    defineRule("required", requiredRule);
    defineRule("email", emailRule);
    //Here we assign the validation rules so that they can be used for each field.
    const nameRules = { required: true };
    const emailRules = { required: true, email: true };
    const messageRules = { required: true };
    //This is where we set the configuration for vee-validate, by using the ValidationMessageGenerator called generateMessage to create our custom validation messages.
    configure({
        generateMessage: (context) => {
            const messages = {
                required: `Please enter your ${context.field}.`,
                email: `Please enter a valid email address.`
            };
            const message = messages[context.rule.name]
                ? messages[context.rule.name]
                : `The field ${context.field} is invalid`;
            return message;
        }
    });
</script>

<script>
    export default {
        name: "contact",
        props: [
            "contact_subtitle",
            "contact_email",
            "contact_phone",
            "contact_sentence",
            "use_recaptcha",
            "datasite_key",
            "contact_text_class",
            "contact_error_class",
            "contact_btn_class",
            "contact_btn_border_class",
            "contact_border_class",
            "contact_form_background_class",
            "contact_input_class"
        ],
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
                let data = {
                    "name": this.name,
                    "email": this.email,
                    "message": this.message,
                    "g-recaptcha-response": this.use_recaptcha ? document.getElementById("g-recaptcha-response").value : ""
                };
                //Send the HTTP POST API request to be handled by the Laravel ContactController send method. This returns a Promise since it uses the then method.
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
            },
            resetContact() {
                //We only want to reset the contact form if it has been submitted (in other words, if it was not already reset) or if there was an error, otherwise we might reset it twice by accident (for example, automatically 4 seconds later after form submission when someone already submit and reset the form once and now might be entering another message).
                if (this.submitted || this.unsuccessful) {
                    //Only reset the name, email, and message if it was successfully sent.
                    if (this.successful) {
                        this.name = "";
                        this.email = "";
                        this.message = "";
                    }
                    this.successful = "";
                    this.unsuccessful = "";
                    //Here we pass the default values to resetForm so that we do not execute validation right after submitting the form.
                    this.$refs.contactForm.resetForm({ values: { name: "", email: "", message: "" } });
                    this.submitted = false;
                    this.submitText = "Submit Message";
                }
            }
        }
    };
</script>
