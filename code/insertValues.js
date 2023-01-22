let totalPrice = {
    'br' : ['br',0],
    'usd' : ['usd',0],
    'n investido' : ['n investido',0],
    'outros': ['outros',0],
    'total' : ['total',0]
};

let totalAcao = {

}



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
                'X-RapidAPI-Key': 'd48707962dmsh0353d3f6203e5f2p1c9204jsn9ed4f398e150',
                'X-RapidAPI-Host': 'yahoo-finance97.p.rapidapi.com'
            },
            body: encodedParams
        };
        fetch('https://yahoo-finance97.p.rapidapi.com/stock-info', options)
	    .then(response => response.json())
	    .then(response => insertInTable(element,response.data))
	    .catch(err => console.log(err));//mudar
    });
});


function insertInTable(dataWallet,dataStock){
    let total = (dataStock.bid-dataWallet.price_medium)*dataWallet.quantity
    let cod = dataWallet.COD;
    document.getElementById("table-stocks")
        .insertAdjacentHTML(
        'beforeEnd',
        '<tr class="table-success">\
            <td scope="row">'+cod+'</td>\
            <td>'+dataWallet.quantity+'</td>\
            <td>R$ '+priceFormat(dataWallet.price_medium)+'</td>\
            <td>R$ '+priceFormat(dataStock.bid)+'</td>\
            <td name="end" >R$ '+priceFormat(total)+'</td>\
        </tr>');
    totalPrice.total+=total;
    totalAcao.cod = total;
}


const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
    backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
    }]
};


const config = {
    type: 'pie',
    data: data,
}
