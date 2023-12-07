export class UserReturnDto {
  id: string;
  email: string;
  name: string;
  isNutritionist: boolean;

  static fromEntity(user: any): UserReturnDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isNutritionist: user.isNutritionist,
    };
  }
}
