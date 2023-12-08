export class UserReturnDto {
  id: string;
  email: string;
  nickname: string;
  isNutritionist: boolean;

  static fromEntity(user: any): UserReturnDto {
    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      isNutritionist: user.isNutritionist,
    };
  }
}
