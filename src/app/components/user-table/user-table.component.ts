import { Component } from '@angular/core';
import { userStore } from '../../store/user.store';
import { selectAllEntities } from '@ngneat/elf-entities';
import { Observable } from 'rxjs';
import {AsyncPipe} from '@angular/common';
import { updateEntities } from '@ngneat/elf-entities';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  imports: [
    AsyncPipe
  ],
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  users$: Observable<any[]> = userStore.pipe(selectAllEntities());

  toggleActive(id: number) {
    userStore.update(
      updateEntities(id, (user: any) => ({ ...user, active: !user.active }))
    );
  }
}
