<?php
    // This php file receive POST request from client and add new score to the score table.
    if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ){
        if (isset($_POST['Name']) AND isset($_POST['description']) AND isset($_POST["achieve"])) {
            $achieve = $_POST["achieve"];
            $description = $_POST["description"];
            $user = $_POST["Name"];
            
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
            
            $sql = "INSERT INTO Achievement VALUES ('NULL', ".$achieve.", ".$description", ".$user.", 'CURRENT_TIMESTAMP')";
            $result = $conn->query($sql);
            
            $conn->close();
        }
    } else 
        echo "Website doesn't support get request";
?>