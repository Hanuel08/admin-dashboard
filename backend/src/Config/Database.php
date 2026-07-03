<?php

namespace App\Config;

use App\Exception\DatabaseException;
use PDO;
use PDOException;

class Database {

    # PDO or null
    private static ?PDO $connection = null;

    public static function connect(): PDO {
        if (self::$connection === null) {
            try {
                $driver = $_ENV["DB_CONNECTION"] ?? (($_ENV["DB_PORT"] ?? '') == 5432 ? 'pgsql' : 'mysql');
                
                if ($driver === 'pgsql') {
                    $dsn = "pgsql:host=" . $_ENV["DB_HOST"] .
                           ";port=" . $_ENV["DB_PORT"] .
                           ";dbname=" . $_ENV["DB_NAME"];
                } else {
                    $dsn = "mysql:host=" . $_ENV["DB_HOST"] .
                           ";port=" . $_ENV["DB_PORT"] .
                           ";dbname=" . $_ENV["DB_NAME"] .
                           ";charset=utf8mb4";
                }

                self::$connection = new PDO(
                    $dsn,
                    $_ENV["DB_USER"],
                    $_ENV["DB_PASSWORD"],
                    # attributes
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ]
                );

            } catch (PDOException $err) {
                throw new DatabaseException("Database connection error: " . $err->getMessage());
            }
        }

        return self::$connection;
    }
}
