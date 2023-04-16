import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-subir-productos',
  templateUrl: './subir-productos.component.html',
  styleUrls: ['./subir-productos.component.css'],
})
export class SubirProductosComponent implements OnInit  {
  form!: FormGroup;

  //creamos actualUser
  user!: any;
  selectedImage!: any;
  public loggedIn:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private token: TokenService,
    private auth: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      title: '',
      price: '',
      description: '',
      quantity: '',
      file: '',
    });

    this.auth.authStatus.subscribe(async value =>{
      this.loggedIn = value;
      this.user = this.auth.getUser();
     this.user ? '' : this.user = await this.auth.getMe().toPromise();
  }
    );

  }

  submitPeticion() {
    const formData = new FormData();
    const values = this.form.getRawValue();
    formData.append('title', values.title);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('quantity', values.quantity);
    formData.append('file', this.selectedImage);

    const token = this.token.get();
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };

 // controlo que los campos no vengan vacios
 if(values.title == '' || values.description == '' || values.price == '' || values.quantity == '' || values.selectedImage == '' ){
  alert("Debes rellenar todos los campos para subir el producto");
  return;
}

    httpOptions.headers.append('Content-Type', 'multipart/form-data'),
    httpOptions.headers.append('Accept', 'application/json'),
    console.log(this.form.getRawValue());
    this.http
      .post('http://127.0.0.1:8000/api/product', formData, httpOptions)
      .subscribe(
        (res) => {
          const resp: any = res;
          this.router.navigate(['/admin-productos']),
          console.log(resp);
        },
        (err) => console.log(err)
      );
  }

  // ** Evento para seleccionar las imagenes
  onSelectImage(event: any) {
    this.selectedImage = event.target.files[0];
  }
}
