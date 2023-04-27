import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from '../../Components/controls/Controls';
import { useForm, Form
 } from '../../Components/useForm';
import * as employeeService from "../../services/employeeService";




const initialFValues = {
    id: 0,
    name: '',
   userName: '',
   role: '',
  
   roleId: '',
 
    isPermanent: false,
}

export default function EmployeeForm(props) {
const {addOrEdit, recordForEdit}=props
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
      
            if ('userName' in fieldValues)
            temp.userName = fieldValues.userName ? "" : "This field is required."
      
            if ('role' in fieldValues)
            temp.role = fieldValues.role ? "" : "This field is required."
      
      
        if ('roleId' in fieldValues)
            temp.roleId = fieldValues.roleId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            addOrEdit(values, resetForm);
        }
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
                        name="name"
                        label="name"
                        value={values.name}
                        onChange={handleInputChange}
                        error={errors.name}
                    />
                    <Controls.Input
                        label="userName"
                        name="userName"
                        value={values.userName}
                        onChange={handleInputChange}
                        error={errors.userName}
                    />
                    
                  
                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                        label="role"
                        name="role"
                        value={values.role}
                        onChange={handleInputChange}
                        error={errors.role}
                    />
                
                    <Controls.Select
                        name="roleId"
                        label="Department"
                        value={values.roleId}
                        onChange={handleInputChange}
                        options={employeeService.getDepartmentCollection()}
                        error={errors.roleId}
                    />
                  
                    <Controls.Checkbox
                        name="isPermanent"
                        label="Permanent Employee"
                        value={values.isPermanent}
                        onChange={handleInputChange}
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