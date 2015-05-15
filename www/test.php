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
        
        $sql = "SELECT * FROM Game";        
        
        if ($result = $conn->query($sql)) {
            while($r = $result->fetch_array(MYSQLI_ASSOC)) {
                $arr[] = $r;
            }
        }
        
        $conn->close();
        
        } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";    
    }
    
    echo json_encode($arr)."<br/>";
?>


<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script type="text/javascript">
            // pass PHP variable declared above to JavaScript variable
            var obj = <?php echo json_encode($arr) ?>;
            var ar = $.map(obj, function(el) { return el; });
            var arr = [];
            
            console.log(ar);
            
            for (i = 0; i < ar.length; i++){
                arr[i] = $.map(ar[i], function(el) { return el; });
            }
            
            console.log(arr);
        </script>
    </head>
</html>