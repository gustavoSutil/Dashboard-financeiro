let dolarPrice;

//informações do papel
const encodedParams = new URLSearchParams();
encodedParams.append("symbol", "usdbrl=x");


const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'X-RapidAPI-Key': 'd48707962dmsh0353d3f6203e5f2p1c9204jsn9ed4f398e150',
		'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://yahoo-finance97.p.rapidapi.com/stock-info', options)
	.then(response => response.json())
	.then(response => setValueUSD(response.data))
	.catch(err => console.error(err));

function setValueUSD(data){
	let price = data.bid;
	let previousPrice = 5.38// data.previousClose;
	console.log(previousPrice);
	let variation = ((price-previousPrice)/previousPrice)*100;
	let signal = checkSignal(variation);
	let variationTag = document.getElementById('priceVariation');

	document.getElementById('dolarPrice').innerText = "R$ " + price.toFixed(2).replace('.',',') + "\240";
	variationTag.innerText = "(" + signal + variation.toFixed(2).replace('.',',') + "\%" + ")";
	variationTag.style = signal=='+' ? "color:green" : "color:red";
}

function checkSignal(value){
	if(value>=0)
		return '+';
	else return "";
}