<?php

function passwordHash ($password) {
    $newPassword = password_hash(
            $password, 
            PASSWORD_DEFAULT
        );
    return $newPassword;
}

