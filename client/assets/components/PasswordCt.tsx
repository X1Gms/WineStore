import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

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
      <Icon {...props} size={hp(3)} style={{ marginRight: hp(1) }} />
      <Text style={{ fontSize: hp(2.8) }}>{name}</Text>
    </View>
  );
};
export default PasswordCt;
