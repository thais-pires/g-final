// src/app/shared/services/produto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import { Produto } from '../model/produto';
import { Marca } from '../model/marca';
import { MarcaService } from './marca.service';
import { addMonths, isBefore } from 'date-fns';


@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private apiUrl = '/api/produtos';
  // private apiUrl = 'http://localhost:3000/produtos';


  constructor(private http: HttpClient, private marcaService: MarcaService) { }

  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl).pipe(
      switchMap((produtos) => {
        const observables = produtos.map((produto) =>
          this.marcaService.getMarcaById(produto.marcaId).pipe(
            map((marca) => {
              return { ...produto, marca };
            })
          )
        );
        return forkJoin(observables);
      })
    );
  }

  getProdutoById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  addProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  updateProduto(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${produto.id}`, produto);
  }

  deleteProduto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMarcas(): Observable<Marca[]> {
    return this.marcaService.getMarcas();
  }
}
