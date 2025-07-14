import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserHelper {
  constructor(private readonly userRepo: Repository<User>) {}

  async ensureUserExistsByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);
    return user;
  }
}

// Usage: await this.userHelper.ensureEmailNotTaken(dto.email);
