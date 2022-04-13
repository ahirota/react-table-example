import React from 'react'
import {Box, Button, Modal, Typography} from "@material-ui/core";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ColumnToggleModal = ({ allColumns }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const setLocalStorageFlag = (e,column) => {
        if (column.id !== 'zeroFlag') {
            let item = window.localStorage.getItem('defaultHidden');
            item = item ? JSON.parse(item) : [];
            if (e.target.checked) {
                if (item.includes(column.id)) {
                    item = item.filter(id => id !== column.id);
                    window.localStorage.setItem('defaultHidden', JSON.stringify(item));
                }
            } else {
                if (!item.includes(column.id)) {
                    item.push(column.id);
                    window.localStorage.setItem('defaultHidden', JSON.stringify(item));
                }
            }
        }
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>
                Toggled Columns
            </Button>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Columns to Toggle
                    </Typography>
                    {allColumns.map(column =>
                        column.id ? (
                            <div key={column.id}>
                                <label>
                                    <input onClick={(e) => setLocalStorageFlag(e,column)} type="checkbox" {...column.getToggleHiddenProps()} />{' '}
                                    {column.Header}
                                </label>
                            </div>
                        ) : null
                    )}
                </Box>
            </Modal>
        </div>
    )
}

export default ColumnToggleModal