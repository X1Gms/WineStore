import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PasswordCt: React.FC<{
  password: string;
  name: string;
  regex: RegExp;
}> = ({ password, name, regex }) => {
  const props = {
    name: "",
    color: "",
  };

  if (regex.test(password)) {
    props.name = "check";
    props.color = "green";
  } else {
    props.name = "times";
    props.color = "red";
  }
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}
    >
      <Icon {...props} size={25} style={{ marginRight: 8 }} />
      <Text style={{ fontSize: 23 }}>{name}</Text>
    </View>
  );
};
export default PasswordCt;
