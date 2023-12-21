import { ProdutoFirestoreService } from './../../shared/services/produto-firestore.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Produto } from '../../shared/model/produto';
import { ProdutoService } from '../../shared/services/produto.service';
import { addMonths } from 'date-fns';
import { Location } from '@angular/common';

// Importe a Marca e MarcaService
import { Marca } from '../../shared/model/marca';
import { MarcaService } from '../../shared/services/marca.service';
import { MensagemService } from 'src/app/shared/services/mensagem.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  marcas: Marca[] = [];
  // Inicialize o produtoForm no momento da declaração da propriedade
  produtoForm: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    dataCompra: ['', Validators.required],
    duracaoGarantiaMeses: ['', Validators.required],
  });

  // Inicialize o produtoId no momento da declaração da propriedade
  produtoId: string = '';
  isEditing = false; // Flag para indicar se é uma operação de edição

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private marcaService: MarcaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private location: Location,
    private mensagemService: MensagemService
  ) { }

  ngOnInit(): void {
    // Cria o formulário reativo
    this.createForm();
    // Verifica se a operação é uma edição e carrega os detalhes do produto, se necessário
    this.checkEditMode();

    this.carregarMarcas();
  }

  // Cria o formulário reativo usando FormBuilder
  createForm(): void {
    this.produtoForm = this.fb.group({
      id: ['', [Validators.required, this.numberValidator]],
      nome: ['', [Validators.required, this.stringValidator]],
      dataCompra: ['', [Validators.required, this.dateValidator]],
      duracaoGarantiaMeses: ['', [Validators.required, this.numberValidator]],
      dataFimGarantia: [null], // Defina como null para garantir que seja um objeto Date
      marcaId: ['1', Validators.required], // Padrão para 'Nenhuma'
    });
  }

  // Verifica se a operação é uma edição e carrega os detalhes do produto, se necessário
  checkEditMode(): void {
    this.route.params.pipe(
      switchMap((params) => {
        if (params['id']) {
          this.isEditing = true;
          this.produtoId = params['id'];
          // Retorna o Observable do produto correspondente ao ID
          // return this.produtoService.pesquisarPorId(this.produtoId);
          return this.produtoService.getProdutoById(params['id']);
        } else {
          // Se não houver ID, retorna um Observable vazio
          return [];
        }
      })
    ).subscribe((produto) => {
      // Preenche o formulário com os detalhes do produto se estiver em modo de edição
      if (this.isEditing && produto) {
        this.produtoForm.patchValue(produto);
      }
    });
  }

  private calcularDataFimGarantia(): Date | null {
    const dataCompra = this.produtoForm.value.dataCompra;
    const duracaoMeses = this.produtoForm.value.duracaoGarantiaMeses;

    if (dataCompra && duracaoMeses !== null && !isNaN(Number(duracaoMeses))) {
      return addMonths(new Date(dataCompra), duracaoMeses);
    }

    return null;
  }

  numberValidator(control: AbstractControl): ValidationErrors | null {
    if (isNaN(Number(control.value))) {
      return { invalidNumber: 'Por favor, insira um número válido.' };
    }
    return null;
  }

  stringValidator(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value !== 'string') {
      return { invalidString: 'Por favor, insira um texto válido.' };
    }
    return null;
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const date = new Date(control.value);
    if (isNaN(date.getTime())) {
      return { invalidDate: 'Por favor, insira uma data válida.' };
    }
    return null;
  }

  // Retorna a data mínima permitida para o Datepicker (20 anos atrás)
  getDateMin(): Date {
    const today = new Date();
    return new Date(today.getFullYear() - 20, today.getMonth(), today.getDate());
  }

  // Retorna a data máxima permitida para o Datepicker (ano atual)
  getDateMax(): Date {
    return new Date();
  }

  onCancel() {
    this.location.back();
  }

  onSubmit(): void {
    const dataFimGarantia = this.calcularDataFimGarantia();
    this.produtoForm.patchValue({ dataFimGarantia });

    if (dataFimGarantia && !isNaN(dataFimGarantia.getTime())) {
      const produto: Produto = this.produtoForm.value;

      if (this.isEditing) {
        produto.id = this.produtoId;
        this.produtoService.updateProduto(produto).subscribe(
          () => this.mensagemService.success('Produto alterado com sucesso!'),
          (error) => this.handleError('Erro ao atualizar o produto', error)
        );
      } else {
        this.produtoService.addProduto(produto).subscribe(
          () => this.mensagemService.success('Produto inserido com sucesso!'),
          (error) => this.handleError('Erro ao cadastrar o produto', error)
        );
      }
    } else {
      console.error('Data de fim de garantia inválida');
    }
  }


  carregarMarcas(): void {
    this.marcaService.getMarcas().subscribe(
      (marcas: Marca[]) => {
        this.marcas = marcas;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  private handleSuccess(message: string): void {
    this.snackBar.open(message, 'Fechar', {});
    this.dialog.closeAll();
  }

  private handleError(message: string, error: any): void {
    console.error(error);
    this.snackBar.open(message, 'Fechar', { duration: 10000 });
  }
}
