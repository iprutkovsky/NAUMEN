import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserData } from './services/user-data';
import { UserLayout } from './services/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  currentLanguage: string = 'eng';
  currentUserData: string = '';
  currentUserIdx: number = -1;  
  extraInfoStatus: boolean = false;
  searchField: string = '';  
  userDataLayout: any = {
    extraInfoField: 'User information',
    mainTitle: 'Users',
    sortUsers: {
      'all': 'All',
      'active': 'Active',
      'inactive': 'Inactive'
    }
  };
  users: UserLayout[] = [];
  usersDataList: UserLayout[] = [];  

  constructor(
    private userData: UserData
  ) { };

  ngOnInit(): void {
    this.userData.getUsers().subscribe((data: any) => {
      this.usersDataList = data;
      this.users = this.usersDataList.filter((v: UserLayout) => v['active']);
    });
  }

  extraInfo(idx: number): void {
    this.currentUserData = this.users[idx].email;
    this.currentUserIdx = idx;
    this.extraInfoStatus = true;
  }

  resetData(): void {
    this.currentUserIdx = -1;
    this.currentUserData = '';
    this.extraInfoStatus = false;    
  }

  searchInUserList(): void {
    this.currentUserIdx = -1;
    this.extraInfoStatus = false;
    this.users = this.usersDataList.filter((v: UserLayout) => v['name'].includes(this.searchField));
  }

  swichLanguageSetting(evt: any): void {
    const engSet: string[] = ['All', 'Active', 'Inactive'];
    const rusSet: string[] = ['Все', 'Активные', 'Неактивные'];

    evt = evt.target.value;
    this.resetData();

    this.currentLanguage = evt == 'eng' ? 'eng' : 'rus';
    this.userDataLayout.extraInfoField = evt == 'eng' ? 'User information' : 'Данные пользователя';
    this.userDataLayout.mainTitle = evt == 'eng' ? 'Users' : 'Пользователи';
    Object.keys(this.userDataLayout.sortUsers).map((v: string, i: number) => this.userDataLayout.sortUsers[v] = evt == 'eng' ? engSet[i] : rusSet[i]);
  }

  swichUserList(evt: string): void {
    this.resetData();
    this.searchField = '';
    switch (evt) {
      case 'all':
        this.users = this.usersDataList;
        break;
      case 'active':
        this.users = this.usersDataList.filter((v: any) => v['active']);
        break;
      case 'inactive':
        this.users = this.usersDataList.filter((v: any) => !v['active']);
        break;
    }
  }
}