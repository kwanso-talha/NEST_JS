require('dotenv').config();

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Post } from '../post/post.entity';
import { Comment } from '../comment/comment.entity';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      synchronize: true,
      host: this.getValue('POSTGRES_HOST'),
      password: this.getValue('POSTGRES_PASSWORD'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      database: this.getValue('POSTGRES_DATABASE'),
      username: this.getValue('POSTGRES_USERNAME'),
      entities: [User, Comment, Post],
      migrations: ['src/migration/*.ts'],
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USERNAME',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };
