import { LOCALE_ID, DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from './layout/layout/layout.module'
// import { ProdutoModule } from './produto/produto.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './layout/material/material.module'
import { CadastroComponent } from './produto/cadastro/cadastro.component';
import { ListagemComponent } from './produto/listagem/listagem.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FirestoreModule } from './firestore/firestore.module';
import { DataPipe } from './shared/pipes/data.pipe';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { NotificacaoDialogComponent } from './layout/layout/menu/notificacao-dialog/notificacao-dialog.component';


registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ListagemComponent,
    DataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FirestoreModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, DataPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


// providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
