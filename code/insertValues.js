let totalPrice = {
    'br' : ['br',0],
    'usd' : ['usd',0],
    'n investido' : ['n investido',0],
    'outros': ['outros',0],
    'total' : 0
};

var dataName = [];
var dataValue = [];

var acao = getDataAcao();
console.log(acao)
acao.then(function(listStocks){
    listStocks.forEach(element => {
        encodedParams = new URLSearchParams();
        encodedParams.append("symbol",element.yahoo_cod);
        let options = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': Yahoo_RapidAPI_Key,
                'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
            },
            body: encodedParams
        };
        fetch('https://yahoo-finance97.p.rapidapi.com/stock-info', options)
	    .then(response => response.json())
	    .then(response => insertInTable(element,response.data,getUSDprice()))
	    .catch(err => console.log(err));//mudar
    });
});


function insertInTable(dataWallet,dataStock,dolar){
    let style = 'success';
    let price = dataStock.bid;
    if (dataWallet.pais!="br"){
        price*=dolar;
        style = 'info';
    }
    let total = (price-dataWallet.price_medium)*dataWallet.quantity;
    let cod = dataWallet.COD;
    document.getElementById("table-stocks")
        .insertAdjacentHTML(
        'beforeEnd',
        '<tr class="table-'+style+'">\
            <td scope="row">'+cod+'</td>\
            <td>'+dataWallet.quantity+'</td>\
            <td>R$ '+priceFormat(dataWallet.price_medium)+'</td>\
            <td>R$ '+priceFormat(price)+'</td>\
            <td name="end" >R$ '+priceFormat(total)+'</td>\
        </tr>');
    totalPrice.total = totalPrice.total + total;
    this.totalAcao.cod = (price*dataWallet.quantity);
    this.dataName[this.dataName.length] = cod;
    this.dataValue[this.dataValue.length] = total.toFixed(2);
    addGraph();
}

