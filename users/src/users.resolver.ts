import { Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  users() {
    return this.usersService.findAll();
  }

  @ResolveField(() => String)
  fullName(@Parent() user: User) {
    return `${user.firstName} ${user.lastName}`;
  }
}
