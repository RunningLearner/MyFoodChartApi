import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserReturnDto } from './dto/user-return.dto';
import { UserDto } from './dto/user.dto';
import { User, UserRole } from './entities/user.entity';

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
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('해당 사용자를 찾을 수 없습니다.');
    }

    if (await this.isNicknameUnique(updateUserDto.nickname, user.id)) {
      return await this.usersRepository.update({ email }, updateUserDto);
    } else {
      throw new BadRequestException('중복된 닉네임입니다.');
    }
  }

  private async isNicknameUnique(
    nickname: string,
    userId: number,
  ): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { nickname } });
    return !user || user.id === userId; // 현재 유저의 닉네임이거나, 다른 유저가 사용하지 않은 경우 true 반환
  }

  async remove(id: number) {
    return await this.usersRepository.update({ id }, { role: UserRole.EXUSER });
  }

  async findMe(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return UserReturnDto.fromEntity(user);
  }
}
