import React from "react";
import { TextInput } from "react-native";

const EditText: React.FC<{
  id: number;
  value: string;
  name: string;
  type: string;
  style: any;
  onChange: any;
}> = ({ id, value, name, type, style, onChange }) => {
  return (
    <TextInput
      onChangeText={onChange}
      placeholder={name}
      style={style}
      placeholderTextColor="#C08BA1"
      cursorColor="#B53170"
      value={value}
      secureTextEntry={
        type === "password" || type === "Cpassword" ? true : false
      }
    />
  );
};

export default EditText;
