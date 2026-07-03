<?php

namespace App\Exception;

use BaseException;

class NotFoundException extends BaseException {
    public function __construct($message = 'Resource not found') {
        parent::__construct($message, 404);
    }
}