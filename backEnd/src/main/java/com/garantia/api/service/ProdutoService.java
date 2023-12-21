package com.garantia.api.service;

import com.garantia.api.model.Produto;
import com.garantia.api.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    // public ProdutoService(ProdutoRepository produtoRepository) {
    // this.produtoRepository = produtoRepository;
    // }

    public List<Produto> list() {
        return this.produtoRepository.findAll();
    }

    public Produto findById(@PathVariable @NotNull Long id) {
        return this.produtoRepository.findById(id).orElse(null);
    }

    @Transactional
    public Produto inserirOuAtualizar(Produto produto) {
        Produto produtoAdd = this.produtoRepository.save(produto);
        return produtoAdd;
    }

    public void delete(Long id) {
        this.produtoRepository.deleteById(id);
    }
}
