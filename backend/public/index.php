<?php 

require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ . "/../src/utils/passwordHash.php";

use App\Core\Router;
use App\Core\Response;
use App\Exception\BaseException;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

set_exception_handler(function ($e) {
    $isDevelopment = ($_ENV['APP_ENV'] ?? 'production') === 'development';

    if ($e instanceof BaseException) {
        Response::error(
            $e->getMessage(),
            $e->getStatus(),
            $e->getErrors()
        );
    }

    $message = $isDevelopment ? $e->getMessage() : "Internal Server Error";
    $errors = $isDevelopment ? [
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => explode("\n", $e->getTraceAsString())
    ] : null;

    Response::error($message, 500, $errors);
});

set_error_handler(function ($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

$router = new Router();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST, PUT, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

require_once __DIR__ . "/../src/routes/routes.php";

$router->resolve();