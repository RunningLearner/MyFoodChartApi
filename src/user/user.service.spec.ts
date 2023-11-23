import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';
import { FindOneOptions } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let mockRepository: any;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('유저 서비스 테스트', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('유저 생성', async () => {
      const userDto: UserDto = {
        name: 'test-nickname',
        email: 'test@email.com',
      };

      mockRepository.create.mockReturnValue(userDto);

      service.create(userDto);
      // create 메서드가 올바른 파라미터로 호출되었는지 확인
      expect(mockRepository.create).toHaveBeenCalledWith(userDto);
    });
  });

  describe('findOne', () => {
    it('이메일을 통해서 유저를 검색', async () => {
      const user: User = new User();

      user.id = 1;
      user.email = 'test@email.com';
      user.name = 'test-nickname';

      mockRepository.findOne.mockReturnValue(Promise.resolve(user));

      // findOne 호출
      const result = await service.findOne(user.email);

      expect(result).toEqual(user);

      // findOne 메서드가 올바른 파라미터로 호출되었는지 확인
      expect(mockRepository.findOne).toHaveBeenCalledWith(user.email);
    });
  });

  describe('update', () => {
    it('업데이트가 올바른 인자를 가지는가', async () => {
      const userDto: UserDto = {
        name: 'updated-nickname',
        email: 'test@email.com',
      };
      mockRepository.update.mockReturnValue(Promise.resolve());

      // Execute
      await service.update('test@email.com', userDto);

      // Validate
      expect(mockRepository.update).toHaveBeenCalledWith(
        { email: 'test@email.com' },
        { name: 'updated-nickname' },
      );
    });
  });
});
