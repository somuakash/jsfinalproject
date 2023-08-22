$("#count").text(localStorage.getItem("totalCartItem")) // setting up cart value

if(localStorage == null){
    $("#totalcartitems").text(0)
}else{
    $("#totalcartitems").text(localStorage.getItem("totalCartItem"))// Fetching the data form loacal storage and storing it in array
}


$("#Place-order-btn").click(function(){
    localStorage.clear()
})
let selectedCartItems = localStorage
let allObjectDataArray = [];
let totalsum = 0
for(let id = 1; id < 30; id++){
    if(localStorage.getItem(id)){
        allObjectDataArray.push(JSON.parse(localStorage.getItem(id)))
    }
}




// creating checkout page-----------------

for( let i = 0; i < allObjectDataArray.length; i++){
    totalsum += allObjectDataArray[i].price * allObjectDataArray[i].inCart

        document.getElementById("cartcards").innerHTML +=
        
        `
        <div class="checkout-card">
        <div class="card-left">
        <img class='card-imgage' src=${allObjectDataArray[i].preview} alt="photo">
        </div >
        <div class="card-right">
        <h4 class="card-item-name">${allObjectDataArray[i].name} </h4>
        <p class='card-quantity'>Quantity. <span>${allObjectDataArray[i].inCart} </span></p>
        <p>Amount. Rs <span>${(allObjectDataArray[i].price)*(allObjectDataArray[i].inCart)}</span></p>
        </div>
        </div>
        `
    }
    

$('#totalAmount').text(totalsum)
console.log(totalPrice)