const key = require('./key.json')
console.log(key)

const api = {
	url: `http://maps.google.cn//maps/api/js?libraries=places,geometry,drawing&key=${key}&v=3&region=cn&language=zh-CN`
}

const init = {
	center: { lat: 22, lng: 114 },
	zoom: 13
}

const markers = {
	positionType: 'address', // latlng or address
	latlngPositions: [
		{lat: 26.274375604407346, lng: 105.72725371444236},
		{lat: 27.905355448037255, lng: 120.99563645830955},
		{lat: 23.293510777409757, lng: 111.11771616360785},
		// {lat: 19.9225814976609, lng: 110.60264218806206},
		// {lat: 25.338336907182544, lng: 116.12955627844048},
		// {lat: 27.06137796836478, lng: 109.20196274250664},
		// {lat: 26.071336427842642, lng: 117.0889168127166},
		// {lat: 21.5519382417642, lng: 111.46658766271636},
		// {lat: 25.566327008733893, lng: 112.05178961627368},
		// {lat: 22.89519425973023, lng: 113.9140623403086},
		// {lat: 23.491263331188904, lng: 112.51471967528624},
		// {lat: 22.803204414718692, lng: 114.27500291945631},
		// {lat: 23.069411525099735, lng: 113.78284465646028},
		// {lat: 22.588844200000004, lng: 113.9640125}
	],
	addressPositions: [
		'广州', '深圳', '珠海', '东莞', '中山', '佛山', '惠州',
		'肇庆', '江门', '茂名', '汕头',
		'湛江', '梅州', '汕尾', '河源', '阳江', '韶关',
		'清远', '潮州', '揭阳', '云浮',
		'桂林', '南宁', '柳州'
	]
}

export default { api, init, markers }