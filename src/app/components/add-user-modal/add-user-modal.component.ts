
import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AsyncValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
  FormGroup
} from '@angular/forms';
import { userStore } from '../../store/user.store';
import { selectAllEntities, addEntities } from '@ngneat/elf-entities';
import { Observable, timer, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./add-user-modal.component.scss']
})
export class AddUserModalComponent {
  users$: Observable<any[]> = userStore.pipe(selectAllEntities());
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', {
        validators: [Validators.required],
        asyncValidators: [this.uniqueNameValidator()],
        updateOn: 'blur'
      }]
    });
  }

  uniqueNameValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return timer(500).pipe(
        switchMap(() => this.users$),
        map(users => users.some(u => u.name === control.value) ? { notUnique: true } : null)
      );
    };
  }

  createUser() {
    const name = this.form.value.name;
    if (!name) return;

    userStore.update(store => ({
      ...store,
      lastId: store.lastId + 1
    }));
    userStore.update(addEntities({ id: userStore.getValue().lastId, name, active: false }));
  }

}
