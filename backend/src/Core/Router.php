<?php

namespace App\Core;
use App\Core\Request;
use App\Core\Response;

class Router {
    private $routes = [];

    public function get($path, $handler) {
        $this->routes['GET'][$path] = $handler;
    }

    public function post($path, $handler) {
        $this->routes['POST'][$path] = $handler;
    }

    public function put($path, $handler) {
        $this->routes['PUT'][$path] = $handler;
    }

    public function delete($path, $handler) {
        $this->routes['DELETE'][$path] = $handler;
    }

    public function resolve() {
        $method = Request::method();
        $uri = Request::uri();

        $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';

        $baseDir = dirname($scriptName);

        if (strpos($uri, $scriptName) === 0) {
            $uri = substr($uri, strlen($scriptName));
        } elseif ($baseDir !== '/' && strpos($uri, $baseDir) === 0) {
            $uri = substr($uri, strlen($baseDir));
        }

        if ($uri === "") {
            $uri = "/";
        }

        if ($method === 'OPTIONS') {
            http_response_code(200);
            return;
        }

        if (!isset($this->routes[$method])) {
            Response::error("Route not found", 404);
        }

        foreach($this->routes[$method] as $route => $handler) {
            $pattern = $this->convertRouteToRegex($route);

            if (preg_match($pattern, $uri, $matches)) {
                array_shift($matches);

                [$controller, $function] = $handler;

                if (!class_exists($controller)) {
                    Response::error("Controller not found", 500);
                }

                $controller = new $controller();

                if (!method_exists($controller, $function)) {
                    Response::error("Method not found", 500);
                }

                $controller->$function(...$matches);
                return;
            }
        }
        
        Response::error("Route not found", 404);
    }

    private function convertRouteToRegex($route) {
        $pattern = preg_replace_callback(
            '#\{(\w+)(?::([^}]+))?\}#',
            function ($matches) {
                $regex = $matches[2] ?? '[^/]+';
                return '(' . $regex . ')';
            },
            $route
        );

        return "#^" . $pattern . "$#";
    }
}








