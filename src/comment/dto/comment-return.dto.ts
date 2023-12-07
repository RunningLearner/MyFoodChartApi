export class CommentReturnDto {
  postId: string;
  id: string;
  username: string;
  content: string;
  createdAt: Date;

  static fromEntity(comment: any): CommentReturnDto {
    return {
      id: comment.id,
      createdAt: comment.createdAt,
      postId: comment.postId,
      content: comment.whichSchool,
      username: comment.user.username,
    };
  }
}
