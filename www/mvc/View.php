<?php
    class View{
        private $model;
        private $controller;
        
        public function __construct($controller, $model){
            $this->model = $model;
            $this->controller = $controller;
        }
        
        public function output(){
            return '<p><a href="index.php?action=testing">' . $this->model->string . "</a></p>";
        }
    }
?>