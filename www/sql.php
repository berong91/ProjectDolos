<?php
    if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ){
        if (isset($_POST['Name']) AND isset($_POST['Score']) AND isset($_POST['Level'])) {
            $name = $_POST["Name"];
            $score = $_POST["Score"];
            $level = $_POST["Level"];
            
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
            
            $sql = "INSERT INTO Score VALUES ('".$name."', ".$level.", ".$score.",)";
            $result = $conn->query($sql);
            
            if ($result == 1)
            return 1;
            
            $conn->close();
            return 0;
        }
    } else 
        echo "Website doesn't support get request";
?>