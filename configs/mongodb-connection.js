const { MongoClient } = require("mongodb");
// 연결 주소
const uri = "mongodb://127.0.0.1:27017";

//호출하는 사람이 몽고디비 URI값을 몰라도 사용할 수 있게 함수를 감쌈
module.exports = function (callback) {
	return MongoClient.connect(uri, callback);
};