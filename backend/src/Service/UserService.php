<?php 

namespace App\Service;
use App\Repository\UserRepository;
use App\Core\Validator;
use function passwordHash;

//require_once "../utils/passwordHash.php";

class UserService {
    private $repository;

    public function __construct() {
        $this->repository = new UserRepository();
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

        return $this->repository->create($data);
    }

   public function getAll() {
        return $this->repository->getAll();
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

        Validator::validate($data, [
            'name'      => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'username'  => 'required|string|max:50',
            'email'     => 'required|email|max:100',
            'password'  => 'required|string|min:8|max:255',
            'role'      => 'required|string|in:admin,user',
        ]);

        $data['password'] = passwordHash($data['password']);
        
        return $this->repository->update($id, $data);
    }

    public function delete($id) {
        if (!$id) {
            throw new Exception("Invalid user id");
        }
        return $this->repository->delete($id);
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