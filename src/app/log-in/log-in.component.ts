import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserService, UserResponse } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  applicationName: string = 'Anwendung';
  currentUser: UserResponse;
  isApplicationLogin: boolean = false;
  isAdministrationLoging: boolean = false;
  redirectUrl: string;
  applicationId: string;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {

    this.userService.getCurrentUser().subscribe(user => this.currentUser = user);

    this.route.queryParams.subscribe((params) => {
      if (params.redirect_url && params.application_id) {
        this.applicationId = params.application_id;
        this.redirectUrl = params.redirect_url
        this.isApplicationLogin = true;
        this.isAdministrationLoging = false;

        this.userService.getUserById(this.applicationId).subscribe(user => this.applicationName = user.name);
      } else {
        this.isApplicationLogin = false;
        this.isAdministrationLoging = true;
      }
    });
  }

  loginAdministartion() {
    this.userService.login(this.emailFormControl.value, this.passwordFormControl.value).subscribe(
      () => {
        this.router.navigateByUrl('/profile');
      },
      err => {
        this.snackBar.open('Email oder Passwort falsch!', null, { duration:2000})
      });

  }

  loginApplication() {

    if(!this.currentUser) {
      this.userService.login(this.emailFormControl.value, this.passwordFormControl.value).subscribe(
        () => {
          window.location.reload();
        },
        err => {
          this.snackBar.open('Email oder Passwort falsch!', null, { duration:2000})
        });
    } else {
      this.createCode();
    }

  }

  createCode() {

    this.userService.createAuthCode(this.applicationId).subscribe((code) => {
      window.location.href = `${this.redirectUrl}?code=${code.code}`;
    });
  }
}

export enum LoginMode {
  Administration,
  Application
}
