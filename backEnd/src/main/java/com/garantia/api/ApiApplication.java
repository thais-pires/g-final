package com.garantia.api;

import com.garantia.api.model.Produto;
import com.garantia.api.repository.ProdutoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ProdutoRepository produtoRepository) {
		return args -> {
			Produto p = new Produto();
			p.setNome("TV");

			produtoRepository.save(p);
		};
	}
}
