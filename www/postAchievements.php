<?php
    // This php file receive POST request from client and add new score to the score table.
    if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ){
        if (isset($_POST['Name']) AND isset($_POST["description"]) AND isset($_POST["achieve"])) {
            $user = $_POST["Name"];
            $achieve = $_POST["achieve"];
            $description = $_POST["description"];

            $servername = "localhost";
            $loginName = "tyler637_dolos";
            $loginPass = "Dolos123";
            $db = "tyler637_dolos";
            
            // Create connection
            $conn = new mysqli($servername, $loginName, $loginPass, $db);

            // Check connection
            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }
            
            //$sql = "INSERT INTO MyGuests (firstname, lastname, email) VALUES ('John', 'Doe', 'john@example.com')";
            $sql = "INSERT INTO Achievement VALUES (NULL,'".$achieve."', '".$description."', '".$user."', CURRENT_TIMESTAMP)";
            $result = $conn->query($sql);
            
            $conn->close();
        }
    } else 
        echo "Website doesn't support get request";
?>