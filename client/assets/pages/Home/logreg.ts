import { Colors } from "../../json/global";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

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
    maxWidth: wp(75),
  },
  Title: {
    fontFamily: "Sansita One",
    fontSize: wp(14),
    color: Colors.Text,
    textAlign: "center",
  },
  SubT: {
    fontFamily: "Nunito Bold",
    fontSize: wp(4.5),
    color: Colors.Primary,
    textAlign: "center",
  },
  input: {
    color: Colors.Text,
    fontFamily: "Nunito Italic",
    height: hp(7),
    fontSize: hp(1.7),
    padding: wp(4),
    width: wp(75),
    backgroundColor: "#fff",
    borderRadius: wp(5.25),
    marginBottom: hp(5.5),
  },
  eInput: {
    fontFamily: "Nunito Bold Italic",
    borderWidth: wp(0.5),
    borderColor: Colors.Primary,
  },
  button: {
    height: hp(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: wp(5.25),
    marginVertical: hp(1.75),
  },
  returnButton: {
    elevation: 15,
    padding: 15,
    backgroundColor: Colors.Background,
    width: hp(8),
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
