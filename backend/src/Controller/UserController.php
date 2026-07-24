<?php

namespace App\Controller;
use App\Service\UserService;
use App\Core\Request;
use App\Core\Response;

class UserController {
    private $service;

    public function __construct() {
        $this->service = new UserService();
    }

    public function create() {
        $data = Request::body();
        $this->service->create($data);
        Response::success(["result" => "User created successfuly"], 201);
    }

    public function getAll() {
        // $users = $this->service->getAll();
        // Response::success($users);


        $query = Request::query();
        //var_dump($query);

        $users = $this->service->getAll($query);

        Response::success($users);
    }

    public function getById($id) {
        $user = $this->service->getById($id);
        Response::success($user);
    }

    public function update($id) {
        $data = Request::body();
        $this->service->update($id, $data);
        Response::success(["result" => "User updated successfuly"]);
    }

    public function delete($id) {
        $this->service->delete($id);
        Response::success(["result" => "User deleted successfuly"]);
    }

    public function deleteMultiple() {
        $data = Request::body();
        $ids = $data['ids'] ?? [];
        $this->service->deleteMultiple($ids);
        Response::success(["result" => "Users deleted successfuly"]);
    }

    public function stats() {
        $stats = $this->service->stats();
        Response::success($stats);
    }

    public function filterBy() {
        $data = Request::body();
        $users = $this->service->filterBy($data);
        Response::success($users);
    }

    public function searchBy() {
        $data = Request::body();
        $users = $this->service->searchBy($data);
        Response::success($users);
    }
}





