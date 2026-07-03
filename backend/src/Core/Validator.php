<?php 

namespace App\Core;

use App\Exception\ValidationException;

class Validator {

    public static function validate(
        array $data,
        array $rules,
        array $messages = []
    ):void {
        $errors = [];
        
        foreach ($rules as $field => $rulesString) {
            $rulesArray = explode("|", $rulesString);

            if (!array_key_exists($field, $data)) $data[$field] = null;

            $value = $data[$field];

            foreach ($rulesArray as $rule) {
                if ($rule === 'required') {
                    if (!self::validateRequired($value)) {
                        $errors[$field] = self::errorMessage("$field.$rule", $messages, "$field is required");
                        continue;
                    }
                }

                if ($rule === 'string') {
                    if (!self::validateString($value)) {
                        $errors[$field] = self::errorMessage("$field.$rule", $messages, "$field must be a string");
                    }
                }

                if ($rule === 'numeric') {
                    if (!self::validateNumeric($value)) {
                        $errors[$field] = self::errorMessage("$field.$rule", $messages, "$field must be numeric");
                    }
                }

                if ($rule === 'boolean') {
                    if (!self::validateBoolean($value)) {
                        $errors[$field] = self::errorMessage("$field.$rule", $messages, "$field must be true or false");
                    }
                }

                if ($rule === 'email') {
                    if (!self::validateEmail($value)) {
                        $errors[$field] = self::errorMessage("$field.$rule", $messages, "$field is a invalid email format");
                    }
                }

                if (str_starts_with($rule, 'min:')) {
                    $min = explode(":", $rule)[1];
                    if (!self::validateMin($value, $min)) {
                        $errors[$field] = self::errorMessage("$field.min", $messages, "$field must have at least $min characters");
                    }
                }

                if (str_starts_with($rule, 'max:')) {
                    $max = explode(":", $rule)[1];
                    if (!self::validateMax($value, $max)) {
                        $errors[$field] = self::errorMessage("$field.max", $messages, "$field must have a maximum of $max characters");
                    }
                }

                if (str_starts_with($rule, 'in:')) {
                    $allowedValues = explode(",", explode(":", $rule, 2)[1]);
                    if (!self::validateIn($value, $allowedValues)) {
                        $errors[$field] = self::errorMessage("$field.in", $messages, "$field must be one of: " . implode(", ", $allowedValues));
                    }
                }
            }
        }

        if (!empty($errors)) throw new ValidationException($errors);
    }

    private static function validateRequired($value) {
        if ($value === null || $value === '') return false;
        return true;
    }

    private static function validateString($value) {
        if (!is_string($value)) return false;
        return true;
    }

    private static function validateNumeric($value) {
        if (!is_numeric($value)) return false;
        return true;
    }

    private static function validateBoolean($value) {
        if (!is_bool($value)) return false;
        return true;
    }

    private static function validateEmail($value) {
        if (!self::validateString($value)) return false;
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) return false;
        return true;
    }

    private static function validateMin($value, $min) {
        if (!self::validateString($value)) return false;
        if (strlen($value) < $min) return false;
        return true;
    }

    private static function validateMax($value, $max) {
        if (!self::validateString($value)) return false;
        if (strlen($value) > $max) return false;
        return true;
    }

    private static function validateIn($value, $allowedValues) {
        return in_array($value, $allowedValues, true);
    }

    private static function errorMessage($rule, $messages, $defaultMessage) {
        return $messages[$rule] ?? $defaultMessage;
    }
}