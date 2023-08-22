$(document).ready(function(){
    // index page Js code -----------------------------------------------------------------------------------------------
    var colthingcard = document.getElementById('cothingcadrs')
    var accessriescard = document.getElementById('accessriescard')
    
    
    
    $("#count").text(localStorage.getItem("totalCartItem")) // setting up the cart value
    
    
    
    $(".owl-carousel").owlCarousel({
        items: 1,
        loop: true,
        center: true,
        autoplay: true,
        margin: 10,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
    });
    
    $.get("https://5d76bf96515d1a0014085cf9.mockapi.io/product",function(data){
        // console.log(data)
        for(var i =0; i<data.length; i++){
          cardmaking(i, data)
        }
        
    })
          
    function cardmaking(i, data){
      // console.log(data)
      // code for genrating card
      let card =
      `
      <div class= 'card'  >
        <a href="./productpage.html?id=${data[i].id}" style= "text-decoration:none">
        <img class = 'image' src="${data[i].preview}" alt="${data[i].name}" />
        <div class="content-wrapper">
          <h3 class="item-name" ><b>${data[i].name}<b></h3>
          <h4 class="brand-name">${data[i].brand}</h4>
          <h5 class="price-tag">Rs ${data[i].price}</h5>
        </div></a>
      </div>
      `
      if(data[i].isAccessory === true){
        accessriescard.innerHTML += card
      }
      else{
        colthingcard.innerHTML += card
      }       
    }
    // Assigning cart value-----
     let cartCount = $("orders-count")
     
    })