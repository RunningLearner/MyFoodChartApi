export class UserReturnDto {
  id: string;
  email: string;
  nickname: string;
  isNutritionist: boolean;
  userImg: string;

  static fromEntity(user: any): UserReturnDto {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      userImg: user.userImg,
      isNutritionist: user.isNutritionist,
    };
  }
}
