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
        // Your code here!
    },
    getCheckoutSubtotal: function(){
        var checkoutSubtotal = 0.00;
        // Your code here!
        return checkoutSubtotal;
    },
    getTax: function(subtotal, rate){
        var tax = 0.00;
        // Your code here!
        return tax;
    },
    getCheckoutTotal: function(){
        var TAX_RATE = 0.078;
        var checkoutTotal = 0.00;
        // Your code here!
        return checkoutTotal;
    }
}
