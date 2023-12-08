/* eslint-disable no-use-before-define */
import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { JSX } from 'react/jsx-runtime';

type Props = {
  data?:any;
  type?:any
  change?:any;
  option?:any
  orderType?:any
  style?:any;
  value?:any;
  inputValue?:any;
}
export default function ComboBox(props:Props) {
  const {data,type,change,option,orderType,style,value} = props;
  return (
    <Autocomplete
      id="combo-box-demo"
      value={value} 
      options={data}
      // getOptionLabel={type ?  (option: { tradingsymbol: any; }) => option : (option: { tradingsymbol: any; }) => option.tradingsymbol}
      style={style}
      renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} label={type  && !orderType? "Lots" : orderType ? 'Order Type':option ? "Strike Price": "Instruments"} variant="outlined" />}
      onChange={change}
      // inputValue={inputValue}
      // onInputChange={(event, newInputValue) => {
      //     setInputValue(newInputValue);
      //   }}
    />
  );
}
