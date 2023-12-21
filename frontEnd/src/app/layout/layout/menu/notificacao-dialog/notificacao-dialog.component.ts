// src/app/layout/layout/menu/notificacao-dialog/notificacao-dialog.component.ts
import { Component } from '@angular/core';
import { NotificacaoService } from '../../../../shared/services/notificacao.service';

@Component({
  selector: 'app-notificacao-dialog',
  templateUrl: './notificacao-dialog.component.html',
  styleUrls: ['./notificacao-dialog.component.scss'],
})
export class NotificacaoDialogComponent {
  produtosNotificados$ = this.notificacaoService.produtosNotificados$;

  constructor(private notificacaoService: NotificacaoService) { }
}
