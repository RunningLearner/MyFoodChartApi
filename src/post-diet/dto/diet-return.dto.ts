import { Comment } from 'src/comment/entities/comment.entity';
import { UserReturnDto } from '../../user/dto/user-return.dto';

export class DietReturnAllDto {
  id: string;
  date: string;
  createdAt: string;
  institute: string;
  recipeImg: string;
  whichSchool: string;
  menues: MenuReturnDto[];
  // 사용자의 고유아이디는 불필요
  user: Omit<UserReturnDto, 'id'>;

  static fromEntity(post: any): DietReturnAllDto {
    const userDto = UserReturnDto.fromEntity(post.user);
    const { id, ...userWithoutId } = userDto;

    return {
      id: post.id,
      date: post.date,
      createdAt: post.createdAt,
      institute: post.institute,
      recipeImg: post.recipeImg,
      whichSchool: post.whichSchool,
      menues: post.menues.map(MenuReturnDto.fromEntity),
      user: userWithoutId,
    };
  }
}

export class DietReturnDto {
  id: string;
  createdAt: string;
  date: string;
  institute: string;
  peopleNum: string;
  price: string;
  explanation: string;
  recipeFile: string;
  recipeImg: string;
  whichSchool: string;
  likes: number;
  menues: MenuReturnDto[];
  comments: Comment[];
  // 사용자의 고유아이디는 불필요
  user: Omit<UserReturnDto, 'id'>;

  static fromEntity(post: any, likes: number): DietReturnDto {
    const userDto = UserReturnDto.fromEntity(post.user);
    const { id, ...userWithoutId } = userDto;

    return {
      id: post.id,
      date: post.date,
      createdAt: post.createdAt,
      institute: post.institute,
      peopleNum: post.peopleNum,
      price: post.price,
      explanation: post.explanation,
      recipeFile: post.recipeFile,
      recipeImg: post.recipeImg,
      whichSchool: post.whichSchool,
      likes,
      menues: post.menues.map(MenuReturnDto.fromEntity),
      user: userWithoutId,
      comments: post.comments,
    };
  }
}

export class MenuReturnDto {
  id: number;
  menuName: string;
  isProductUsed: boolean;
  productName: string;
  productBrand: string;

  static fromEntity(menu: any): MenuReturnDto {
    return {
      id: menu.id,
      menuName: menu.menuName,
      isProductUsed: menu.isProductUsed,
      productName: menu.productName,
      productBrand: menu.productBrand,
    };
  }
}
