import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main-landing',
  templateUrl: './main-landing.component.html',
  styleUrls: ['./main-landing.component.css']
})
export class MainLandingComponent {
  form: FormGroup;

  constructor(
    private router: Router,
  ) {}

  send(){
    this.router.navigateByUrl("home/calculator");
  }

}
