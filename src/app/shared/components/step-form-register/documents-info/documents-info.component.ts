import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DocumentsService } from 'src/app/services/apiDocuments/documents.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-documents-info',
  templateUrl: './documents-info.component.html',
  styleUrls: ['./documents-info.component.css']
})
export class DocumentsInfoComponent implements OnInit {

  uploadedFilesPersonal: any[] = [];
  uploadedFilesFinance: any[] = [];
  uploadedFilesLegal: any[] = [];
  typeClient: any;
  nameClient : string = '';
  nameCompany : string = '';
  files: File[] = []; // Variable to store all uploaded files
  showUploadedFilesList: boolean = false;
  // Variables para rastrear el número de archivos cargados en cada campo
  numUploadedFilesPersonal: number = 0;
  numUploadedFilesFinance: number = 0;
  numUploadedFilesLegal: number = 0;
  // Número máximo de archivos permitidos en cada categoría
  maxFilesPersonal: number = 4;
  maxFilesFinance: number = 5;
  maxFilesLegal: number = 3;
  
  

  constructor(
    private messageService: MessageService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private documentsService: DocumentsService,
    private http: HttpClient
  ) {
    this.typeClient = this.localStorageService.getItem('optClient');
    this.nameClient = this.localStorageService.getItem('NameClient');
    this.nameCompany = this.localStorageService.getItem('nameCompany');

  }

  ngOnInit(): void {
  }

  handleFileSelect(event: any): void {
    const files = event?.files;

    if (files && files.length > 0) {
      this.files = Array.from(files)
    }
  }
      

  backPage() {
    if (this.typeClient !== 'juridica') {
      this.router.navigateByUrl('/solicitud-persona-natural/referencias');
    } else {
      this.router.navigateByUrl('/solicitud-empresa/referencias');
    }
  }

  onUpload1(event: UploadEvent) {
    // Verificar si se excede el límite de archivos en doc1[]
    if (event.files.length <= this.maxFilesPersonal) {
      // Actualizar el número de archivos cargados en doc1[]
      this.numUploadedFilesPersonal = event.files.length;
      this.handleUploadEvent(event, 'uploadedFilesPersonal');
    } else {
      // Mostrar un mensaje de error si se excede el límite
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Se permiten como máximo ${this.maxFilesPersonal} archivos en Documentos Personales.`,
      });
    }
  }

  onUpload2(event: UploadEvent) {
    // Verificar si se excede el límite de archivos en doc2[]
    if (event.files.length <= this.maxFilesFinance) {
      // Actualizar el número de archivos cargados en doc2[]
      this.numUploadedFilesFinance = event.files.length;
      this.handleUploadEvent(event, 'uploadedFilesFinance');
    } else {
      // Mostrar un mensaje de error si se excede el límite
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Se permiten como máximo ${this.maxFilesFinance} archivos en Documentos Financieros.`,
      });
    }
  }

  onUpload3(event: UploadEvent) {
    // Verificar si se excede el límite de archivos en doc3[]
    if (event.files.length <= this.maxFilesLegal) {
      // Actualizar el número de archivos cargados en doc3[]
      this.numUploadedFilesLegal = event.files.length;
      this.handleUploadEvent(event, 'uploadedFilesLegal');
    } else {
      // Mostrar un mensaje de error si se excede el límite
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Se permiten como máximo ${this.maxFilesLegal} archivos en Documentos Legales.`,
      });
    }
  }

  private handleUploadEvent(event: UploadEvent, targetProperty: string) {
    for (let file of event.files) {
      this[targetProperty].push(file);
      this.files.push(file);
    }

    this.messageService.add({ severity: 'info', summary: 'Archivos cargados satisfactoriamente', detail: '' });
  }

  showUploadedFiles() {
    this.showUploadedFilesList = !this.showUploadedFilesList;
  }

  sendDataDocuments() {
    if (this.files.length > 0) {
      const formData = new FormData();
      this.files.forEach((file) => {
        formData.append('files', file, file.name);
      });
  
      // Definir el nombre de la carpeta según el tipo de cliente
      const folderName = this.typeClient === 'juridica' ? this.nameCompany : this.nameClient;
  
      // Enviar el nombre de la carpeta al backend
      formData.append('folderName', folderName);
  
      this.http.post('http://localhost:3000/api/upload', formData).subscribe(
        (response) => {
          console.log('Archivos subidos con éxito', response);
        },
        (error) => {
          console.error('Error subiendo los archivos', error);
        }
      );
    }

    // Validar el número mínimo de archivos en cada campo
    if (
      this.numUploadedFilesPersonal >= 1 &&
      this.numUploadedFilesFinance >= 1 &&
      this.numUploadedFilesLegal >= 1
    ) {
      // Redirigir según el tipo de cliente
      if (this.typeClient !== 'juridica') {
        setTimeout(() => this.router.navigateByUrl('/solicitud-persona-natural/revision-simulador'), 500);
      } else {
        setTimeout(() => this.router.navigateByUrl('/solicitud-empresa/revision-simulador'), 500);
      }
    } else {
      // Mostrar un mensaje de error si no se cumple el número mínimo
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debe cargar al menos un archivo en cada categoría.',
      });
    }
  }
}
