import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  create() {
    this.userService.createUser({email: this.emailFormControl.value, password: this.passwordFormControl.value, name: this.nameFormControl.value}).subscribe(res => {
      console.log(res.headers.keys());
      this.router.navigateByUrl(`/users/${res.headers.get('location')}`);
    })
  }

}
