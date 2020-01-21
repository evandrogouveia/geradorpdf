import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Certificado, Clientes, Produtos } from '../model/model';
import { CertificadoService } from '../services/certificado.service';

@Component({
  selector: 'app-pre-lingado',
  templateUrl: './pre-lingado.component.html',
  styleUrls: ['./pre-lingado.component.css']
})
export class PreLingadoComponent implements OnInit {
  certificado: Certificado = <Certificado>{};
  cliente: Clientes[];
  produto: Produtos[];

  cnpj_cliente: string;
  codigo: string;

  @ViewChild('opt') opt: ElementRef;
  @ViewChild('tipo') tipo: ElementRef;
  constructor(
    public certificadoService: CertificadoService,

  ) { }

  ngOnInit() {
    this.certificado = new Certificado();
    this.certificado.fator_seguranca = this.opt.nativeElement.target;
    this.certificadoService.getClientes().subscribe(data => {
      this.cliente = data;
    });
    this.certificadoService.getProdutos().subscribe(data => {
      this.produto = data;
    });
 
  }

  valor(event) {
      const carga = event.target.value;
      this.certificado.fator_vertical = (Math.floor(carga * this.certificado.fator_seguranca) + ' Toneladas');
      this.certificado.carga_basket = (carga * 2 + ' Toneladas');
      this.certificado.fator_basket = (Math.floor(carga * 2) * this.certificado.fator_seguranca + ' Toneladas');
      this.certificado.carga_chocker = (carga * 0.8) < 1 ? (carga * 0.8).toFixed(1)
        + ' Toneladas' : (Math.floor(carga * 0.8).toFixed(0) + ' Toneladas');
      this.certificado.fator_chocker = (Math.floor((carga * 0.8) * this.certificado.fator_seguranca).toFixed(0) + ' Toneladas');
  }
  eventCliente(event) {
    this.certificado.nome_cliente = event.target.value;
    this.cnpj_cliente = event.target.options[event.target.selectedIndex].text;
  }
  eventProduto(event) {
    this.certificado.descricao = event.target.value;
    this.codigo = event.target.options[event.target.selectedIndex].text;
  }
  limpaCampos() {
    this.certificado.carga_vertical = '';
    this.certificado.fator_vertical = '';
    this.certificado.carga_basket = '';
    this.certificado.carga_chocker = '';
    this.certificado.fator_basket = '';
    this.certificado.fator_chocker = '';
  }

  onSubmit() {
    this.certificado.cnpj_cliente = this.cnpj_cliente;
    this.certificado.codigo_produto = this.codigo;
    this.certificado.tipo = this.tipo.nativeElement.value;
    this.certificadoService.createCertificado(this.certificado).subscribe(data => {
      console.log(data);
    });
    this.certificado = new Certificado();
  }
}
