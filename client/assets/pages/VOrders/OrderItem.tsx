import { View, Text, Pressable } from "react-native";
import { MainStyles } from "../M/Home/mainset";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Feather";

type Order = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  Address: string;
  Order: { price: string; wine: string; quantity: number }[];
  createdAt: string;
};

const OrderItem: React.FC<{ data: Order; navigation: any }> = ({
  data,
  navigation,
}) => {
  return (
    <Pressable style={MainStyles.Task} onPress={navigation}>
      <LinearGradient
        colors={["#FA69AE", "#B53170"]}
        style={MainStyles.NeoIcon}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Icon name="package" size={25} color="#FFF"></Icon>
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
        <Text style={MainStyles.DateLbl}>{data.createdAt}</Text>
      </View>
    </Pressable>
  );
};
export default OrderItem;
