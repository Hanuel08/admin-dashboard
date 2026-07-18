<?php

namespace App\Core;

class QueryOptions {
    public array $filters = [];

    public ?string $search = null;

    public array $searchFields = [];

    public string $sort = "user_id";

    public string $direction = "ASC";

    public int $page = 1;

    public int $limit = 20;


    public static function fromArray(array $query): self
    {
        $options = new self();

        $options->page = max(1, (int)($query["page"] ?? 1));

        //var_dump($options->page);

        $options->limit = min(
            100,
            max(
                1,
                (int)($query["limit"] ?? 20)
            )
        );

        // $options->search = $query["search"] ?? null;



        $options->search = $query["search"] ?? null;

        $options->searchFields = isset($query["fields"])
            ? explode(",", $query["fields"])
            : [];

        // unset($query["search"]);
        // unset($query["fields"]);

        // $fields = array_intersect(
        //     $options->searchFields,
        //     self::SEARCHABLE_COLUMNS
        // );

        // $options->searchFields = !empty($fields) ? $fields : self::SEARCHABLE_COLUMNS;



        $options->sort = $query["sort"] ?? "user_id";

        $options->direction =
            strtoupper($query["direction"] ?? "ASC") === "DESC"
            ? "DESC"
            : "ASC";

        unset(
            $query["page"],
            $query["limit"],
            $query["search"],
            $query["fields"],
            $query["sort"],
            $query["direction"]
        );

        $options->filters = $query;

        return $options;
    }
}