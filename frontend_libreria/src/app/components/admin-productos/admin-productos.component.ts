import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrls: ['./admin-productos.component.css'],
})
export class AdminProductosComponent implements OnInit {
  public loggedIn: boolean = false;
  ProductosAdmin!: any;
  user!: any;

  constructor(
    private http: HttpClient,
     private auth: AuthService,
     private token: TokenService,
     ) {}

  async ngOnInit(): Promise<void> {
    console.log(this.allProducts());
    this.user = this.auth.getUser();
    this.user ? '' : (this.user = await this.auth.getMe().toPromise());
    console.log(this.user);
  }

  //**Todos los Productos 
  allProducts(): void {
    this.http.get('http://localhost:8000/api/products').subscribe((res) => {
      this.ProductosAdmin = res;
      console.log(res);
    });
  }

  //**eliminar producto
  deleteData(id:any){
    const token = this.token.get();
    console.log(token);
    const httpOptions = {headers:new HttpHeaders({
      Authorization:`Bearer ${token}`
    })}
    this.http.delete('http://localhost:8000/api/product/delete/' + id, httpOptions )
    .subscribe(res=>{
      this.ProductosAdmin = res;
      alert(`Eliminaste el Producto: ${this.ProductosAdmin.title}`);

      // recorremos nuestras peticiones para poder eliminarle del array del front y asi poder recargar la pagina sin la peticion
      for (let i = 0; i <  this.ProductosAdmin.length; i++) {
        if (this.ProductosAdmin[i]==this.ProductosAdmin) {
            this.ProductosAdmin[i].pop();
        }
      }
      this.allProducts();
      console.log(res);
    });
  }
}
