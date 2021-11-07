import { useContext, useState, useEffect } from "react";
import AppContext from "../AppContext";
import Input from './../components/input';
import styled from "styled-components";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { useRouter } from 'next/router';
const H1 = styled.h1`
font-weight:500;
font-size:24px;
color:black;
text-align:center;
margin: 3rem;
`
const Form = styled.form`
padding: 1rem 6rem;
`
const Paragraph = styled.p`
font-weight:500;
font-size:20px;
color:black;
text-align:center;
margin: 2rem;
`

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
const Thing = styled.div`
display:flex;
margin:2rem;
&.container{
    display:flex;
    flex-grow:6;
    margin:0;
    flex-direction: column;

}

`;
const Label = styled.label`
font-weight:bold;
color:black;
margin: 8px;
flex-grow: 1;
flex-direction: row;
align-content: center;
justify-content: flex-start;
align-items: center;
width: 15%;
text-transform: capitalize;
`;
const InputField = styled.input`
background-color: transparent;
border: 2px solid grey;
line-height:2;
padding: 0 5px;
text-transform: capitalize;
border-radius: 5px;

`;
const Select = styled.select`
background-color: transparent;
border: 2px solid grey;
line-height:2;
padding:5px;
text-transform: capitalize;
border-radius: 5px;
`
const Span = styled.span`
color:red;
font-size: 12px;
margin-top: 5px;
`;
const PaySlip = () => {
    const router = useRouter();
    const value = useContext(AppContext);
    const rate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [formInputData, setFormInputData] = useState({
        firstName: '',
        secondName: '',
        annualSalary: 0,
        evaluationRate: 0,
        paymentStartDate: ''
    });
    useEffect(() => {
        value.setEmplyeeData(formInputData)
    }, [formInputData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                paymentStartDate: ''
            })
        )
        value.setResultEmplyeeData(result);
        router.push('/payslipResult')
        console.log(result)

    }
    const handleChange = (event) => {
        setFormInputData({
            ...formInputData,
            [event.target.name]: event.target.value

        })
    }

    return (<div>
        <H1>PaySlip Program</H1>
        <Paragraph>enter the Emplyee Data To calculate The PaySlip</Paragraph>
        <Form onSubmit={handleSubmit}>
            <Input id="firstName" name="firstName" placeHolder="enter first Name" type="text" handleOnChange={handleChange} value={formInputData.firstName} required={true} label="first Name" />
            <Input id="secondName" name="secondName" placeHolder="enter second Name" type="text" handleOnChange={handleChange} value={formInputData.secondName} required={true} label="second Name" />
            <Input id="annualSalary" name="annualSalary" placeHolder="enter annual Salary" type="number" handleOnChange={handleChange} value={formInputData.annualSalary} required={true} label="annual Salary" />
            <Thing>
                <Label>evaluation Rate (%)</Label>
                <Thing className="container">
                    <Select name="evaluationRate" onChange={handleChange}>
                        <option value="">--Please choose an option--</option>
                        {rate && rate.map((item, index) => <option key={index} value={item}>{item}</option>)}

                    </Select>
                    {(!formInputData.evaluationRate) && <Span>this field cant be empty</Span>}
                </Thing>
            </Thing>
            <Thing>
                <Label>payment Start Date</Label>
                <Thing className="container">
                    <DateRangePicker initialSettings={formInputData.paymentStartDate} onApply={handleChange}>
                        <InputField type="text" className="form-control" name="paymentStartDate" required />
                    </DateRangePicker>
                    {(!formInputData.paymentStartDate) && <Span>this field cant be empty</Span>}
                </Thing>
            </Thing>



            <Button type="submit">submit</Button>
        </Form>
    </div>);
}

export default PaySlip;