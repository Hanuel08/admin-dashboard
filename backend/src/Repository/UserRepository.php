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
        $stmt->bindParam(":birthdate", $data["birthdate"], PDO::PARAM_STR);
        $stmt->bindParam(":gender", $data["gender"], PDO::PARAM_STR);

        $identityCard = !empty($data["identity_card"]) ? $data["identity_card"] : null;
        $phone = !empty($data["phone"]) ? $data["phone"] : null;

        if ($identityCard !== null) {
            $stmt->bindParam(":identity_card", $identityCard, PDO::PARAM_STR);
        } else {
            $stmt->bindValue(":identity_card", null, PDO::PARAM_NULL);
        }

        if ($phone !== null) {
            $stmt->bindParam(":phone", $phone, PDO::PARAM_STR);
        } else {
            $stmt->bindValue(":phone", null, PDO::PARAM_NULL);
        }

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
        $fields = [
            'name' => PDO::PARAM_STR,
            'last_name' => PDO::PARAM_STR,
            'username' => PDO::PARAM_STR,
            'email' => PDO::PARAM_STR,
            'role' => PDO::PARAM_STR,
            'status' => PDO::PARAM_STR,
        ];

        if (!empty($data['password'])) {
            $fields['password'] = PDO::PARAM_STR;
        }

        $setClauses = [];
        foreach ($fields as $field => $type) {
            $setClauses[] = "$field = :$field";
        }

        $optionalFields = ['identity_card', 'phone'];
        foreach ($optionalFields as $field) {
            $setClauses[] = "$field = :$field";
        }

        $setClauses[] = "updated_at = NOW()";

        $query = "UPDATE users
                    SET " . implode(", ", $setClauses) . "
                    WHERE user_id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);

        foreach ($fields as $field => $type) {
            $stmt->bindParam(":$field", $data[$field], $type);
        }

        foreach ($optionalFields as $field) {
            $value = !empty($data[$field]) ? $data[$field] : null;
            if ($value !== null) {
                $stmt->bindParam(":$field", $data[$field], PDO::PARAM_STR);
            } else {
                $stmt->bindValue(":$field", null, PDO::PARAM_NULL);
            }
        }

        return $stmt->execute();
    }

    public function delete($id) {
        $query = "DELETE FROM users
                    WHERE user_id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function deleteMultiple($ids) {
        $placeholders = implode(", ", array_fill(0, count($ids), "?"));

        $query = "DELETE FROM users
                    WHERE user_id IN ($placeholders)";

        $stmt = $this->db->prepare($query);

        foreach ($ids as $index => $id) {
            $stmt->bindValue($index + 1, $id, PDO::PARAM_INT);
        }

        return $stmt->execute();
    }

    public function stats() {
        $total = $this->db->query("SELECT count(*) FROM users")->fetchColumn();

        $byStatus = $this->db->query("
            SELECT CASE status
                WHEN 'A' THEN 'activo'
                WHEN 'I' THEN 'inactivo'
                WHEN 'P' THEN 'pendiente'
                WHEN 'S' THEN 'suspendido'
                WHEN 'L' THEN 'licencia'
                WHEN 'V' THEN 'vacaciones'
            END as status, count(*) as count
            FROM users GROUP BY status ORDER BY count DESC
        ")->fetchAll(PDO::FETCH_KEY_PAIR);

        $byRole = $this->db->query("
            SELECT role, count(*) as count
            FROM users GROUP BY role
        ")->fetchAll(PDO::FETCH_KEY_PAIR);

        $age = $this->db->query("
            SELECT round(avg(f_calc_age(birthdate)))::int as avg,
                   min(f_calc_age(birthdate)) as min,
                   max(f_calc_age(birthdate)) as max
            FROM users
        ")->fetch(PDO::FETCH_ASSOC);

        $byGender = $this->db->query("
            SELECT CASE gender
                WHEN 'M' THEN 'male'
                WHEN 'F' THEN 'female'
            END as gender, count(*) as count
            FROM users GROUP BY gender
        ")->fetchAll(PDO::FETCH_KEY_PAIR);

        return [
            'total' => (int) $total,
            'byStatus' => $byStatus,
            'byRole' => $byRole,
            'age' => [
                'avg' => (int) ($age['avg'] ?? 0),
                'min' => (int) ($age['min'] ?? 0),
                'max' => (int) ($age['max'] ?? 0),
            ],
            'byGender' => $byGender,
        ];
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