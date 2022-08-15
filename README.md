# 유튜브 클론 코딩
해당 내용은 nomad coder의 유튜브 클론 강의를 보며 진행하였으며,

1. 로그인 form은 만들어 보았지만 실제로 로그인게 하고 싶었다.
2. 데이터를 업로드하고 해당 업로드는 어디에 저장이 되는가?
3. 그동안 api를 호출하여 데이터를 출력하였는데 이는 어떻게 구성이 되어있는가?
4. database는 무엇인가?

위의 내용을 알아보기 위해 시작하였습니다.

## 사용 기술
- Javascript
- Pug
- Scss
- Express
- MongoDB
- Mongoose
- Babel
- Webpack
- Multer
- Bcrypt

## 개발 내용
- express로 웹서버 생성하였으며 ES6문법으로 작성후 Babel로 transpile
- MogoDB와 Mongoose를 사용하여 User 및 Video DataBase 생성
- bcrypt를 통한 비밀번호 해쉬 작업
- Pug를 View engine로 지정하여 웹페이지 생성
- Multer를 통하여 User Data 관리 (저장의 경우 AWS S3 사용)
- Webpack으로 빌드한 후 Heroku를 통하여 배포
