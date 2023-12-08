import { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// const options = ['Option 1', 'Option 2'];
type Props = {
    data?: any;
    type?: any
    change?: any;
    option?: any
    orderType?: any
    style?: any;
    value?: any;
    inputValue?: any;
}
export default function ControllableStates(props: Props) {
    // const {data,type,change,option,orderType,style,value} = props;
    const { data, value, type, change, style,option } = props;
    //   const [values, setValues] = useState<string | null>(null);
      const [inputValue, setInputValue] = useState('');
    return (
        <div>
            <Autocomplete
                id="controllable-states-demo"
                value={value}
                onChange={change}
                // inputValue={inputValue}
                // onInputChange={(event, newInputValue) => {
                // console.log(value,"newinp")
                //   setInputValue(value);
                // }}
                options={data}
                // getOptionLabel={type ? (option: { tradingsymbol: any; }) => option : (option: { tradingsymbol: any; }) => option}
                // getOptionLabel={type ? (option: { tradingsymbol: any; }) => option : (option: { tradingsymbol: any; }) => option.tradingsymbol}
                style={style}
                renderInput={(params) => <TextField {...params} label="Controllable" variant="outlined" />}
            />
        </div>
    );
}
