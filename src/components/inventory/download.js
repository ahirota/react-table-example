import React from 'react';
import {Button} from "@material-ui/core";
import {alpha, makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    download: {
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
            marginLeft: 'auto',
            width: 'auto',
        },
    }
}))

const DownloadButton = ({ products, columns }) => {
    const classes = useStyles()
    const exportCsv = (allColumns, allData) => {
        let d = new Date();
        let month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        let hours = '' + d.getHours(), minutes = '' + d.getMinutes(), seconds = d.getSeconds();
        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (seconds.length < 2) seconds = '0' + seconds;
        let ts = [[year, month, day].join(''),[hours, minutes, seconds].join('')].join("_");

        const columns = allColumns.filter(columnDef => columnDef["export"] !== false);
        const exportedData = allData.map(rowData => columns.map(columnDef => rowData[columnDef.accessor]));

        let csvString = "";

        csvString += columns.map(e => e.Header).join(",");
        csvString += "\r\n";
        csvString += exportedData.map(e => e.join(",")).join("\r\n");

        let array = [];

        for (let i = 0; i < csvString.length; i += 1) {
            array.push(csvString.charCodeAt(i));
        }

        const blob = new Uint8Array(array);

        const url = window.URL.createObjectURL(new Blob([blob], { type: 'text/csv' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", ts+"_reacttable.csv");
        document.body.appendChild(link);
        link.click();
    }

    const data = Object.values(products);

    return (
        <div className={classes.download}>
            <Button variant={"outlined"} onClick={() => { exportCsv(columns,data) }}>
                CSV Download
            </Button>
        </div>
    );
}
export default DownloadButton;