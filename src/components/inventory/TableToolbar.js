import React, {useEffect, useState} from 'react'

import GlobalFilter from './GlobalFilter'
import {alpha, makeStyles} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import ColumnToggleModal from "./ColumnToggleModal";
import DownloadButton from "./download";
import {Button} from "@material-ui/core";

const useToolbarStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        height: '64px'
    },
    zeroFilter: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        justifySelf: "flex-end",
        marginRight: 0,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }
}))

const TableToolbar = props => {
    const [zeroFlag, setZeroFlag] = useState(false);
    const classes = useToolbarStyles()
    const {
        preGlobalFilteredRows,
        setGlobalFilter,
        globalFilter,
        allColumns,
        setFilter,
        products,
        columns
    } = props

    const ToggleZeroFilter = () => {
        return (
            <div className={classes.zeroFilter}>
                <Button variant="outlined" onClick={() => { setZeroFlag(!zeroFlag) }}>
                    { !zeroFlag ? 'Showing All Items' : 'Showing Only Available Items'}
                </Button>
            </div>
        )
    }

    useEffect(() => {
        setFilter("zeroFlag", zeroFlag);
    }, [zeroFlag]);

    return (
        <Toolbar className={classes.root}>
            <ColumnToggleModal
                allColumns={allColumns}
            />
            <ToggleZeroFilter />
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <DownloadButton
                products={products}
                columns={columns}
            />
        </Toolbar>
    )
}

export default TableToolbar