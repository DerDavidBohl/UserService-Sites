import { Component, OnInit } from '@angular/core';
import { UserService, UserResponse } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: UserResponse[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              this.router.navigateByUrl('login');
              break;
            case 403:
              this.router.navigateByUrl('forbidden');
              break;
            default:
              break;
          }
        }
      })
  }

}
