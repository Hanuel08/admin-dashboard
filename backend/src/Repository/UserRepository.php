<?php

namespace App\Repository;
use App\Config\Database;
use App\Core\QueryBuilder;
use App\Core\QueryOptions;
use \PDO;


class UserRepository {

    private $db;

    private const SEARCHABLE_COLUMNS = [
        "name",
        //"last_name",
        "username",
        "email",
        "identity_card",
        "phone"
    ];

    public function __construct() {
        $this->db = Database::connect();
    }

    public function create($data) {
        $query = "INSERT INTO users (
                        name,
                        last_name,
                        username,
                        email,
                        password,
                        role,
                        status,
                        identity_card,
                        birthdate,
                        phone,
                        gender
                    )
                    VALUES (
                        :name,
                        :last_name,
                        :username,
                        :email,
                        :password,
                        :role,
                        :status,
                        :identity_card,
                        :birthdate,
                        :phone,
                        :gender
                    )";

        $stmt = $this->db->prepare($query);

        $stmt->bindParam(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindParam(":last_name", $data["last_name"], PDO::PARAM_STR);
        $stmt->bindParam(":username", $data["username"], PDO::PARAM_STR);
        $stmt->bindParam(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindParam(":password", $data["password"], PDO::PARAM_STR);
        $stmt->bindParam(":role", $data["role"], PDO::PARAM_STR);
        $stmt->bindParam(":status", $data["status"], PDO::PARAM_STR);
        $stmt->bindParam(":identity_card", $data["identity_card"], PDO::PARAM_STR);
        $stmt->bindParam(":birthdate", $data["birthdate"], PDO::PARAM_STR);
        $stmt->bindParam(":phone", $data["phone"], PDO::PARAM_STR);
        $stmt->bindParam(":gender", $data["gender"], PDO::PARAM_STR);

        return $stmt->execute();
    }


    // public function getAll() {
    //     $query = "SELECT * 
    //                     FROM v_users_api_get_all;";

    //     $stmt = $this->db->prepare($query);
    //     $stmt->execute();
    //     return $stmt->fetchAll();
    // }


    public function getAll(QueryOptions $options) {

        
        $builder = new QueryBuilder(
            "v_users_api_get_all"
        );


        foreach ($options->filters as $field => $value)
        {
            if ($value !== "")
            {
                $builder->where(
                    $field,
                    $value
                );
            }
        }

        // if ($options->search)
        // {
        //     $builder->like(
        //         "name",
        //         $options->search
        //     );
        // }


        $fields = empty($options->searchFields)
        ? self::SEARCHABLE_COLUMNS
        : array_intersect(
            $options->searchFields,
            self::SEARCHABLE_COLUMNS
        );

        if ($options->search) {
            $builder->search(
                $fields,
                $options->search
            );
        }

        $builder
            ->orderBy(
                $options->sort,
                $options->direction
            )
            ->limit($options->limit)
            ->offset(
                ($options->page - 1)
                * $options->limit
            );

        $stmt = $this->db->prepare(
            $builder->toSql()
        );

        $stmt->execute(
            $builder->getParams()
        );

        return $stmt->fetchAll();
    }


    public function getById($id) {
        $query = "SELECT *
                    FROM users
                        WHERE user_id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch();
    }

    public function update($id, $data) {
        $query = "UPDATE users
                    SET
                        name = :name,
                        last_name = :last_name,
                        username = :username,
                        email = :email,
                        password = :password,
                        role = :role,
                        status = :status,
                        identity_card = :identity_card,
                        birthdate = :birthdate,
                        phone = :phone,
                        gender = :gender,
                        updated_at = NOW()
                    WHERE user_id = :id";

        $stmt = $this->db->prepare($query);

        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->bindParam(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindParam(":last_name", $data["last_name"], PDO::PARAM_STR);
        $stmt->bindParam(":username", $data["username"], PDO::PARAM_STR);
        $stmt->bindParam(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindParam(":password", $data["password"], PDO::PARAM_STR);
        $stmt->bindParam(":role", $data["role"], PDO::PARAM_STR);
        $stmt->bindParam(":status", $data["status"], PDO::PARAM_STR);
        $stmt->bindParam(":identity_card", $data["identity_card"], PDO::PARAM_STR);
        $stmt->bindParam(":birthdate", $data["birthdate"], PDO::PARAM_STR);
        $stmt->bindParam(":phone", $data["phone"], PDO::PARAM_STR);
        $stmt->bindParam(":gender", $data["gender"], PDO::PARAM_STR);

        return $stmt->execute();
    }

    public function delete($id) {
        $query = "DELETE FROM users
                    WHERE user_id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        return $stmt->execute();
    }


    public function filterBy($conditions) {

        //$conditions = $data["values"];

        $query = "SELECT * 
                        FROM v_users_api_get_all 
                        WHERE $conditions;";




        $stmt = $this->db->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll();
    }


    public function filterByIn($data) {
        $query = "INSERT INTO users (
                        name,
                        last_name,
                        username,
                        email,
                        password,
                        role,
                        status,
                        identity_card,
                        birthdate,
                        phone,
                        gender
                    )
                    VALUES (
                        :name,
                        :last_name,
                        :username,
                        :email,
                        :password,
                        :role,
                        :status,
                        :identity_card,
                        :birthdate,
                        :phone,
                        :gender
                    )";

        $stmt = $this->db->prepare($query);

        $stmt->bindParam(":name", $data["name"], PDO::PARAM_STR);
        $stmt->bindParam(":last_name", $data["last_name"], PDO::PARAM_STR);
        $stmt->bindParam(":username", $data["username"], PDO::PARAM_STR);
        $stmt->bindParam(":email", $data["email"], PDO::PARAM_STR);
        $stmt->bindParam(":password", $data["password"], PDO::PARAM_STR);
        $stmt->bindParam(":role", $data["role"], PDO::PARAM_STR);
        $stmt->bindParam(":status", $data["status"], PDO::PARAM_STR);
        $stmt->bindParam(":identity_card", $data["identity_card"], PDO::PARAM_STR);
        $stmt->bindParam(":birthdate", $data["birthdate"], PDO::PARAM_STR);
        $stmt->bindParam(":phone", $data["phone"], PDO::PARAM_STR);
        $stmt->bindParam(":gender", $data["gender"], PDO::PARAM_STR);

        return $stmt->execute();
    }
}