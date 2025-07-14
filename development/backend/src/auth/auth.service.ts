import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor() {}

  //   async login(loginDto: LoginDto) {
  //     const { email, password } = loginDto;

  //     const existingUser = await

  //     if (!existingUser) {
  //       throw new UnauthorizedException('User not found');
  //     }

  //     const isPasswordMatch = await bcrypt.compare(
  //       password,
  //       existingUser?.password,
  //     );

  //     if (!isPasswordMatch) {
  //       throw new UnauthorizedException('Invalid Password');
  //     }

  //     const payload = {
  //       sub: existingUser._id,
  //       username: existingUser.username,
  //       email: existingUser.email,
  //     };

  //     const token = this.jwtService.sign(payload);

  //     delete existingUser.password;

  //     return { existingUser, token };
  //   }
}
