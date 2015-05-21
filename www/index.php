<?php
    if (session_status() == PHP_SESSION_NONE || isset($_COOKIE['Username']) || strcmp($_COOKIE["Username"], "") == 0) {
        session_start();
        header("Location: login/"); /* Redirect browser */
        exit();
    } else {
        header("Location: game.html"); /* Redirect browser */
        exit();
    }
?>