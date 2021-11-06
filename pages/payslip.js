import { useContext, useState, useEffect, Component } from "react";
import AppContext from "../AppContext";
import Input from './../components/input';
import styled from "styled-components";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';

const Form = styled.form`
padding: 6rem;`

const Button = styled.button`
display: flex;
margin: auto;
border: 2px solid #0707a6;
background-color: #0707a6;
border-radius: 15px;
padding: 2px 15px;
color: white;
font-size: 16px;
text-transform: capitalize;
font-weight: 500;`

const PaySlip = () => {
    const value = useContext(AppContext);
    const [formInputData, setFormInputData] = useState({
        firstName: '',
        secondName: '',
        annualSalary: 0,
        evaluationRate: 0,
        paymentStartDate: {}
    });
    useEffect(() => {
        value.setEmplyeeData(formInputData)
    }, [formInputData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formInputData)
        const res = await fetch(
            '../api/submit',
            {
                body: JSON.stringify({
                    formData: formInputData
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                method: 'POST'
            }
        )

        const result = await res.json().then(
            event.target.reset(),
            setFormInputData({
                firstName: '',
                secondName: '',
                annualSalary: 0,
                evaluationRate: 0,
                paymentStartDate: {}
            })
        )
        console.log(result)

    }
    const handleChange = (event) => {
        setFormInputData({
            ...formInputData,
            [event.target.name]: event.target.value

        })
    }

    return (<div>
        <Form onSubmit={handleSubmit}>
            <Input id="firstName" name="firstName" placeHolder="enter first Name" type="text" handleOnChange={handleChange} value={formInputData.firstName} required={true} label="first Name" />
            <Input id="secondName" name="secondName" placeHolder="enter second Name" type="text" handleOnChange={handleChange} value={formInputData.secondName} required={true} label="second Name" />
            <Input id="annualSalary" name="annualSalary" placeHolder="enter annual Salary" type="number" handleOnChange={handleChange} value={formInputData.annualSalary} required={true} label="annual Salary" />
            <Input id="evaluationRate" name="evaluationRate" placeHolder="enter evaluation Rate" type="number" handleOnChange={handleChange} value={formInputData.evaluationRate} required={true} label="evaluation Rate (%)" />
            {/* <Input id="paymentStartDate" name="paymentStartDate" placeHolder="" type="date" handleOnChange={handleChange} value={formInputData.paymentStartDate} required={true} label="payment Start Date" /> */}


            <DateRangePicker onApply={handleChange}>
                <input type="text" className="form-control" name="paymentStartDate" />
            </DateRangePicker>


            <Button type="submit">submit</Button>
        </Form>
    </div>);
}

export default PaySlip;