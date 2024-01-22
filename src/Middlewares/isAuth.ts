import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {

  constructor(private jwtService: JwtService) { }

  use(req: any, res: Response, next: () => void) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
      throw new BadRequestException('Auth token is not supplied')
    try {
      const decoded = this.jwtService.verify(token);
      req.body.userId = decoded.userId;
      next();
    } catch (error) {
      throw new BadRequestException('Auth token is expired')
    }
  }
}