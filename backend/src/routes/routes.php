<?php

use App\Core\Router;


use App\Controller\UserController;



# user
$router->get('/users', [UserController::class, 'getAll']);
$router->get('/users/stats', [UserController::class, 'stats']);
$router->get('/users/{id:\d+}', [UserController::class, 'getById']);

$router->post('/users', [UserController::class, 'create']);

$router->put('/users/{id:\d+}', [UserController::class, 'update']);

$router->delete('/users/{id:\d+}', [UserController::class, 'delete']);

$router->post('/users/delete-multiple', [UserController::class, 'deleteMultiple']);

$router->post('/users/filter', [UserController::class, 'filterBy']);


$router->post('/users/search', [UserController::class, 'searchBy']);




// ?page=1
// &limit=20
// &search=john
// &role=admin
// &status=active
// &sort=name
// &direction=asc

// Ejemplo completo

// GET /users?page=2
//             &limit=25
//             &search=john
//             &role=admin
//             &status=active
//             &sort=created_at
//             &direction=desc
