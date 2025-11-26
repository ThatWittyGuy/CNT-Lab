package com.example.result_service.controller;

import com.example.result_service.dto.ResultRequest;
import com.example.result_service.dto.ResultResponse;
import com.example.result_service.model.ResultEntity;
import com.example.result_service.repository.ResultRepository;
import com.example.result_service.service.ResultService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*") // during dev allow all; tighten in production
public class ResultController {

    private final ResultService service;
    private final ResultRepository repo;

    public ResultController(ResultService service, ResultRepository repo) {
        this.service = service;
        this.repo = repo;
    }

    @PostMapping
    public ResponseEntity<ResultResponse> create(@RequestBody ResultRequest req) {
        ResultResponse res = service.save(req);
        return ResponseEntity.ok(res);
    }

    @GetMapping
    public ResponseEntity<List<ResultEntity>> list() {
        return ResponseEntity.ok(repo.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResultEntity> getById(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
