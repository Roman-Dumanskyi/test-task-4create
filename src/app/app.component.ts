import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserTableComponent} from './components/user-table/user-table.component';
import {AddUserModalComponent} from './components/add-user-modal/add-user-modal.component';
import {AsyncPipe} from '@angular/common';
import {map} from 'rxjs';
import {selectAllEntities} from '@ngneat/elf-entities';
import {userStore} from './store/user.store';

@Component({
  selector: 'app-root',
  imports: [UserTableComponent, AddUserModalComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  modalOpen = false;

  canAddUser$ = userStore.pipe(
    selectAllEntities(),
    map(users => users.length < 5 && users.every(u => u.active))
  );

  openAddUserModal() {
    this.modalOpen = true;
  }

  closeAddUserModal() {
    this.modalOpen = false;
  }
}
