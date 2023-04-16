import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private token: TokenService,
    private auth: AuthService
    ) {

    }



  ngOnInit(): void {
    this.form = this.formBuilder.group({
        email: '',
        password: '',

    });
  }

  submitLogin(): void{
    this.http.post('http://localhost:8000/api/login',this.form.getRawValue(), {withCredentials: true} )
    .subscribe(res =>{
      const resp: any = res;
      this.handleResponse(resp),
      console.log(resp);
      this.auth.setUser(resp.user);
    });
  }

  handleResponse(res:any){
    this.token.handle(res.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/')

  }


}
