import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../../Components/controls/Controls';
import {
    useForm, Form
} from '../../Components/useForm';
import * as employeeService from "../../services/employeeService";
import axios from 'axios';



const initialFValues = {
    id: 0,
    // employee_name: null,
    // employee_username: null,
    // receivedFrom_id: null,
    // supply_date: null,
    // employee_password: null,
    role: null,

    employee_name: null,
    employee_username: null,
    role_id: null,
    employee_password: null,


}

export default function EmployeesForm(props) {


    const [focusForDeliveryDate, setFocusForDeliveryDate] = useState(false)
    const [newRecord, setNewRecord] = useState(initialFValues)
    const [focusForSupplyDate, setFocusForSupplyDate] = useState(false)

    const { addOrEdit, recordForEdit } = props


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true);

    function formatDate(input) {
        var datePart = input.match(/\d+/g),
            year = datePart[0], // get only two digits
            month = datePart[1], day = datePart[2];

        return day + '/' + month + '/' + year;
    }

    function getEmployeesData() {
        axios.get('http://localhost:8080/api/employees', {

        })
            .then(res => {

                let rows = [];
                for (let i = 0; i < res.data.length; i++) {
                    let item = res.data[i];
                    let obj = {

                        employee_name: item.name,
                        role: item.role.role,
                        employee_username: item.username,
                        role_id: item.role.id,
                        id: item.id
                    }
                    rows.push(obj)

                }
                props.setRecords(rows)
            }
            )
            .catch(err => console.log(err))
    }


    const handleSubmit = e => {
        e.preventDefault()
        if (newRecord.employee_name == null || newRecord.employee_username == null || newRecord.employee_password == null || newRecord.role_id == null) {
            props.setNotify({
                isOpen: true,
                message: 'All fields are Compulsory',
                type: 'error'
            })

            return;
        }



        axios.post('http://localhost:8080/api/employees',
            {

                "name": newRecord.employee_name,
                "username": newRecord.employee_username,
                "password": newRecord.employee_password,
                "role": {
                    "id": newRecord.role_id
                }


            }
        ).then((response) => {
            if (response.status === 201) {
                getEmployeesData()
                props.setNotify({
                    isOpen: true,
                    message: 'Record Added Successfully',
                    type: 'success'

                })

            }
            else {
                console.log(response)

            }

        }).catch(err => {
            props.setNotify({
                isOpen: true,
                message: err.response.data,
                type: 'error'

            })

        });

        props.setOpenPopup(false)

    }
    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="employee_name"
                        label="Name"
                        value={newRecord.employee_name}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.employee_name = event.target.value
                            setNewRecord(newVal)
                        }}

                    />
                    <Controls.Input

                        name="employee_username"
                        label="Username"
                        value={newRecord.employee_username}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.employee_username = event.target.value
                            setNewRecord(newVal)
                        }}

                    />

                </Grid>


                <Grid item xs={6}>

                    <Controls.Input

                        name="employee_password"
                        label="Password"
                        value={newRecord.employee_password}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.employee_password = event.target.value
                            setNewRecord(newVal)
                        }}

                    />

                    <Controls.Input

                        name="role_id"
                        label="Role ID "
                        value={newRecord.role_id}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.role_id = event.target.value
                            setNewRecord(newVal)
                        }}

                    />



                </Grid>

                <Grid item xs={6}>


                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}



