const paginator = require("../utils/paginator");



async function list(collection, page, search) {
	const perPage = 10;
	//title과 search가 부분 일치하는가?
	const query = {title : new RegExp(search, "i")};
	//limit = 10개만 가져오고 설정된 갯수만큼 건너뜀 (skip)
	const cursor = collection.find(query, {limit: perPage, skip: (page - 1) * perPage}).sort({
		createdDt: -1,
	})
	// 검색어에 해당하는 게시물의 총 합
	const totalCount = await collection.count(query);
	//커서로 받아온 데이터 배열로 변환
	const posts = await cursor.toArray();
	//페이지네이터
	const paginatorObj = paginator({totalCount, page, perPage});
	return [posts, paginatorObj];
}
async function writePost(collection, post) {
	post.hits = 0;
	post.createdDt = new Date().toISOString();
	return await collection.insertOne(post);
}

module.exports = {
	writePost,
	list,
}