import { TextInput } from "react-native";

const Input = ({ id, style, onChange, input, placeholder }) => {
  const handleInputChange = (text) => {
    onChange(id, text);
  };

  return (
    <TextInput
      onChangeText={handleInputChange}
      placeholder={placeholder}
      style={style}
      placeholderTextColor="#C08BA1"
      cursorColor="#B53170"
      value={input}
      secureTextEntry={placeholder === "Palavra-Passe" ? true : false}
    />
  );
};

export default Input;
