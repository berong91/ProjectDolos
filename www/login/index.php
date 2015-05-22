<?php
    if(isset($_COOKIE["Username"])){ 
        header("Location: ../game.html");
        exit();
    } else {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        header("Location: login.html");
        exit();
    }
?>