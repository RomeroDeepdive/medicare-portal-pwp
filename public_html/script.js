$(document).ready(function() {

	$("#contact-form").validate({
		debug: true,
		errorClass: "alert alert-danger",
		errorLabelContainer: "#output-area",
		errorElement: "div",
		//rules here define what is good and bad input
		//each rule starts with the form input elements NAME attribute
		rules: {
			name: {
				required: true
			},
			email: {
				email: true,
				required: true
			},
			phone: {
				required: true,
			},
			message: {
				required: true,
				maxlength: 2000
			}
		},
		//error message to display to the end user when rules above don't pass

		messages: {
			name: {
				required: "Please enter your name"
			},
			email: {
				required: "Email is a requird field",
				email: "Invalid Email"
			},
				phone: {
						required: true
			},
			message: {
				required: "message is required",
				maxlength: "You have exceeded the number of characters allowed"
			}
		},

		submitHandler: function (form) {
			$("#contact").ajaxSubmit({
				type: "POST",
				url: $("#contact").attr("action"),
				success: function (ajaxOutput) {
					$("#output-area").css("display", "")
					$("#output-area").html(ajaxOutput)

					//reset the form if it was successful
					if($(".alert-success").length>=1 ) {
						$("contact")[0].reset();
					}

				}
			})

		}
	});
});