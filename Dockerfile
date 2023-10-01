# 베이스 이미지 설정. Node.js 버전을 명시합니다.
FROM node:lts

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 패키지.json과 패키지-lock.json 또는 yarn.lock 파일을 복사
COPY package*.json ./

# 프로젝트 의존성 설치
RUN npm install

# 프로젝트 코드와 리소스 복사
COPY . .

# 서버가 사용할 포트 번호 설정 (NestJS 기본값은 3000)
EXPOSE 3001

# 실행할 명령어 설정
CMD ["npm", "run", "start"]
