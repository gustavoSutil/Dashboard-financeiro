
let totalPrice = 0;






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
    document.getElementById("table-stocks")
        .insertAdjacentHTML(
        'beforeEnd',
        '<tr class="table-success">\
            <td scope="row">'+dataWallet.COD+'</td>\
            <td>'+dataWallet.quantity+'</td>\
            <td>R$'+dataWallet.price_medium+'</td>\
            <td>R$'+dataStock.bid+'</td>\
            <td name="end" >R$'+total.toString()+'</td>\
        </tr>');
    totalPrice+=total;
}