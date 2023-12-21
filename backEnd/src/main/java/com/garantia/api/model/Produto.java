package com.garantia.api.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200, nullable = false)
    private String nome;

    // @Column(length = 200, nullable = false)
    private Date dataCompra;

    // @Column(length = 200, nullable = false)
    private Integer duracaoGarantiaMeses;

    // @Column(length = 200, nullable = false)
    private Date dataFimGarantia;

    private Long marcaId;
}
