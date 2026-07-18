<?php


namespace App\Core;


class QueryBuilder
{
  private string $table;

  private array $where = [];

  private array $params = [];

  private array $order = [];

  private ?int $limit = null;

  private ?int $offset = null;

  public function __construct(string $table) {
    $this->table = $table;
  }

  public function where(string $column, $value): self {
    $param = str_replace(".", "_", $column);

    if (str_contains($value, ',')) {
        $values = array_map('trim', explode(',', $value));
        $placeholders = [];
        foreach ($values as $i => $v) {
            $p = "{$param}_{$i}";
            $placeholders[] = ":$p";
            $this->params[$p] = $v;
        }
        $this->where[] = "$column IN (" . implode(", ", $placeholders) . ")";
    } else {
        $this->where[] = "$column = :$param";
        $this->params[$param] = $value;
    }

    return $this;
  }

  // public function like(string $column, string $value): self {
  //   $param = "like_" . count($this->params);

  //   //var_dump($this->params);

  //   $this->where[] = "$column ILIKE :$param";

  //   // var_dump("hola amigo\n");
  //   // var_dump($this->where);

  //   $this->params[$param] = "%$value%";

  //   // var_dump("hola amigo\n");
  //   // var_dump($this->params);
    

  //   return $this;
  // }


  public function search(array $columns, string $value): self {
    if (empty($columns)) {
        return $this;
    }

    $conditions = [];

    foreach ($columns as $i => $column) {

        $param = "search_$i";

        $conditions[] = "$column ILIKE :$param";

        $this->params[$param] = "%{$value}%";
    }

    $this->where[] =
        "(" . implode(" OR ", $conditions) . ")";

    return $this;
  }

    
  public function orderBy(string $column, string $direction = "ASC"): self {
    $this->order[] = "$column $direction";

    return $this;
  }

  public function limit(int $limit): self {
    $this->limit = $limit;

    return $this;
  }

  public function offset(int $offset): self {
    $this->offset = $offset;

    return $this;
  }

  public function toSql(): string {
    $sql = "SELECT * FROM {$this->table}";

    if ($this->where) {
      $sql .=" WHERE " . implode(" AND ", $this->where);
    }

    if ($this->order) {
      $sql .=" ORDER BY " . implode(",", $this->order);
    }

    if ($this->limit) {
      $sql .=" LIMIT {$this->limit}";
    }

    if ($this->offset) {
      $sql .=" OFFSET {$this->offset}";
    }

    return $sql;
  }

  public function getParams(): array {
    return $this->params;
  }
}

