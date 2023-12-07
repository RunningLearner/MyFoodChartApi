export class DietReturnAllDto {
  id: string;
  createdAt: string;
  institute: string;
  recipeImg: string;
  whichSchool: string;
  menues: MenuReturnDto[];
  user: UserReturnDto;

  static fromEntity(post: any): DietReturnAllDto {
    return {
      id: post.id,
      createdAt: post.createdAt,
      institute: post.institute,
      recipeImg: post.recipeImg,
      whichSchool: post.whichSchool,
      menues: post.menues.map(MenuReturnDto.fromEntity),
      user: UserReturnDto.fromEntity(post.user),
    };
  }
}

export class DietReturnDto {
  id: string;
  createdAt: string;
  institute: string;
  peopleNum: string;
  price: string;
  explanation: string;
  recipeFile: string;
  recipeImg: string;
  whichSchool: string;
  menues: MenuReturnDto[];
  user: UserReturnDto;

  static fromEntity(post: any): DietReturnDto {
    return {
      id: post.id,
      createdAt: post.createdAt,
      institute: post.institute,
      peopleNum: post.peopleNum,
      price: post.price,
      explanation: post.explanation,
      recipeFile: post.recipeFile,
      recipeImg: post.recipeImg,
      whichSchool: post.whichSchool,
      menues: post.menues.map(MenuReturnDto.fromEntity),
      user: UserReturnDto.fromEntity(post.user),
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

export class UserReturnDto {
  email: string;
  name: string;
  isNutritionist: boolean;

  static fromEntity(user: any): UserReturnDto {
    return {
      email: user.email,
      name: user.name,
      isNutritionist: user.isNutritionist,
    };
  }
}
