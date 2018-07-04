<?php
	
	
/* Candidate Newsletter Form */



// Email To
$email_to = "support@companyname.com";


// Default Subject
$email_subject = 'Candidate Template Newsletter Form';
	
	
// Success Message
$success_message = "Thanks for subscribing to our newsletter!";






/* Error Handling */

$error = false;
$error_message = '';



	
/* Email */
if(isset($_POST['newsletter-email']) && !empty($_POST['newsletter-email'])){
	
	$email = $_POST['newsletter-email'];
	
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		
		$error = true;
		$error_message .= 'Email is not valid!<br>';
		
	}
	
}else{

	$error = true;
	$error_message .= 'Please fill in the email address field!';
	
}





/* Zip */
if(isset($_POST['newsletter-zip']) && !empty($_POST['newsletter-zip'])){
	
	$zipcode = $_POST['newsletter-zip'];
	
}else{
	
	if($error){
		$error_message = 'Please fill in all the fields!<br>';
	}else{
		$error = true;
		$error_message .= 'Please fill in the Zip code field!';
	}	
	
}







/* Error Handle */
if($error == true){
	
	echo '<p class="error">'.$error_message.'</p>';

}else{
	
	
	/* Headers */
	$headers = 	'From: '. $email . "\r\n" .
				'Reply-To: '. $email . "\r\n" .
				'X-Mailer: PHP/' . phpversion();
	
	
	
	/* Message */
	$email_message = 	"Email: " . $email . "\r\n" .
						"ZIP Code: " . $zipcode . "\r\n";
	
	
	
	/* Send Email */
	mail($email_to, $email_subject, $email_message, $headers);
	
	
	
	/* Success Message */
	echo '<p class="success">'.$success_message.'</p>';


}





?>