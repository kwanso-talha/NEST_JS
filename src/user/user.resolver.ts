import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import CreateUser from '../DTO/createUserDTO';
import Signup from '../DTO/signup';
// import UpdateUser from '../DTO/updateUserDTO';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AccessUserPayload } from '../DTO/accessTokenDTO';

@Resolver('user')
export class UserResolver {
	constructor(private userService: UserService) { }

	@Query(() => [User])
	async getAllUsers(): Promise<Array<User>> {
		return await this.userService.getAllUsers();
	}

	@Mutation(() => User)
	async createUser(@Args('createUser') createUser: CreateUser): Promise<User> {
		return this.userService.createUser(createUser);
	}

	@Mutation(() => User)
	async signup(@Args('signup') signup: Signup): Promise<User> {
		return this.userService.signup(signup);
	}

	// @Mutation(() => UpdateUser)
	// async updateUser(@Args({ name: 'id', type: () => String }) id: string, @Body() user: UpdateUser) {
	// 	return this.userService.updateUser(String(id), user);
	// }

	@Mutation(() => Boolean)
	async deleteUser(@Args({ name: 'id', type: () => String }) id: string) {
		await this.userService.deleteUser(id)
		return true
	}

	@Mutation(() => AccessUserPayload)
	async login(@Args('login') login: Signup) {
		return this.userService.login(login);
	}
}
