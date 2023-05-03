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
    product_id: null,
    godown_id: null,
    receivedFrom_id: null,
    supply_date: null,
    invoice_id: null,
    receipt_no: null,


}

export default function InwardsForm(props) {


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

    function getInwardsData() {
        axios.get('http://localhost:8080/api/inwards', {

        })
            .then(res => {

                let rows = [];
                for (let i = 0; i < res.data.length; i++) {
                    let item = res.data[i];
                    let obj = {
                        godown_id: item.godown.id,
                        product_id: item.product.id,
                        invoice_id: item.invoice.id,
                        receivedFrom_id: item.invoice.billCheckedBy.id,
                        supply_date: item.supplyDate,
                        receipt_no: item.receiptNo,
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
        if (newRecord.product_id == null || newRecord.godown_id == null || newRecord.invoice_id == null || newRecord.receivedFrom_id == null || newRecord.supply_date == null || newRecord.receipt_no == null) {
            props.setNotify({
                isOpen: true,
                message: 'All fields are Compulsory',
                type: 'error'
            })

            return;
        }



        axios.post('http://localhost:8080/api/inwards',
            {

                "supplyDate": formatDate(newRecord.supply_date),
                "receiptNo": newRecord.receipt_no,
                "supplier": {
                    "id": newRecord.receivedFrom_id
                },
                "invoice": {
                    "id": newRecord.invoice_id
                },
                "godown": {
                    "id": newRecord.godown_id
                },
                "product": {
                    "id": newRecord.product_id
                }
            }
        ).then((response) => {
            if (response.status === 201) {
                getInwardsData()
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
                        name="Product_id"
                        label="Product ID"
                        value={newRecord.product_id}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.product_id = event.target.value
                            setNewRecord(newVal)
                        }}

                    />
                    <Controls.Input

                        name="godown_id"
                        label="Godown ID"
                        value={newRecord.godown_id}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.godown_id = event.target.value
                            setNewRecord(newVal)
                        }}

                    />

                </Grid>

                <Grid item xs={6}>
                    <Controls.Input
                        name="receivedFrom_id"
                        label="Received From ID"
                        value={newRecord.receivedFrom_id}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.receivedFrom_id = event.target.value
                            setNewRecord(newVal)
                        }}

                    />
                    <Controls.Input

                        name="supply_date"
                        label="Supply Date"
                        type={(focusForSupplyDate) ? "date" : "text"}
                        onFocus={() =>
                            setFocusForSupplyDate(true)
                        }
                        onBlur={() => {
                            setFocusForSupplyDate(false)
                        }}
                        value={newRecord.supply_date}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.supply_date = event.target.value
                            setNewRecord(newVal)
                        }}

                    />


                </Grid>

                <Grid item xs={6}>

                    <Controls.Input

                        name="invoice_id"
                        label="Invoice ID"
                        value={newRecord.invoice_id}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.invoice_id = event.target.value
                            setNewRecord(newVal)
                        }}

                    />


                </Grid>

                <Grid item xs={6}>
                    <Controls.Input

                        name="receipt_no"
                        label="Receipt No "
                        value={newRecord.receipt_no}
                        onChange={(event) => {
                            let newVal = JSON.parse(JSON.stringify(newRecord));
                            newVal.receipt_no = event.target.value
                            setNewRecord(newVal)
                        }}

                    />


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