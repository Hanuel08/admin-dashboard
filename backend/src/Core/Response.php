<?php

namespace App\Core;

class Response {
    public static function json($data, int $status = 200): void {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    public static function success($data = null, string $message = 'OK', int $status = 200): void {
        self::json([
            'success' => true,
            'message' => $message,
            'data' => $data,
            'errors' => null
        ], $status);
    }

    public static function error(string $message = 'Error', int $status = 500, $errors = null): void {
        self::json([
            'success' => false,
            'message' => $message,
            'data' => null,
            'errors' => $errors
        ], $status);
    }
}