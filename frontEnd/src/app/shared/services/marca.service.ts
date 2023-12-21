import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Marca } from '../model/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  marcas: Marca[] = [
    { id: '1', nome: 'Nenhuma', website: '', email: '' },
    { id: '2', nome: 'Apple', website: 'https://www.apple.com', email: 'info@apple.com' },
    { id: '3', nome: 'Samsung', website: 'https://www.samsung.com', email: 'support@samsung.com' },
    { id: '4', nome: 'Huawei', website: 'https://www.huawei.com', email: 'info@huawei.com' },
    { id: '5', nome: 'Motorola', website: 'https://www.motorola.com', email: 'info@motorola.com' },
    { id: '6', nome: 'Xiaomi', website: 'https://www.xiaomi.com', email: 'info@xiaomi.com' }
  ];

  constructor() { }

  getMarcas(): Observable<Marca[]> {
    return of(this.marcas);
  }

  getMarcaById(id: string): Observable<Marca | undefined> {
    const marca = this.marcas.find((m) => m.id === id);
    return of(marca);
  }
}
