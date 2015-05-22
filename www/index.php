<?php
    if(isset($_COOKIE["Username"])){ 
        header("Location: game.html"); /* Redirect browser */
        exit();  
    } else {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }
        header("Location: login/"); /* Redirect browser */
        exit();
    }
?>