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

  create(createUserDto: UserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: FindOneOptions<User>) {
    return this.usersRepository.findOne(id);
  }

  update(id: number, updateUserDto: UserDto) {
    return this.usersRepository.update(
      { id: id }, // 조건
      { nickname: updateUserDto.nickname }, // 업데이트 할 내용
    );
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
