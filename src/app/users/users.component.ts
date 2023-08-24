import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { User } from '../User';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userModel = new User();
  usersList: any = [];
  updated: boolean = false;
  updatedId: any;
  constructor(private commonService: CommonService, private router: Router) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers() {
    this.commonService.getAllUsers().subscribe((data) => {
      this.usersList = data;
    });
  }
  submitForm(userForm: any) {
    if (this.updated) {
      alert('updated');
    } else {
      alert('Added');
    }
    this.commonService
      .addNewUser(this.userModel, this.updated, this.updatedId)
      .subscribe((data) => {
        userForm.reset();
        this.getAllUsers();
      });
  }
  deleteUserById(id: any) {
    this.commonService.deleteUserById(id).subscribe((data) => {
      alert('deleted' + id);
      this.getAllUsers();
    });
  }
  editUserById(id: any) {
    this.commonService.getUserById(id).subscribe((data) => {
      // alert('edit successfully');

      this.userModel.moblie = data.moblie;
      this.userModel.name = data.name;
      this.userModel.email = data.email;
      this.userModel.age = data.age;
      this.updated = true;
      this.updatedId = id;
    });
  }
}
