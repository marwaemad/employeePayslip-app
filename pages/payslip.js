import { useContext } from "react";
import AppContext from "../AppContext";
const PaySlip = () => {
    const value = useContext(AppContext);
    return (<div><h2>payslip</h2>
    {value.state.employeeData.name}
    </div>);
}

export default PaySlip;