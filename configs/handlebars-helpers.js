module.exports = {
	// 리스트 길이 반환
	lengthOfList: (list = [] ) => list.length,
	// 두 값 같은지 여부 반환
	equal: (a, b) => a === b,
	// ISO 날짜 문자열에서 날짜만 반환
	dateString: (isoString) => new Date(isoString).toLocaleDateString(),
};