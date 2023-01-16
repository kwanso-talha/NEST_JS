import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from '../jwt.acces.strategy';
import { JwtRefreshStrategy } from '../jwt.refresh.strategy'

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: "jwt" }),

  JwtModule.register({
    signOptions: { expiresIn: '5000s' },
    secret: process.env.ACCESS_TOKEN_SECRET || 'secret',
  }),
  JwtModule.register({
    signOptions: { expiresIn: '7d' },
    secret: process.env.REFRESH_TOKEN_SECRET || 'secret',
  }),

    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [UserService]
})
export class UserModule { }
