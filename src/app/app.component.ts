import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}
  title = environment.appName;
  storage = localStorage;
  isUserManager = false;
  roles = this.userService.getCurrentUserRoles();

  ngOnInit(): void {
  }

  logOut() {
    this.userService.logout().subscribe(() => this.router.navigateByUrl('/'));
  }
}
