import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(private readonly bcryptService: BcryptService) {}

  async createUser(username: string, password: string): Promise<HttpMessageResponse> {
    const hashedPassword = await this.bcryptService.hashPassword(password);
    const response: HttpMessageResponse = {
      statusCode: 200,
      message:hashedPassword
    };
    return response;
  }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
interface HttpMessageResponse {
  statusCode: number;
  message: string;
}
