<?php
// Get form data
$patientName = $_POST['patientName'];
$age = $_POST['age'];
$appointmentDate = $_POST['appointmentDate'];

// Format data
$data = "Patient Name: $patientName\nAge: $age\nAppointment Date: $appointmentDate\n\n";

// Append data to file
file_put_contents('out.txt', $data, FILE_APPEND);

// Respond with success message
echo "Data stored successfully!";
?>
