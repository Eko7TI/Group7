import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient

@Component({
  selector: 'app-resetsenha',
  templateUrl: './resetsenha.page.html',
  styleUrls: ['./resetsenha.page.scss'],
})
export class ResetsenhaPage implements OnInit {
  cnpj!: string; // Adicione esta linha
  resetForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private http: HttpClient // Injete o HttpClient
  ) {}

  ngOnInit() {
    this.resetForm = this.fb.group({
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(18)]]
    });
  }

  async resetPassword() {
    if (this.resetForm.valid) {
      const cnpj = this.resetForm.value.cnpj;
      const formData = new FormData();
      formData.append('cnpj', cnpj);

      this.http.post('https://app.grupoeko7.com.br/resetsenha.php', formData)
        .subscribe(
          async (response) => {
            const alert = await this.alertController.create({
              header: 'Sucesso',
              message: 'Um link de reset de senha foi enviado para o e-mail associado ao CNPJ informado.',
              buttons: ['OK']
            });

            await alert.present();
          },
          async (error) => {
            const alert = await this.alertController.create({
              header: 'Erro',
              message: 'Por favor, informe um CNPJ válido.',
              buttons: ['OK']
            });

            await alert.present();
          }
        );
    } else {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Deve inserir um CNPJ para continuar.',
        buttons: ['OK']
      });

      await alert.present();
    }
  }


  cnpjValidator(control: AbstractControl): ValidationErrors | null {
    const cnpj = control.value;
    if (!cnpj) return null;
    if (validaCNPJ(cnpj)) {
      return null;
    } else {
      return { invalidCNPJ: true };
    }
  }

  formatCNPJ(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const input = inputElement.value;
    const formatted = this.applyCNPJMask(input);
    inputElement.value = formatted;
  }

  applyCNPJMask(value: string): string {
    let rawValue = value.replace(/\D/g, ''); // Remove tudo que não é número
    if (rawValue.length > 14) rawValue = rawValue.substring(0, 14); // Limita a 14 dígitos

    if (rawValue.length === 15 && rawValue.startsWith('0')) {
      const potentialCNPJ = rawValue.substring(1);
      if (validaCNPJ(potentialCNPJ)) rawValue = potentialCNPJ;
    }

    return rawValue
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  }
}

function validaCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado !== parseInt(digitos.charAt(1))) return false;
  return true;
}
