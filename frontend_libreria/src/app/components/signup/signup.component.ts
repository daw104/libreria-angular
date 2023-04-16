import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  form!: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router: Router

    ) {

    }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        name: '',
        email: '',
        password: ''

      });
  }

  submit(): void{
      // console.log(this.form.getRawValue());
      this.http.post('http://localhost:8000/api/register',this.form.getRawValue() )
      .subscribe(
        (res) =>{
        this.router.navigate(['login']),
        console.log(res);
      },
      (err) => {
        console.log(err)});
  }


}
