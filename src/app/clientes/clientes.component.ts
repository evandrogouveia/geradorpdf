import { Component, OnInit, TemplateRef } from '@angular/core';
import { CertificadoService } from '../services/certificado.service';
import { Clientes } from '../model/model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  cliente: Clientes = new Clientes();
  clientes: Clientes[];
  modalRef: BsModalRef;
  constructor(public certificadoService: CertificadoService, private modalService: BsModalService) { }

  ngOnInit() {
    this.listaClientes();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  listaClientes() {
    this.certificadoService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  adicionaCliente() {
    this.certificadoService.createCliente(this.cliente).subscribe((data: {}) => {
      this.modalRef.hide();
      this.cliente = new Clientes();
      this.listaClientes();
    });
  }

  excluirCliente(id) {
    if (window.confirm('Deseja excluir este Cliente?')) {
      this.certificadoService.deletaCliente(id).subscribe(data => {
        this.listaClientes();
      });
    }
  }

}
