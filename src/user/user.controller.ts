import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import CreateUser from '../DTO/createUserDTO';
import Signup from '../DTO/signup';
import UpdateUser from '../DTO/updateUserDTO'
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  @Post()
  async createUser(@Body() user: CreateUser) {
    return this.userService.createUser(user);
  }
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUser) {
    return this.userService.updateUser(String(id), user);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id)
    return "User deleted"
  }

  @Post('/signup')
  async signup(@Body() user: Signup) {
    return this.userService.signup(user)
  }

  @Post('/login')
  async login(@Body() accountHolder: Signup) {
    return this.userService.login(accountHolder)
  }

  // @Delete('logout')
  // async logout(@Body() body: RefreshTokenDto) {
  //   return this.authService.logout(body.refreshToken);
  // }



}
