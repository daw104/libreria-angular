import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-actualizar-productos',
  templateUrl: './actualizar-productos.component.html',
  styleUrls: ['./actualizar-productos.component.css']
})
export class ActualizarProductosComponent implements OnInit {
 //creamos Petcion
 producto!: any;
 selectedImage!: any;

 id!: any;
 title = '';
 description = '';
 price = '';
 quantity= '';
 file = '';

 //constructor tipo auth
 constructor(
   private http: HttpClient,
   private router: Router,
   private route: ActivatedRoute,
   private token: TokenService,
 ) {
   (this.id = this.route.snapshot.paramMap.get('id')), console.log(this.id);
 }

 ngOnInit(): void {
   this.getRecord(this.id);
 }

 getRecord(id: any) {
   const token = this.token.get();
   const httpOptions = {headers:new HttpHeaders({
     Authorization:`Bearer ${token}`
   })}

   return this.http
     .get('http://127.0.0.1:8000/api/products/' + id, httpOptions)
     .subscribe((res) => {
       console.log(res);
       this.producto = res;

       // ASIGNAMOS LOS VAROLES DEL FORMULARIO
       this.title = this.producto.title;
       this.description = this.producto.description;
       this.price = this.producto.price;
       this.quantity = this.producto.quantity;
       this.file = this.producto.file;

       console.log(this.producto);
     });
 }

 updateProducto() {
   const token = this.token.get();
   const httpOptions = {headers:new HttpHeaders({
     Authorization:`Bearer ${token}`
   })}

   // body que recive el servicio
   const body = {
     title: this.producto.title,
     description: this.producto.description,
     price: this.producto.price,
     quantity: this.producto.quantity,
     file: this.producto.selectedImage

   };

   // controlo que los campos no vengan vacios
   if(body.title == '' || body.description == '' || body.price == '' || body.quantity == '' ){
     alert("Debe rellenar todos los campos para actualizar la peticion");
     return;
   }

   httpOptions.headers.append('Content-Type', 'multipart/form-data'),
   httpOptions.headers.append('Accept', 'application/json'),

   // envio la petcion
    this.http
     .put('http://127.0.0.1:8000/api/product/update/' + this.id, body, httpOptions)
     .subscribe((res) => {
       console.log(res);
       this.router.navigateByUrl('/admin-productos');
     });
 }


// ** Evento para seleccionar las imagenes
onSelectImage(event: any) {
  this.selectedImage = event.target.files[0];
}

}
