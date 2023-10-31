import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class UserUpdateService {
  private userDeletedSource = new Subject<void>();

  userDeleted$ = this.userDeletedSource.asObservable();

  notifyUserDeleted() {
    this.userDeletedSource.next();
  }
}
