import React, {useEffect} from "react";
import { ACTIONS } from "../../actions/productActions";
import { fetchStockByStore } from "../../util/api";
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableToolbar from './TableToolbar'

import {
    useFilters,
    useGlobalFilter,
    useSortBy,
    useTable,
} from 'react-table'

const ProductTable = ({ products, shops, dispatch, columns, hidden }) => {
    useEffect(() => {
        shops.forEach((shop) => {
            stockFetch(shop.storeId);
        });
    }, [])

    const stockFetch = async (storeId) => {
        const stocksObj = await fetchStockByStore(storeId);
        const stocksData = stocksObj.result;
        dispatch({ type: ACTIONS.ADDSTOCKINFO, stocks: stocksData })
    };
    const data = React.useMemo(
        () => Object.values(products),
        [products]
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        setFilter,
        allColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        state: {globalFilter},
    } = useTable(
        {
            columns,
            data,
            initialState: {
                hiddenColumns: hidden
            }
        },
        useFilters, // useFilters!
        useGlobalFilter,
        useSortBy,
    )

    return (
        <div className={'data-wrapper'}>
            <TableToolbar
                preGlobalFilteredRows={preGlobalFilteredRows}
                setGlobalFilter={setGlobalFilter}
                globalFilter={globalFilter}
                allColumns={allColumns}
                setFilter={setFilter}
                products={products}
                columns={columns}
            />
            <TableContainer className={'data-table'}>
                <MaUTable stickyHeader {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...(column.id === 'selection'
                                        ? column.getHeaderProps()
                                        : column.getHeaderProps(column.getSortByToggleProps()))}
                                    >
                                        {column.render('Header')}
                                        {column.id !== 'selection' ? (
                                            <TableSortLabel
                                                active={column.isSorted}
                                                // react-table has a unsorted state which is not treated here
                                                direction={column.isSortedDesc ? 'desc' : 'asc'}
                                            />
                                        ) : null}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <TableRow hover {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </MaUTable>
            </TableContainer>
        </div>
    )
};

export default ProductTable;