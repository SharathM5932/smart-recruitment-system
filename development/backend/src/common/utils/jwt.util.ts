import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtil {
  constructor(private jwtService: JwtService) {}

  generateToken(payload: { id: string; email: string; role: string }) {
    return this.jwtService.sign(payload, {
      expiresIn: '12h',
    });
  }
}

// Usage: const token = this.jwtUtil.generateToken({ id: user.id, email: user.email, role: user.role });
