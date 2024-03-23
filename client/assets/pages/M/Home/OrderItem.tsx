import { View, Text, Pressable } from "react-native";
import { MainStyles } from "./mainset";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import { useGoto } from "../../../json/global";

type Order = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  Address: string;
  Order: { price: string; wine: string; quantity: number }[];
  createdAt: string;
};

const OrderItem: React.FC<{ data: Order }> = ({ data }) => {
  const GoTo = useGoto();

  return (
    <Pressable style={MainStyles.Task} onPress={() => GoTo("FinishLine", data)}>
      <LinearGradient
        colors={["#FA69AE", "#B53170"]}
        style={MainStyles.Icon}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Icon name="package" size={31} color="#FFF"></Icon>
      </LinearGradient>
      <View
        style={{
          justifyContent: "center",
          marginBottom: 35,
          flexWrap: "wrap",
        }}
      >
        <Text style={MainStyles.General}>Encomenda</Text>
        <Text style={MainStyles.name}>{data.name}</Text>
      </View>
    </Pressable>
  );
};
export default OrderItem;
