import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { BeforeLoginService } from './services/before-login.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AfterLoginService } from './services/after-login.service';
import { LoginComponent } from './components/login/login.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SubirProductosComponent } from './components/subir-productos/subir-productos.component';
import { AdminProductosComponent } from './components/admin-productos/admin-productos.component';
import { ActualizarProductosComponent } from './components/actualizar-productos/actualizar-productos.component';



const appRoutes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path: 'register',
    component: SignupComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate : [AfterLoginService]
  },

  {
    path: 'productos',
    component: ProductosComponent
  },

  {
    path: 'subir-productos',
    component: SubirProductosComponent,
    canActivate : [AfterLoginService]
  },

  {
    path: 'admin-productos',
    component: AdminProductosComponent,
    canActivate : [AfterLoginService]
  },

  {
    path: 'update/:id',
    component: ActualizarProductosComponent,
    canActivate : [AfterLoginService]
  },

]




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
