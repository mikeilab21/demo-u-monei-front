import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,)
    {
      this.loginForm();
    }

  ngOnInit() {

  }

  loginForm(){
    this.formLogin = this.formBuilder.group({
      email: ['', null],
      pass: ['', null],
      check: ['', null],
    })
  }
  send(elemento){

  }
}
