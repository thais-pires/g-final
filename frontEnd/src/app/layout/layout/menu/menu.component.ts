// src/app/layout/layout/menu/menu.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoDialogComponent } from './notificacao-dialog/notificacao-dialog.component';
import { NotificacaoService } from '../../../shared/services/notificacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  quantidadeNotificacoes: number = 0;

  constructor(
    private notificacaoService: NotificacaoService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.notificacaoService.produtosNotificados$.subscribe(
      (produtosNotificados) => {
        this.quantidadeNotificacoes = produtosNotificados.length;
      }
    );
  }

  abrirDialog() {
    this.dialog.open(NotificacaoDialogComponent);
  }
}
