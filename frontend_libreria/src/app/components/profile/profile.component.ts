import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public loggedIn:boolean = false;
//creamos actualUser
user!: any;

//constructor tipo auth
constructor(private auth:AuthService) { }


async ngOnInit(): Promise<void> {
  this.auth.authStatus.subscribe(async value =>{
    this.loggedIn = value;
    this.user = this.auth.getUser();
   this.user ? '' : this.user = await this.auth.getMe().toPromise();
}
  );
}

}
