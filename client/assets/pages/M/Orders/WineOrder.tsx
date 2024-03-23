import { View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Colors } from "../../../json/global";
const WineOrder: React.FC<{
  name: string;
  style: {};
  quantity: number;
  id: number;
  onDelete: any;
}> = ({ name, style, quantity, onDelete, id }) => {
  return (
    <View style={style}>
      <Text
        style={{
          color: Colors.SecText,
          fontSize: 16,
          fontFamily: "Nunito Italic",
        }}
      >
        {`${
          name.length >= 21 ? name.substring(0, 22).trim() + "..." : name
        } x${quantity}`}
      </Text>
      <Pressable
        onPress={() => {
          onDelete(id);
        }}
      >
        <Icon name="minus" size={33} color={Colors.SecText} />
      </Pressable>
    </View>
  );
};
export default WineOrder;
