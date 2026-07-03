<?php

use App\Core\Router;


use App\Controller\UserController;



# user
$router->get('/users', [UserController::class, 'getAll']);
$router->get('/users/{id:\d+}', [UserController::class, 'getById']);

$router->post('/users', [UserController::class, 'create']);

$router->put('/users/{id:\d+}', [UserController::class, 'update']);

$router->delete('/users/{id:\d+}', [UserController::class, 'delete']);
