import {
	Body
} from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import CreateUser from '../DTO/createUserDTO';
// import Signup from '../DTO/signup';
import UpdateUser from '../DTO/updateUserDTO';
import { User } from './user.entity';
import { UserService } from './user.service';

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

	// @Mutation(() => UpdateUser)
	// async updateUser(@Args({ name: 'id', type: () => String }) id: string, @Body() user: UpdateUser) {
	// 	return this.userService.updateUser(String(id), user);
	// }

	@Mutation(() => Boolean)
	async deleteUser(@Args({ name: 'id', type: () => String }) id: string) {
		await this.userService.deleteUser(id)
		return true
	}

	// @Mutation('/signup')
	// async signup(@Body() user: Signup) {
	// 	return this.userService.signup(user)
	// }

	// @Mutation('/login')
	// async login(@Body() accountHolder: Signup) {
	// 	return this.userService.login(accountHolder)
	// }

	// @Delete('logout')
	// async logout(@Body() body: RefreshTokenDto) {
	//   return this.authService.logout(body.refreshToken);
	// }
}
