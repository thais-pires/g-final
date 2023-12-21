package com.garantia.api.controller;

import com.garantia.api.model.Produto;
import com.garantia.api.repository.ProdutoRepository;
import com.garantia.api.service.ProdutoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/produtos")
    public List<Produto> list() {
        return this.produtoService.list();
    }

    @PostMapping("/produtos")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Produto create(@RequestBody Produto produto) {
        return this.produtoService.inserirOuAtualizar(produto);
    }

    @PutMapping("/produtos/{id}")
    public Produto update(@RequestBody Produto produto) {
        return this.produtoService.inserirOuAtualizar(produto);
    }

    @DeleteMapping("/produtos/{id}")
    public void delete (@PathVariable ("id") Long id) {
        this.produtoService.delete(id);
    }

    @GetMapping("/produtos/{id}")
    public Produto getProdutoPorId (@PathVariable ("id") Long id) {
        return this.produtoService.findById(id);
    }

}
