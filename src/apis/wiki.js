function joinSearch(data) {
	let arr = []
	for (let key in data) {
		if (data[key] === true) {
			arr.push(key)
		} else {
			arr.push(`${key}=${encodeURIComponent(data[key])}`)
		}
	}
	return `?${(arr.join('&'))}`
}

const wikiQueryOptions = {
	action: 'opensearch',
	list: 'search',
	utf8: true,
	origin: '*'
}


export function getWikiSearch(options) { // search字段指定搜索
	const wikiQuery = joinSearch({...options, ...wikiQueryOptions})

	return fetch(`https://zh.wikipedia.org/w/api.php${wikiQuery}`, {
		method: 'GET',
		headers: {
			'user-agent': 'MyProTest/1.1 (https://localhost; MyCoolTool@example.org) BasedOnSuperLib/1.4'
		}
	}).then((response) => {
		return response.json()
	}).catch((error) => {
		console.log(error)
		return '未成功获取数据'
	})
}