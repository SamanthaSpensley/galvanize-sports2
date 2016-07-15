var data = require("./objects");
var inventory = data.inventory;
var shoppingCart = data.shoppingCart;

module.exports = {
    inventory: data.inventory,
    shoppingCart: data.shoppingCart,
    addItem: function(itemId, quantity){
        for (var index in inventory) {
          if (inventory[index].id === itemId) {
            if (quantity > inventory[index].quantityAvailable) {
              shoppingCart[index].quantity += inventory[index].quantityAvailable;
              inventory[index].quantityAvailable = 0;
            } else {
              shoppingCart[index].quantity += quantity;
              inventory[index].quantityAvailable -= quantity;
            }
          }
        }
    },
    removeItem: function(itemId, quantity){
        for (var index in shoppingCart) {
          if (shoppingCart[index].itemId === itemId) {
            if (quantity > shoppingCart[index].quantity) {
              inventory[index].quantityAvailable += shoppingCart[index].quantity;
              shoppingCart[index].quantity = 0;
            } else {
              shoppingCart[index].quantity -= quantity;
              inventory[index].quantityAvailable += quantity;
            }
          }
        }
    },
    getCheckoutSubtotal: function(){
        var checkoutSubtotal = 0.00;
        for (var i in shoppingCart) {
          checkoutSubtotal += (shoppingCart[i].quantity * inventory[i].price)
        }
        return checkoutSubtotal.toFixed(2);
    },
    getTax: function(subtotal, rate){
        var tax = 0.00;
          tax = subtotal * rate;
        return tax.toFixed(2);
    },
    getCheckoutTotal: function(){
        //checkoutTotal = getTax(getCheckoutSubtotal(), TAX_RATE);
        var TAX_RATE = 0.078;
        var checkoutTotal = 0.00;
        var calcSubTotal = 0;
        var calcTax = 0;

        for (var i in shoppingCart) {
          calcSubTotal += (shoppingCart[i].quantity * inventory[i].price)
        }
        calcTax = calcSubTotal * TAX_RATE;
        checkoutTotal = calcSubTotal + calcTax;

        return checkoutTotal.toFixed(2);
    }
}
