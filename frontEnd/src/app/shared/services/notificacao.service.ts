import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto } from '../model/produto';
import { ProdutoService } from './produto.service';
import { addMonths, isBefore } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  private produtosNotificadosSubject = new BehaviorSubject<Produto[]>([]);
  produtosNotificados$ = this.produtosNotificadosSubject.asObservable();

  constructor(private produtoService: ProdutoService) {
    this.calcularNotificacoes();
  }

  private calcularNotificacoes() {
    this.produtoService.getProdutos().subscribe((produtos) => {
      const hoje = new Date();
      const produtosNotificados = produtos.filter((produto) => {
        if (produto.dataFimGarantia) {
          return isBefore(addMonths(produto.dataFimGarantia, -6), hoje);
        }
        return false;
      });
      this.produtosNotificadosSubject.next(produtosNotificados);
    });
  }
}
