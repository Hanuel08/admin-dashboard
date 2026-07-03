<?php

namespace App\Core;

class Request {
    public static function method() {
        return $_SERVER['REQUEST_METHOD'] ?? 'GET';
    }

    public static function uri() {
        return parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    }

    public static function body() {
        $input = file_get_contents('php://input');
        return json_decode($input, true) ?? [];
    }

    public static function query($key) {
        return $_GET[$key] ?? null;
    }
}

