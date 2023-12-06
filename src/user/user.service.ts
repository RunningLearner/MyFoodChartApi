import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(email: string, updateUserDto: UserDto) {
    return this.usersRepository.update(
      { email }, // 조건
      { name: updateUserDto.name }, // 업데이트 할 내용
    );
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findMe(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }
}
