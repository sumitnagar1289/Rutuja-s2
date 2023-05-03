import React, { useState } from 'react'
import EmployeeForm from "./EmployeeForm";
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
    newButton:{
        position:'absolute',
        right:'10px'
    }
}))


const headCells = [
    { id: 'name', label: 'Employee Name' },
    { id: 'username', label: 'userName' },
    { id: 'role', label: 'Role' },
    { id: 'department', label: 'Department' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Employees() {
    const [recordForEdit, setRecordForEdit] = useState(null)
    const classes = useStyles();
    const [records, setRecords] = useState(employeeService.getAllEmployees())
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

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.name.toLowerCase().includes(target.value))
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
  
    const onDelete = (id) => {
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees());
        setNotify({
          isOpen: true,
          message: 'Deleted Successfully',
          type: 'error'
        });
        setConfirmDialog({  // Close the confirmation dialog
          ...confirmDialog,
          isOpen: false
        });
      };
      
    const [data,setData]=useState([])
    useEffect(() => {
        async function fetchData() {
          const response = await fetch('http://localhost:4004/employees');
          const data = await response.json();
          setData(data);
        }
        fetchData();
      }, []);
    // useEffect(()=>{
    //     axios.get('http://localhost:4004/employees')
    //     .then(res => {
    //         console.log(res.data);
    //     })
    //     .catch(err => console.log(err))
    // },
    // [])
    return (
        <>
          
            <Paper className={classes.pageContent}>
               
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
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
                    startIcon={<AddIcon/>}
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
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.userName}</TableCell>
                                    <TableCell>{item.role}</TableCell>
                                    <TableCell>{item.roleId}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton 
                                        
                                       

                                       

                                     
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small"  />
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
            <EmployeeForm 
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit} />
            
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
}