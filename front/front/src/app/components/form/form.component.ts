import { Component, OnInit } from '@angular/core';
import { FormModel } from 'src/app/models/form.model';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formM: FormModel;
  forms: any
  constructor(
    private formRest: FormService,
  ) { 
    this.formM = new FormModel('','','','','',0,'',new Date(),'','');

  }

  ngOnInit(): void {
    this.getForms();
  }

  form(registerForm: any) {
    this.formRest.form(this.formM).subscribe({
      next: (response: any) => {
        alert(response.message);
        
      },
      error: (err) => {
        registerForm.reset();
        return alert(err.error.message || err.error)
      }
    })
  }
  getForms() {
    this.formRest.getForm().subscribe({
      next: (res: any) => {
        this.forms = res.forms
      },
      error: (err) => {         
        return alert(err.error.message || err.error)
      }
    });
  }
}




