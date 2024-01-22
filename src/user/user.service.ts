import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import CreateUser from '../DTO/createUserDTO';
import UpdateUser from '../DTO/updateUserDTO';
import Signup from 'src/DTO/signup';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService

  ) { }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string): Promise<User> {
    const result = this.usersRepository.findOneBy({ email });
    return result
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  getAllUsers() {
    return this.usersRepository.find();
  }

  // RefreshTokens = [];
  async createUser(user: CreateUser) {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: string, user: UpdateUser) {
    try {
      const result = await this.usersRepository
        .createQueryBuilder()
        .update()
        .set({

          email: user.email,
          password: user.password,
          avatar: user.avatar,


        })
        .where('id = :id', { id })
        .execute();

      if (result.affected === 0) {
        return ('User not found');
      }

      return await this.usersRepository.findOne({
        where: { id }
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  deleteUser(id: string): Promise<any> {
    return this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute()
  }

  async signup(user: Signup) {
    const accountExists = await this.findOneByEmail(user.email);
    console.log(accountExists);
    if (accountExists) return ("User already exist");
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hashedPassword;
    const result = this.usersRepository.create(user);
    await this.usersRepository.save(result);
    return result;
  }

  async login(accountHolder: Signup) {
    try {
      const userExist = await this.findOneByEmail(accountHolder.email)
      if (!userExist) {
        return ('User not found')
      }

      const passwordMAtch = await bcrypt.compare(accountHolder.password, userExist.password)

      if (userExist && passwordMAtch) {
        const payloadAccess = { username: userExist.email, userId: userExist.id };
        const payloadRefresh = { userId: userExist.id };

        return {
          access_token: this.jwtService.sign(payloadAccess),
          refresh_token: this.jwtService.sign(payloadRefresh),
        }
      }

      else return ('Wrong Password')
    } catch (error) {
      console.log(error);
    }
  }
}

