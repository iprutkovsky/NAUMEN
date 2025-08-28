import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserData } from './services/user-data';
import { UserLayout, languageLayout } from './services/common';

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
  languageLayout: any = languageLayout;
  searchField: string = '';  
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
    evt = evt.target.value;
    this.resetData();
    this.currentLanguage = evt == 'eng' ? 'eng' : 'rus';    
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