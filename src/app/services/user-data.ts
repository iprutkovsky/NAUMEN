import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as usersData from '../../assets/mock-data.json';

@Injectable({
  providedIn: 'root'
})
export class UserData {

  data: any = usersData;

  getUsers(): Observable<any> {
    return of(usersData.users);
  }
}