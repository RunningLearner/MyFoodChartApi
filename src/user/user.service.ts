import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserReturnDto } from './dto/user-return.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: UserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return UserReturnDto.fromEntity(newUser);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => UserReturnDto.fromEntity(user));
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    return UserReturnDto.fromEntity(user);
  }

  async update(email: string, updateUserDto: UpdateUserDTO) {
    return await this.usersRepository.update(
      { email }, // 조건
      updateUserDto, // 업데이트 할 내용
    );
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findMe(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return UserReturnDto.fromEntity(user);
  }
}
