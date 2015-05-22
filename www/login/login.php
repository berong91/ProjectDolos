<?php
    // This php file receive POST request from client and add new score to the score table.
    if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) ){
        if (isset($_POST['Username']) AND isset($_POST['Password'])) {        
            
            $username = $_POST["Username"];
            $password = $_POST["Password"];
            
            if (strcmp($username, "guest") == 0){
                setcookie("Username", $username, 0, "/");
                echo 1;
                exit();
            }
            
            $servername = "localhost";
            $loginName = "tyler637_dolos";
            $loginPass = "Dolos123";
            $db = "tyler637_dolos";
            
            // Create connection
            $conn = new mysqli($servername, $loginName, $loginPass, $db);
            
            // Error check
            if ($conn->connect_error) {
                die('Connect Error (' . $conn->connect_errno . ') '
                . $conn->connect_error);
            }
            
            // Compatibility error check for PHP versions prior to 5.2.9 and 5.3.0
            if (mysqli_connect_error()) {
                die('Connect Error (' . mysqli_connect_errno() . ') '
                . mysqli_connect_error());
            }
            
            $sql = "SELECT * FROM User WHERE Username = '".$username."'";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()){
                    if (strcmp($password, $row["Password"]) == 0){
                        setcookie("Username", $username, 0, "/");
                        echo 1;
                    }          
                    else echo 0;
                }
            } else echo 0;
            
            $conn->close();
        }
    } else 
    echo "This page doesn't support your request";
?>