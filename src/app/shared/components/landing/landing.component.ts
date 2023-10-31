import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from '../../../cargar-scripts.service'
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  year : number = new Date().getFullYear();
  active: boolean;
  constructor(
    private dataService: DataService,
    private _cargarScripts: CargarScriptsService,
    private router: Router,
  ) {
    _cargarScripts.carga(["animationsHeader"]);
  }


  ngOnInit() {

  }


}
