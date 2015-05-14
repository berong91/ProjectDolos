<?php
    $servername = "localhost";
    $username = "tyler637_dolos";
    $password = "Dolos123";

    // Create connection
    $conn = new mysqli($servername, $username, $password);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        echo "Server could not be connected to...";
    }
    echo "Connected successfully"."<br/>";

    $sql = "USE tyler637_dolos";
    $result = $conn->query($sql);
    
    $sql = "SELECT * FROM Game";
    $result = $conn->query($sql);
    $arr;
    $i = 0;

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "Name: " . $row["Name"]. "- Level: " . $row["Level"]. " - Score: " . $row["Score"]. "<br>";
            $arr[$i][0] = $row["Name"];
            $arr[$i][1] = $row["Level"];
            $arr[$i][2] = $row["Score"];
            $i++;
        }
    } else {
            echo "0 results";
    }
    $conn->close();
    echo json_encode($arr);
?>