import DropDownPicker from 'react-native-dropdown-picker';
import React,{useState} from 'react';
function DropDown() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("gender");
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
}
export default DropDown;