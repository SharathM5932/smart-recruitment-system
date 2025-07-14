import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   @Post('login')
  //   async login(@Body() loginDto: LoginDto) {
  //     const user = await this.authService.login(loginDto);

  //     return {
  //       status: 'success',
  //       statusCode: '',
  //       message: '',
  //       data: {},
  //       access_token: '',
  //     };
  //   }
}
