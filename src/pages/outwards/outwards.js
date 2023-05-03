import React, { useState } from 'react'
import OutwardsForm from "./outwardsForm";
import axios from 'axios'
import { useEffect } from 'react';
import Popup from '../../Components/Popup';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from '../../Components/useTable';
import * as employeeService from "../../services/employeeService";
import Controls from '../../Components/controls/Controls';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../../Components/Notification';
import ConfirmDialog from '../../Components/ConfirmDialog';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'product_id', label: 'Product ID' },
    { id: 'godown_id', label: 'Godown ID' },
    { id: 'invoice_id', label: 'Invoice ID' },
    { id: 'supply_date', label: 'Supply Date' },
    { id: 'delivery_date', label: 'Delivery Date' },
    { id: 'purpose', label: 'Purpose' },
    { id: 'receipt_no', label: 'Receipt No' },
    { id: 'delivered_to', label: 'Delivered To' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {
    const [recordForEdit, setRecordForEdit] = useState(null)
    const classes = useStyles();
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    async function getOutwardsData() {
        let res = await axios.get('http://localhost:5000/outwards')
        setRecords(res.data);
    }

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.product_id.toLowerCase().includes(target.value))
            }
        })
    }
    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
            employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const onDelete = id => {
        if (('Are you sure to delete this record'))
            employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    const [data, setData] = useState([])
    useEffect(() => {

        axios.get('http://localhost:8080/api/outwards', {
            
        })
            .then(res => {
               
                let rows =[];
                for(let i =0; i<res.data.length; i++)
                {
                    let item =res.data[i];
                    let obj ={
                        godown_id: item.godown.id,
                        product_id: item.product.id,
                        invoice_id: item.invoice.id,
                        delivery_date:item.deliveryDate,
                        supply_date:item.supplyDate,
                        receipt_no:item.receiptNo,
                        id:item.id,
                        purpose:item.purpose,
                        delivered_to:item.deliveredTo
                    }
                    rows.push(obj)

                }
                setRecords(rows)
            }
            )
            .catch(err => console.log(err))
    },
        [])


    return (
        <>

            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Outwards"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}

                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                            (<TableRow key={item.id}>
                                <TableCell>{item.product_id}</TableCell>
                                <TableCell>{item.godown_id}</TableCell>
                                <TableCell>{item.invoice_id}</TableCell>
                                <TableCell>{item.supply_date}</TableCell>
                                <TableCell>{item.delivery_date}</TableCell>
                                <TableCell>{item.purpose}</TableCell>
                                <TableCell>{item.receipt_no}</TableCell>
                                <TableCell>{item.delivered_to}</TableCell>
                                <TableCell>
                                    <Controls.ActionButton
                                        onClick={() => { openInPopup(item) }}>
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton
                                        //    color="secondary"
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure to delete this record?',
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => { onDelete(item.id) }
                                            })
                                        }}>
                                        <CloseIcon fontSize="small" />
                                    </Controls.ActionButton>
                                </TableCell>
                            </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                <OutwardsForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} 
                    setRecords={setRecords}
                    records={records}
                    setNotify={setNotify}
                    setOpenPopup={setOpenPopup}
                    />


            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}

            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
};
export default outwards;





