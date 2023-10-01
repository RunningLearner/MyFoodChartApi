import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto) {
    console.log(createUserDto);
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return `This action returns all user.`;
  }

  async findOne(email: FindOneOptions<User>) {
    return this.usersRepository.findOne(email);
  }

  async update(email: string, updateUserDto: UserDto) {
    return this.usersRepository.update(
      { email: email }, // 조건
      { name: updateUserDto.name }, // 업데이트 할 내용
    );
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
