const express = require("express");
const handlebars = require("express-handlebars");
const app = express();

const mongodbConnect = require('./configs/mongodb-connection');

//저 mongodb-connection에서 쓴 익명함수가 리턴된다. (당연한소리..)
console.log("몽고쓰",mongodbConnect);

let collection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//handlebars를 템플릿 엔진으로 등록
app.engine("handlebars",
	handlebars.create({
		helpers: require("./configs/handlebars-helpers"),
	}).engine,
	);
//웹페이지 로드 시 사용할 템플릿 엔진 설정
app.set("view engine", "handlebars");
//뷰 디렉터리를 views로 설정
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
	res.render("home", {
		title: "게시판 테스트중입니다!", message: "Mongoose를 사용한 게시판 입니다."
	});
});

//글쓰기
app.get("/write", (req, res) => {
	res.render("write", {
		title: "테스트 게시판 글쓰기"

	});
})

app.post("/write", async (req, res) => {
	const post = req.body;
	//결과
	const result = postService.writePost(collection, post);
	//생성된 도큐먼트의 _id를 사용해 상세페이지로 이동
	res.redirect(`/detail/${result.insertedId}`);
});


app.get("/detail/:id", (req, res) => {
	res.render("detail", {
		title: "테스트 게시판"
	});
});

app.listen(3000, async () => {
	console.log("Server is running on port 3000");
	const mongoClient = await mongodbConnect();
	collection = mongoClient.db().collection("post");
	console.log("디비에 연결되었습니다.");
})