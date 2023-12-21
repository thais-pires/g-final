import { Produto } from './../model/produto';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoFirestoreService {


  colecaoProdutos: AngularFirestoreCollection<Produto>;
  NOME_COLECAO = 'produtos';


  constructor(private afs: AngularFirestore) {
    this.colecaoProdutos = afs.collection(this.NOME_COLECAO);
  }


  listar(): Observable<Produto[]> {
    // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
    return this.colecaoProdutos.valueChanges({ idField: 'id' });
  }


  inserir(produto: Produto): Observable<object> {
    // removendo id pois ele está undefined, já que um novo usuário
    if (produto.id) {
      delete produto.id;
    }

    // Object.assign({}, Produto) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado
    // o from transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
    return from(this.colecaoProdutos.add(Object.assign({}, produto)));
  }


  apagar(id: string): Observable<void> {
    return from(this.colecaoProdutos.doc(id).delete());
  }


  pesquisarPorId(id: string): Observable<Produto> {
    // como o objeto retornado pelo get é um DocumentData, e não um usuário, transformamos a partir de um pipe e mapeamos de um document
    //  para o tipo usuário
    // return this.colecaoProdutos.doc(id).get().pipe(map(document => new Produto(document.id, document.data())));
    // return this.colecaoProdutos.doc(id).get().pipe(map(document => document.data()));
    return this.colecaoProdutos.doc(id).get().pipe(map(document => {
      const data = document.data();
      if (!data) {
        throw new Error('Document not found');
      }
      return data as Produto;
    }));
  }


  atualizar(produto: Produto): Observable<void> {
    const id = produto.id;
    // removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento
    delete produto.id;
    return from(this.colecaoProdutos.doc(id).update(Object.assign({}, produto)));


  }
}
