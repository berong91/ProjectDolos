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
    
    $sql = "SELECT * FROM Score";
    $result = $conn->query($sql);
    $arr;
    $i = 0;

    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            echo "Name: " . $row["Name"]. " - Score: " . $row["Score"]. "<br>";
            $arr[$i][0] = $row["Name"];
            $arr[$i][1] = $row["Score"];
            $i++;
        }
    } else {
            echo "0 results";
    }
    echo "End of php"."<br><br>";
    $conn->close();
?>
<html>
<head>
    <script type="text/javascript">
        // pass PHP variable declared above to JavaScript variable
        var i = 0;
        var ar = <?php echo json_encode($arr) ?>;
        for (i = 0; i < ar.length; i++)
            document.write("Name: " + ar[i][0] + " - Score: " + ar[i][1] + "<br>");
        document.write("<?php echo 'End of JavaScript'; ?>");
    </script>
</head>
</html>