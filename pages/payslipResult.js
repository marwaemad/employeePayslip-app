import { useContext } from "react";
import AppContext from "../AppContext";
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
const H1 = styled.h1`
font-weight:500;
font-size:24px;
color:black;
text-align:center;
margin: 3rem;
`
const Thing = styled.div`
display:flex;
flex-direction: column;
padding: 2rem;
& Table{
    text-transform: capitalize;
}
`;
const List = styled.li`

    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;

`
const Span = styled.span`
    font-size: 16px;
    font-weight: 500;
`
const PayslipResult = () => {
    const value = useContext(AppContext).state.resultEmployeeData;

    return (
        <Thing>
            <H1>Employee PaySlip Result</H1>
            <ul>
                <List><Span>emplyee annula salary :  </Span>{value?.data?.annualSalary}</List>
                <List><Span>emplyee Evaluation rate :  </Span>{value?.data?.evaluationRate}</List>
            </ul>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>gross Income</th>
                        <th>income Tax</th>
                        <th>net Income</th>
                        <th>incentive bonus</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{value?.data?.firstName + ' ' + value?.data?.secondName}</td>
                        <td>{value?.grossIncomeWithinRange}</td>
                        <td>{value?.incomeTaxWithinRange}</td>
                        <td>{value?.netIncomeWithinRange}</td>
                        <td>{value?.incentiveBonusWithinRange}</td>
                    </tr>

                </tbody>
            </Table>
        </Thing>);
}

export default PayslipResult;