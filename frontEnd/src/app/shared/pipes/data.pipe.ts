import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Timestamp } from 'firebase/firestore';

@Pipe({
  name: 'dataPipe'
})
export class DataPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) { }

  transform(value: Timestamp | Date): string {
    // Verifica se o valor é um objeto Timestamp e o converte para uma data
    if (value instanceof Timestamp) {
      value = value.toDate();
    }

    // Agora, use o DatePipe para formatar a data
    let transformedValue = this.datePipe.transform(value, 'dd-MM-yyyy');
    return transformedValue !== null ? transformedValue : '';
  }
}
