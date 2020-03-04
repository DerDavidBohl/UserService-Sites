import { Component, OnInit } from '@angular/core';
import { UserService, UserResponse } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  roles: string[];
  user: UserResponse;
  addRoleFormControl = new FormControl();

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userService.getUser(params.userId).subscribe(user => {
        this.user = user;
        this.reloadRoles();
      });
    });
  }

  reloadRoles() {
    this.userService.getRolesForUser(this.user.id).subscribe(roles => {
      this.roles = roles;
    });
  }

  addRole() {
    this.userService.addRoleToUser(this.user.id, this.addRoleFormControl.value).subscribe(() => {
      this.snackBar.open(`Added Role '${this.addRoleFormControl.value}' to ${this.user.name}.`, null, { duration: 2000 });
      this.addRoleFormControl.setValue('');
      this.reloadRoles();
    });
  }

  removeRole(role: string) {
    this.userService.removeRoleFromUser(this.user.id, role).subscribe(() => {
      this.snackBar.open(`Removed Role '${role}' from ${this.user.name}.`, null, { duration: 2000 });
      this.reloadRoles();
    });
  }

}
