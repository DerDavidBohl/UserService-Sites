import { Component, OnInit } from '@angular/core';
import { UserService, UserResponse } from '../user.service';
import { throwToolbarMixedModesError } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: UserResponse;
  roles: string[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.currentUser = user;
    },
    (error) => {
      this.router.navigateByUrl('/login');
    });

    this.userService.getCurrentUserRoles().subscribe(roles => {
      this.roles = roles;
    })
  }

}
