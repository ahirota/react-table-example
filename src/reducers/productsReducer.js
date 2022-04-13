import {ACTIONS} from "../actions/productActions";

export const productsReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
    case ACTIONS.ADDPRODUCTSBYCATEGORY:
      let category = action.category;
      let shops = action.shops;
      action.products.forEach((product) => {
        let cost = product.cost;
        if(cost) {cost = parseFloat(cost).toFixed(2)} else {cost = ""}
        let initialLine = {category: `${category.categoryName}`, productSKU: `${product.productCode}`, product: `${product.productName}`, cost: `${cost}`};
        for (const shop of shops) {
          initialLine[shop.storeId] = 0;
        }
        initialLine.zeroFlag = true;
        newState[product.productId] = initialLine;
      });
      return newState;
    case ACTIONS.ADDSTOCKINFO:
      action.stocks.forEach((stock) => {
        if (newState[stock.productId]) {
          newState[stock.productId][stock.storeId] = stock.stockAmount;
          if (stock.stockAmount > 0) {
            newState[stock.productId]['zeroFlag'] = false;
          }
        }
      });
      return newState; 
    default:
      return state;
  }
};
