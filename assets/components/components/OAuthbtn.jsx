import { Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

const OAuthbtn = ({ icon, style }) => {
  return (
    <Pressable style={style}>
      <Icon name={icon} size={30} color="#D3AFC2" />
    </Pressable>
  );
};
export default OAuthbtn;
