<?php
    $servername = "localhost";
    $username = "tyler637_dolos";
    $password = "Dolos123";
    $my_db = "tyler637_dolos";
    
    try {
        // Create connection
        $conn = new mysqli($servername, $username, $password, $my_db);
        
        // Check connection
        if ($conn->connect_error) {
            die('Connect Error (' . $conn->connect_errno . ') '
            . $conn->connect_error);
        }
        
        $sql = "SELECT * 
        FROM Score
        ORDER BY Score DESC 
        LIMIT 10";        
        
        if ($result = $conn->query($sql)) {
            while($r = $result->fetch_array(MYSQLI_NUM)) {
                $arr[] = $r;
            }
        }
        
        $conn->close();
        
        } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";    
    }
    
    echo json_encode($arr);
?>
