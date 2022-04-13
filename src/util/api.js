export const fetchCategories = () => {
  // TEST DATA Instead of API CALL
  return {
    result: [
      {
        "categoryId": "cat_id_1",
        "categoryCode": "CAT_CODE_1",
        "categoryName": "Category_1"
      },
      {
        "categoryId": "cat_id_2",
        "categoryCode": "CAT_CODE_2",
        "categoryName": "Category_2"
      },
      {
        "categoryId": "cat_id_3",
        "categoryCode": "CAT_CODE_3",
        "categoryName": "Category_3"
      }
    ]
  }
}

export const fetchStores = () => {
  // TEST DATA Instead of API CALL
  return {
    result: [
      {
        "storeId": "store_id_1",
        "storeCode": "STORE_CODE_1",
        "storeName": "Store 1"
      },
      {
        "storeId": "store_id_2",
        "storeCode": "STORE_CODE_2",
        "storeName": "Store 2"
      },
      {
        "storeId": "store_id_3",
        "storeCode": "STORE_CODE_3",
        "storeName": "Store 3"
      }
    ]
  }
}

export const fetchProductsByCategory = (categoryId) => {
  // TEST DATA Instead of API CALL
  switch (categoryId) {
    case "cat_id_1":
      return {
        result: [
          {
            "productId": "product_id_1",
            "categoryId": "cat_id_1",
            "productCode": "P_CODE_1",
            "productName": "Product 1",
            "cost": "100"
          },
          {
            "productId": "product_id_2",
            "categoryId": "cat_id_1",
            "productCode": "P_CODE_2",
            "productName": "Product 2",
            "cost": "200"
          },
          {
            "productId": "product_id_3",
            "categoryId": "cat_id_1",
            "productCode": "P_CODE_3",
            "productName": "Product 3",
            "cost": "300"
          }
        ]
      }
    case "cat_id_2":
      return {
        result: [
          {
            "productId": "product_id_4",
            "categoryId": "cat_id_2",
            "productCode": "P_CODE_4",
            "productName": "Product 4",
            "cost": "100"
          },
          {
            "productId": "product_id_5",
            "categoryId": "cat_id_2",
            "productCode": "P_CODE_5",
            "productName": "Product 5",
            "cost": "200"
          },
          {
            "productId": "product_id_6",
            "categoryId": "cat_id_2",
            "productCode": "P_CODE_6",
            "productName": "Product 6",
            "cost": "300"
          }
        ]
      }
    case "cat_id_3":
      return {
        result: [
          {
            "productId": "product_id_7",
            "categoryId": "cat_id_3",
            "productCode": "P_CODE_7",
            "productName": "Product 7",
            "cost": "100"
          },
          {
            "productId": "product_id_8",
            "categoryId": "cat_id_3",
            "productCode": "P_CODE_8",
            "productName": "Product 8",
            "cost": "200"
          },
          {
            "productId": "product_id_9",
            "categoryId": "cat_id_3",
            "productCode": "P_CODE_9",
            "productName": "Product 9",
            "cost": "300"
          }
        ]
      }
    default:
      return { result: [] }
  }
}

export const fetchStockByStore = (storeId) => {
  // TEST DATA Instead of API CALL
  return {
    result: [
      {
        "storeId": storeId,
        "productId": "product_id_1",
        "stockAmount": Math.floor(Math.random() * 11).toString()
      },
      {
        "storeId": storeId,
        "productId": "product_id_2",
        "stockAmount": Math.floor(Math.random() * 11).toString(),
      },
      {
        "storeId": storeId,
        "productId": "product_id_3",
        "stockAmount": Math.floor(Math.random() * 11).toString(),
      },
      {
        "storeId": storeId,
        "productId": "product_id_4",
        "stockAmount": Math.floor(Math.random() * 11).toString(),
      },
      {
        "storeId": storeId,
        "productId": "product_id_5",
        "stockAmount": Math.floor(Math.random() * 11).toString(),
      },
      {
        "storeId": storeId,
        "productId": "product_id_6",
        "stockAmount": Math.floor(Math.random() * 11).toString(),
      },
      {
        "storeId": storeId,
        "productId": "product_id_7",
        "stockAmount": "0", // No Stock Across the Board, Can be filtered out on toggle
      },
      {
        "storeId": storeId,
        "productId": "product_id_8",
        "stockAmount": Math.floor(Math.random() * 11).toString(),
      },
      {
        "storeId": storeId,
        "productId": "product_id_9",
        "stockAmount": Math.floor(Math.random() * 11).toString(),
      }
    ]
  }
};