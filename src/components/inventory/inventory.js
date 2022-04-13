import React, {useState, useEffect, useReducer} from "react";
import {
  fetchCategories,
  fetchStores,
  fetchProductsByCategory,
} from "../../util/api";
import ProductTable from "./productTable";
import {productsReducer} from "../../reducers/productsReducer";
import { ACTIONS } from "../../actions/productActions";

const Inventory = props => {
    const [shops, setShops] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [products, dispatch] = useReducer(productsReducer, {})
    const [columns, setColumns] = useState([]);

    const defaultHidden = () => {
        let item = window.localStorage.getItem('defaultHidden');
        item = item ? JSON.parse(item) : [];
        item.push('zeroFlag');
        return item;
    };

    const hidden = defaultHidden();

    useEffect(() => {
        firstFetch(); 
    }, [])

    useEffect(() => {
        (async () => {
            await Promise.all(categories.map(async category => await productFetch(category, shops)))
        })();
    }, [categories]);

    const firstFetch = async () => {
        const shopsObj = await fetchStores();
        const shopData = shopsObj.result;
        const columns = [{ Header: "Category", accessor: "category" },{ Header: "SKU", accessor: "productSKU" },{ Header: "Product", accessor: "product" },{ Header: "Cost", accessor: "cost" }];
        shopData.map((store) => columns.push({Header: `${store.storeName} (ID: ${store.storeId})`, accessor: store.storeId}))
        columns.push({Header: "Item Available", accessor: "zeroFlag", filter: zeroFlagFilterFunction, "export": false, Cell: s => (s.value ? 'Available' : 'Unavailable'), sortType: zeroFlagSortFunction});
        setColumns(columns);
        setShops(shopData); 
        const categoriesObj = await fetchCategories(); 
        const categoriesData = categoriesObj.result;
        setCategories(categoriesData);
    }

    const zeroFlagFilterFunction = (rows, id, filterValue) =>
        rows.filter((row) => filterValue ? row.original.zeroFlag !== true : true);

    const zeroFlagSortFunction = (rowA, rowB, columnId, desc) => {
        const a = (rowA.original[columnId]) ? 1 : -1;
        const b = (rowB.original[columnId]) ? 1 : -1;
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    };

    const productFetch = async (category, shops) => {
        const productsObj = await fetchProductsByCategory(category.categoryId);
        const productsData = productsObj.result;
        dispatch({ type: ACTIONS.ADDPRODUCTSBYCATEGORY, products: productsData, category: category, shops: shops});
    }

    const memoizedColumns = React.useMemo(
        () => columns,
        [columns]
    )
    
    return (
        <div className="inventory">
            {(Object.keys(products).length > 0) ? (
                <ProductTable products={products} shops={shops} columns={memoizedColumns} dispatch={dispatch} hidden={hidden}/>
            ) : null}
        </div>
    );
}
export default Inventory; 