const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

//handlebars를 템플릿 엔진으로 등록
app.engine("handlebars", handlebars.engine());
//웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("view engine", "handlebars");
//뷰 디렉터리를 views로 설정
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
	res.render("home", { title: "어서오세요!", message: "Mongoose를 사용한 게시판 입니다."});
});

app.listen(3000);