import { createStore, withProps } from '@ngneat/elf';
import { withEntities, setEntities } from '@ngneat/elf-entities';

export interface User {
  id: number;
  name: string;
  active: boolean;
}

export const userStore = createStore(
  { name: 'users' },
  withEntities<User>(),
  withProps<{ lastId: number }>({ lastId: 3 })
);

userStore.update(
  setEntities([
    { id: 1, name: 'Alice', active: true },
    { id: 2, name: 'Bob', active: true },
    { id: 3, name: 'Charlie', active: false }
  ])
);
