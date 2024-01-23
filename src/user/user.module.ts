import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessStrategy } from '../jwt.acces.strategy';
import { JwtRefreshStrategy } from '../jwt.refresh.strategy'
import { MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthenticationMiddleware } from '../Middlewares/isAuth'
import { UserResolver } from './user.resolver';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: "jwt" }),

  JwtModule.register({
    signOptions: { expiresIn: '120s' },
    secret: process.env.ACCESS_TOKEN_SECRET || 'secret',
  }),

  JwtModule.register({
    secret: process.env.REFRESH_TOKEN_SECRET || 'secret',
  }),

    PassportModule,
  ],
  // controllers: [UserController],
  providers: [UserService, JwtAccessStrategy, JwtRefreshStrategy, UserResolver],
  exports: [UserService]
})

export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: 'post', method: RequestMethod.POST });
  }
}
