<?php

namespace App\Exception;

use App\Exception\BaseException;

class ValidationException extends BaseException {
    public function __construct($errors) {
        parent::__construct('Validation error', 422, $errors);
    }
}