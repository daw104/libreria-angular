import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  public loggedIn:boolean = false;
  Productos!: any;
  user!: any;

  constructor(
    private http: HttpClient,
    private auth:AuthService
    ) {}

  async ngOnInit(): Promise<void> {
    console.log(this.allProducts());
    this.user = this.auth.getUser();
    this.user ? '' : this.user = await this.auth.getMe().toPromise();
    console.log(this.user);

  }

  allProducts(): void {
    this.http.get('http://localhost:8000/api/products').subscribe((res) => {
      this.Productos = res;
      console.log(res);
    });
  }
}
