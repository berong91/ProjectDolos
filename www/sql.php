<?php
    // This php file receive POST request from client and add new score to the score table.
    if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ){
        if (isset($_POST['Name']) AND isset($_POST['Score'])) {
            $name = $_POST["Name"];
            $score = $_POST["Score"];
            
            $servername = "localhost";
            $username = "tyler637_dolos";
            $password = "Dolos123";
            
            // Create connection
            $conn = new mysqli($servername, $username, $password);
            
            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            
            $sql = "USE tyler637_dolos";
            $conn->query($sql);
            
            $sql = "INSERT INTO Score VALUES ('".$name."', ".$score.")";
            $result = $conn->query($sql);
            
            $conn->close();
        }
    } else 
        echo "Website doesn't support get request";
?>