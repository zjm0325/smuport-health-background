import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { UserService } from 'src/app/services/user.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
    private userService: UserService, //HttpClient部分
    private notification: NzNotificationService,//登录成功或失败的提示框服务
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: ['admin', [Validators.required]],
      password: ['admin123', [Validators.required]],
      remember: [true]
    });
  }

  //跳出登录成功提示框
  createSuccessNotification(): void {
    this.notification.blank(
      '登录成功',
      '欢迎来到SMUPORT HEALTH!',

    );
  }

  //跳出登录失败提示框
  createFailureNotification(): void {
    this.notification.blank(
      '登录失败',
      '用户名或密码错误，请重新输入。'
    );
  }

  createNoPassedNotification(): void {
    this.notification.blank(
      '登录失败',
      '您的账号尚未通过审核，无法登录。'
    );
  }

  login() {
    const loginInfo = {
      username: this.validateForm.value.username,
      password: this.validateForm.value.password
    };


    //需要在这里判断得到的结果是什么，目前实现得到后台的response为2000则登录成功，目标是如果得到了token就跳转登录进去
    this.userService.login(loginInfo).subscribe((res) => {
      console.log('res',res)
      res.err_code == 2000 ?
        (res.data[0] ?
          (this.createSuccessNotification(), this.router.navigate(['/shell'])) : this.createNoPassedNotification()
        ) : this.createFailureNotification();
    }
    );
  }

}
