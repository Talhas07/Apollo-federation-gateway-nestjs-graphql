import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: '1', firstName: 'John', lastName: 'Doe' },
    { id: '2', firstName: 'Jane', lastName: 'Smith' },
  ];

  findAll() {
    return this.users;
  }

  findById(id: string) {
    return this.users.find((u) => u.id === id);
  }
}
