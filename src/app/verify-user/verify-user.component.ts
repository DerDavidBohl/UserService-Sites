import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  success: boolean = false;
  failure: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!params.token || !params.email) {
        this.failure = true;
        return;
      }

      this.userService.verifyUser(params.email, params.token).subscribe(next => {
        this.success = true;
        this.failure = false;
      }, (err) => {
        this.success = false;
        this.failure = true;
      },);
    });
  }

}
