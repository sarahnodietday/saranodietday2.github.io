<?php

$to = 'info.ebitinc@gmail.com';

if (isset($_POST['ajax_submit'])) {
    $name = $_POST['name'] ? $_POST['name'] : '';
    $email_id = $_POST['email_id'] ? $_POST['email_id'] : '';
    $phone_number = $_POST['phone_number'] ? $_POST['phone_number'] : '';
    $website_link = $_POST['website_link'] ? $_POST['website_link'] : '';
    $main_message = $_POST['main_message'] ? $_POST['main_message'] : '';
    $subject = 'Contact mail from ' . $name . ' [Nutrition]';
    $message = "Name: $name
Phone: $phone_number
E-Mail: $email_id
Website: $website_link
Message: $main_message";
    $from = 'info@' . $_SERVER['SERVER_NAME'];
    $headers   = array();
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-type: text/plain; charset=iso-8859-1";
    $headers[] = "From: Nutrition <$from>";
    $headers[] = "Reply-To: $email_id";
    $headers[] = "Subject: {$subject}";
    $headers[] = "X-Mailer: PHP/".phpversion();
    
    if (mail($to, $subject, $message, implode("\r\n", $headers))) {
        echo 'Mail Send';
    }else{
        echo 'Mail Not Send';
    }
    
}