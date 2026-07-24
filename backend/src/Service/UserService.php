<?php 

namespace App\Service;
use App\Repository\UserRepository;
use App\Core\Validator;
use App\Core\QueryOptions;
use function passwordHash;

//require_once "../utils/passwordHash.php";

class UserService {
    private $repository;

    private const STATUS_MAP = [
        'pendiente'  => 'P',
        'activo'     => 'A',
        'inactivo'   => 'I',
        'suspendido' => 'S',
        'licencia'   => 'L',
        'vacaciones' => 'V',
    ];

    public function __construct() {
        $this->repository = new UserRepository();
    }

    private function mapStatus($data) {
        if (!empty($data['status']) && isset(self::STATUS_MAP[$data['status']])) {
            $data['status'] = self::STATUS_MAP[$data['status']];
        }
        return $data;
    }

    public function create($data) {
        Validator::validate($data, [
            'name'      => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'username'  => 'required|string|max:50',
            'email'     => 'required|email|max:100',
            'password'  => 'required|string|min:8|max:255',
            'role'      => 'required|string|in:admin,user',
        ]);

        $data['password'] = passwordHash($data['password']);
        $data = $this->mapStatus($data);

        if (empty($data['birthdate'])) $data['birthdate'] = '1990-01-01';
        if (empty($data['gender'])) $data['gender'] = 'M';

        return $this->repository->create($data);
    }

   public function getAll($query) {


        $options = QueryOptions::fromArray($query);

        //var_dump($options);

        return $this->repository->getAll($options);

        //return $this->repository->getAll();
    } 

    public function getById($id) {
        if (!$id) {
            throw new Exception("Invalid user id");
        }
        return $this->repository->getById($id);
    }

    public function update($id, $data) {
        if (!$id) {
            throw new Exception("Invalid user id");
        }

        $rules = [
            'name'      => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'username'  => 'required|string|max:50',
            'email'     => 'required|email|max:100',
            'role'      => 'required|string|in:admin,user',
        ];

        if (!empty($data['password'])) {
            $rules['password'] = 'required|string|min:8|max:255';
        }

        Validator::validate($data, $rules);

        if (!empty($data['password'])) {
            $data['password'] = passwordHash($data['password']);
        }

        $data = $this->mapStatus($data);
        
        return $this->repository->update($id, $data);
    }

    public function delete($id) {
        if (!$id) {
            throw new Exception("Invalid user id");
        }
        return $this->repository->delete($id);
    }

    public function deleteMultiple($ids) {
        if (empty($ids) || !is_array($ids)) {
            throw new Exception("Invalid user ids");
        }
        return $this->repository->deleteMultiple($ids);
    }


    public function stats() {
        return $this->repository->stats();
    }


    public function filterBy($data) {
        // [{ property : string, values : array }]

        //if (count($data) === 0) return $this->repository->getAll();

        //$result = [];
        //$conditions = "";
        
        // foreach ($data as $el) {
        //    //if (count($el["values"]) > 1) return $this->repository->filterByIn($data);

        //    //$conditions = implode(" AND ", $el['values']);

        //    foreach ($el['values'] as $value) {
        //         $conditions .= "AND " . $el['property'] . " = '" . $value . "'\n";
        //    }

            

        //    echo $conditions . "\n";

        //    //$result = $this->repository->filterBy($conditions);
        // }

        $conditions = "";


        foreach ($data as $index => $el) {
            if (count($data) > 1) $conditions .= "(";
            
            if (count($el['values']) >= 1) {
                //if (count($el['values']) > 1) $condi
                
                $conditions .= $el['property'] . " = " . "'" . $el['values'][0] . "'";

                for ($i = 1; $i < count($el['values']); $i++) {
                    $conditions .= " OR " . $el['property'] . " = " . "'" . $el['values'][$i] . "'";
                }

                //array_push($result, $this->repository->filterBy($conditions));

                //var_dump($this->repository->filterBy($conditions));

                //var_dump($conditions);
                //echo "\n";

                if (count($data) > 1 && $index < count($data) - 1) {
                    $conditions .= ") AND ";
                }

                if (count($data) > 1 && $index === count($data) - 1) {
                    $conditions .= ")";
                }
            }




        }




        // var_dump($conditions);
        // echo "\n";

        //var_dump($this->repository->filterBy($conditions));
        return $this->repository->filterBy($conditions);




        //if (count($data["values"]) > 1) return $this->repository->filterByIn($data);

        //return $this->repository->filterBy($data);
    }


    public function searchBy() {
        $data = Request::body();
        $users = $this->repository->searchBy($data);
        Response::success($users);
    }

    // public function getLanguage($id) {
    //     if (!$id) {
    //         throw new Exception("Invalid user id");
    //     }
    //     return $this->repository->getLanguage($id);
    // }

    // public function getReviews($id) {
    //     if (!$id) {
    //         throw new Exception("Invalid user id");
    //     }
    //     return $this->repository->getReviews($id);
    // }

    // public function getRoles($id) {
    //     if (!$id) {
    //         throw new Exception("Invalid user id");
    //     }
    //     return $this->repository->getRoles($id);
    // }

    // public function getOrders($id) {
    //     if (!$id) {
    //         throw new Exception("Invalid user id");
    //     }
    //     return $this->repository->getOrders($id);
    // }
}