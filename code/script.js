function priceFormat(aux){
	return aux.toFixed(2).replace('.',',');
}



//headers e configuration of api request
let encodedParams = new URLSearchParams();
encodedParams.append("symbol", "usdbrl=x");
encodedParams.append("period", "2d");


const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': Yahoo_RapidAPI_Key,
		'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
	},
	body: encodedParams
};

let USDprice;
let USDpreviusPriceDolar;




fetch('https://yahoo-finance97.p.rapidapi.com/price', options)
	.then(response => response.json())
	.then(response => readInfoUSD(response.data))
	.catch(err => console.error(err) && reload());


function readInfoUSD(data){
	console.log(data);
	if(data==null)
		reload();
	this.USDprice = data[data.length-1].Close;
	this.USDpreviusPriceDolar = data[data.length-2].Close;
	showValuesUSD();
}

function reload(){
	setTimeout(window.location.reload(true),2000);
}

function getUSDprice(){
	return this.USDprice;
}

function getUSDpreviusClose(){
	return this.USDpreviusPriceDolar;
}

function checkSignal(value){
	if(value>=0)
		return '+';
	else return "";
}

function showValuesUSD(){
	let USDprice = getUSDprice();
	let previousPrice = getUSDpreviusClose();

	let variation = ((USDprice-previousPrice)/previousPrice)*100;
	let signal = checkSignal(variation);
	let variationTag = document.getElementById('priceVariation');
	document.getElementById('dolarPrice').innerText = "R$ " + priceFormat(USDprice) + "\240";
	variationTag.innerText = "(" + signal + priceFormat(variation) + "\%" + ")";
	variationTag.style = signal=='+' ? "color:green" : "color:red";
}

