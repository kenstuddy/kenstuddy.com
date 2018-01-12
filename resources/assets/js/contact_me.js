$(function() {

	$("input,textarea").jqBootstrapValidation(
		{
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// something to have when submit produces an error ?
			},
			submitSuccess: function($form, event) {
				event.preventDefault(); // prevent default submit behaviour
				// get values from FORM
				var name = $("input#name").val();
				var email = $("input#email").val();
				var message = $("textarea#message").val();
				var firstName = name; // For Success/Failure Message
				// Check for white space in name for Success/Fail message
				if (firstName.indexOf(" ") >= 0) {
					firstName = name.split(" ").slice(0, -1).join(" ");
				}
				$.ajax({
					url: "mail/contact_me.php",
					type: "POST",
					data: {name: name, email: email, message: message},
					cache: false,
					success: function() {
						// Success message
						$("#success").html("<div class='alert alert-success'>");
						$("#success > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
						.append( "</button>");
						$("#success > .alert-success")
						.append("<strong>Your message has been sent. </strong>");
						$("#success > .alert-success")
						.append("</div>");
						//$("#success").html("<div class='alert alert-danger'>");
						//$("#success > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
						//.append( "</button>");
						//$("#success > .alert-danger").append("<strong>Sorry "+firstName+", it seems that my mail server is not responding...</strong> Please feel free to email me directly at <a href='mailto:kenstuddy@gmail.com?Subject=Message_Me from kenstuddy.com'>kenstuddy@gmail.com</a> ? Sorry for the inconvenience! Here is a copy of the message you tried to send: <br/>");
						//$("#success > .alert-danger").append("<pre>"+message+"</pre>");
						//$("#success > .alert-danger").append("</div>");
						//clear all fields
						$("#contactForm").trigger("reset");
					},
					error: function() {
						// Fail message
						$("#success").html("<div class='alert alert-danger'>");
						$("#success > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
						.append( "</button>");
						$("#success > .alert-danger").append("<strong>Sorry "+firstName+", it seems that my mail server is not responding...</strong> Please feel free to email me directly at <a href='mailto:kenstuddy@gmail.com?Subject=Message_Me from kenstuddy.com'>kenstuddy@gmail.com</a> ? Sorry for the inconvenience! Here is a copy of the message you tried to send: <br/>");
						$("#success > .alert-danger").append("<pre>"+message+"</pre>");
						$("#success > .alert-danger").append("</div>");
						//clear all fields
						$("#contactForm").trigger("reset");
					},
				});
			},
			filter: function() {
				return $(this).is(":visible");
			},
		});

	$("a[data-toggle=\"tab\"]").click(function(e) {
		e.preventDefault();
		$(this).tab("show");
	});
});


/*When clicking on Full hide fail/success boxes */
$("#name").focus(function() {
	$("#success").html("");
});
