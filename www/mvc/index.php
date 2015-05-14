<?php
    include("Model.php");
    include("Controller.php");
    include("View.php");
    $model = new Model();    
    $controller = new Controller($model);
    $view = new View($controller, $model);

    echo $model->string;
    echo '<p><a href="index.php?action=testing">'.$model->string."</a></p>";
    if (isset($_GET['action']) && !empty($_GET['action'])) {
        $controller->{$_GET['action']}();
    }
    
    echo $view->output();
?>