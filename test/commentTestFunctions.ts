import * as request from 'supertest';

export const createComment = async (app, fakeToken, postId) => {
  return request(app.getHttpServer())
    .post('/comments/diet')
    .set('Authorization', `Bearer ${fakeToken}`)
    .send({ postId: postId, content: '댓글 내용' })
    .expect(201)
    .then((response) => {
      expect(response.body.id).toBeDefined();
      return response.body.id; // 생성된 댓글 ID 반환
    });
};

export const getComment = async (app, commentId) => {
  return request(app.getHttpServer())
    .get(`/comments/diet/${commentId}`)
    .expect(200)
    .then((response) => {
      expect(response.body).toBeDefined();
    });
};

export const updateComment = async (app, fakeToken, commentId) => {
  return request(app.getHttpServer())
    .patch(`/comments/diet/${commentId}`)
    .set('Authorization', `Bearer ${fakeToken}`)
    .send({ content: '수정된 댓글 내용' })
    .expect(200)
    .then((response) => {
      expect(response.body.content).toEqual('수정된 댓글 내용');
    });
};

export const deleteComment = async (app, fakeToken, commentId) => {
  return request(app.getHttpServer())
    .delete(`/comments/diet/${commentId}`)
    .set('Authorization', `Bearer ${fakeToken}`)
    .expect(200)
    .then((response) => {
      expect(response.text).toContain(`댓글 ID ${commentId}가 삭제되었습니다.`);
    });
};
