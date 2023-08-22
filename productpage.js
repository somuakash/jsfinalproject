// selceting  elements-----------------------------------------------------------
var left = document.getElementById("leftSection")
var right = document.getElementById("rightSection")
let count = $(".orders-count")
var tempStoreData;
var totalCartItem;  // hold the total counts of cart item
// coverting local storage string value to number by assigning to variable
var cartvalue = Number(localStorage.getItem("totalCartItem")) 
if(localStorage == null){
    totalCartItem = 0;
}else{
    totalCartItem =  cartvalue;
}

$(document).ready(function(){
    let searchId = window.location.search
    let id = searchId.split("=")
    let productId=Number((id[1]))
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product/"+productId,function(response){
        // console.log(response)
        tempStoreData = response // storing the data into global veriable so that i can access it out side the function
        createproductpage(tempStoreData)
    })
    $("#count").text(localStorage.getItem("totalCartItem")) // to maintain count when there is data in localstorage and show in cart
   
   
    function createproductpage(responseData){
    responseData["inCart"] = 0   // added one property to maintain count of each items
    var imageleft = document.createElement('img')
    imageleft.classList.add('left-image')
    imageleft.src = `${responseData.preview}`
    left.appendChild(imageleft)
    /*
            elements that i need to create
    
            <h1> namw </h1>
            <h4> brand </h4>
            <h4> price RS : </h4>
            <h4>Description</h4>
            <P>add description</P>
            <h4>Product preview</h4>
            <button>Add to cart </button>
    */

    right.innerHTML = 
    `
        <h1 class = 'name'>${responseData.name} </h1>
        <h4 class= 'brand'> ${responseData.brand} </h4>
        <h4 class = 'price'> price Rs : <span> ${responseData.price}<span></h4>
        <h4 class = 'disc'>Description</h4>
        <P class = 'prdctDisc'>${responseData.description}</P>
        <h4 class = 'preview'>Product preview</h4>
        <div class = 'imgContainer' id = 'img-container'></div>
      `
    var imageContainer = document.getElementById('img-container')
      
      for(let i =0; i<responseData.photos.length; i++){
        imageContainer.innerHTML += `<img id="imgage${i}" class="${ i == 0 ? 'preImageBorder' : ''} imgData" src="${responseData.photos[i]}" alt="preview${i}" >`
    } 
    let imageSelect = document.querySelectorAll(".imgData");
    
    function borderRemove(){
        for(let j = 0; j<responseData.photos.length; j++){
            imageSelect[j].classList.remove("preImageBorder");
        }
    }
    for(let k=0; k<imageSelect.length; k++){
        imageSelect[k].addEventListener("click", function(){
            borderRemove();
            imageSelect[k].className = "preImageBorder"; //adding border to only the clicked image
            imageleft.src = imageSelect[k].src; //giving clicked  image src to preview image 
        });
    }
    var br = document.createElement('br')
    right.appendChild(br)
    
    var cartButton = document.createElement('button')
    cartButton.classList.add('cart-btn')
    cartButton.innerHTML = 'Add to cart'
    right.appendChild(cartButton)
    
    cartButton.addEventListener("click", function(){
        addTolocalstorage(responseData)   
    })

    
}
})
// add to cart functionality-----------
function addTolocalstorage(productData){
    productData["inCart"] +=1
    totalCartItem += 1
    localStorage.setItem(productData.id, JSON.stringify(productData))
    localStorage.setItem("totalCartItem",totalCartItem)
    $("#count").text(localStorage.getItem("totalCartItem"))

}