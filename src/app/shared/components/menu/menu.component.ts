import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public isClassEnabled = false;
  showNotifications = false;
  items : MenuItem[];
  displaySidebar = false;

  constructor(){

  }

  ngOnInit() {

}


  efectos(){
    this.isClassEnabled = !this.isClassEnabled;
}
}
