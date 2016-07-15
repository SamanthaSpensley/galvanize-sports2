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
        return Number(checkoutSubtotal.toFixed(2));
    },
    getTax: function(subtotal, rate){
        var tax = 0.00;
          tax = subtotal * rate;
        return Number(tax.toFixed(2));
    },
    getCheckoutTotal: function(){
        var TAX_RATE = 0.078;
        var checkoutTotal = 0.00;

        checkoutTotal = this.getTax(this.getCheckoutSubtotal(), TAX_RATE)+this.getCheckoutSubtotal();
        return checkoutTotal.toFixed(2);
    }
}
