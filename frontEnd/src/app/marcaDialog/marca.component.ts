import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Marca } from '../shared/model/marca';

@Component({
  selector: 'app-marca-dialog',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.scss'],
})
export class MarcaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MarcaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { marca: Marca }
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
