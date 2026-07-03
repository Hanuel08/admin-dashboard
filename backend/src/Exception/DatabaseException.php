<?php

namespace App\Exception;

use App\Exception\BaseException;

class DatabaseException extends BaseException {
    public function __construct($message = 'Database error') {
        parent::__construct($message, 500);
    }
}