import styled from 'styled-components';
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
const Span = styled.span`
color:red;
font-size: 12px;
margin-top: 5px;
`;
const Input = ({ id, name, type, required, handleOnChange, value, label, placeHolder }) => {
    return (
        <Thing>
            <Label htmlFor={name}>{label}</Label>
            <Thing className="container">
                <InputField id={id} name={name} placeholder={placeHolder} type={type} autoComplete={id} value={value} onChange={handleOnChange} required={required} />
                {(!value && required )&& <Span>this field cant be empty</Span>}
            </Thing>
        </Thing>
    );
}

export default Input;