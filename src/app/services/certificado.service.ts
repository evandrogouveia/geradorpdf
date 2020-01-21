import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Certificado, Clientes, Produtos } from '../model/model';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
// ============================= API CLIENTES ================================
  getClientes() { 
    return this.http.get<Clientes[]>(this.apiURL + '/clientes');
  }

  getCliente(id): Observable<Clientes> {
    return this.http.get<Clientes>(this.apiURL + '/clientes/:' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  createCliente(cliente: Clientes) {
    return this.http.post<Clientes>(this.apiURL + '/clientes', JSON.stringify(cliente), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deletaCliente(id) {
    return this.http.delete<Clientes>(this.apiURL + '/clientes/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

// ============================= API PRODUTOS ================================
  getProdutos() { 
    return this.http.get<Produtos[]>(this.apiURL + '/produtos');
  }

// ============================= API CERTIFICADOS ================================
  createCertificado(certificado: Certificado) {
    return this.http.post<Certificado>(this.apiURL + '/certificados', JSON.stringify(certificado), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
