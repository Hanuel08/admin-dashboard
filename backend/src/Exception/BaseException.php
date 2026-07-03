<?php 

namespace App\Exception;

use Exception;

class BaseException extends Exception {
    protected int $status;
    protected $errors;

    public function __construct($message, int $status = 500, $errors = null) {
        parent::__construct($message);
        $this->status = $status;
        $this->errors = $errors;
    }

    public function getStatus(): int {
        return $this->status;
    }

    public function getErrors() {
        return $this->errors;
    }
}