import { Colors } from "../../json/global";
import { StyleSheet } from "react-native";

const LoginInputs: { name: string; value: string; type: string }[] = [
  {
    name: "E-mail",
    value: "",
    type: "email",
  },
  {
    name: "Password",
    value: "",
    type: "password",
  },
];

const RegisterInputs: { name: string; value: string; type: string }[] = [
  {
    name: "Nome",
    value: "",
    type: "name",
  },
  {
    name: "E-mail",
    value: "",
    type: "email",
  },
  {
    name: "Password",
    value: "",
    type: "password",
  },
  {
    name: "Confirmar Password",
    value: "",
    type: "Cpassword",
  },
];

const PasswordSecurity = [
  {
    name: "Mín. 8 caracteres",
    regex: /^.{8,}$/,
  },
  {
    name: "Minúsculas",
    regex: /[a-z]/,
  },
  {
    name: "Maiúsculas",
    regex: /[A-Z]/,
  },
  {
    name: "Números",
    regex: /\d/,
  },
  {
    name: "Caracteres Especiais",
    regex: /[@$!%*?&]/,
  },
];

const handleInputs = (id: number, value: string, ...prev: any[]) => {
  const newInputs = [...prev];
  newInputs[id].value = value;
  return newInputs;
};

const RegLogStyles = StyleSheet.create({
  MainOne: {
    maxWidth: 285,
  },
  Title: {
    fontFamily: "Sansita One",
    fontSize: 54,
    color: Colors.Text,
    textAlign: "center",
  },
  SubT: {
    fontFamily: "Nunito Bold",
    fontSize: 17,
    color: Colors.Primary,
    textAlign: "center",
  },
  input: {
    color: Colors.Text,
    fontFamily: "Nunito Italic",
    padding: 15,
    width: 285,
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 45,
  },
  eInput: {
    fontFamily: "Nunito Bold Italic",
    borderWidth: 2,
    borderColor: Colors.Primary,
  },
  button: {
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: 20,
    marginVertical: 15,
  },
  returnButton: {
    elevation: 15,
    padding: 15,
    backgroundColor: Colors.Background,
    width: 60,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
});

export {
  LoginInputs,
  handleInputs,
  RegLogStyles,
  RegisterInputs,
  PasswordSecurity,
};
