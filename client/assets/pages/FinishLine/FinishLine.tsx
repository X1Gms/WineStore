import { View, Text, TouchableHighlight } from "react-native";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FinishStyles } from "../M/Home/mainset";
import Icon from "react-native-vector-icons/Feather";
import { ScrollView } from "react-native-gesture-handler";
import Requests from "../../components/Requests";
import { useGoto } from "../../json/global";

type Order = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  Address: string;
  Order: { price: string; wine: string; quantity: number }[];
  createdAt: string;
};

const FinishLine = () => {
  const route = useRoute().params as Order;
  const GoTo = useGoto();

  const data = [
    { label: "Data Pedido Enviado:", value: route.createdAt },
    { label: "E-mail:", value: route.email },
    { label: "Nº Telefone:", value: route.phoneNumber },
    { label: "Morada:", value: route.Address },
  ];

  const SendRequest = () => {
    const form = {
      id: route.id,
      order: route.Order,
    };

    Requests("finishorder", "POST", form)
      .then(() => {
        GoTo("MainContainer");
      })
      .catch((e) => console.error(e));
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ width: "85%", alignSelf: "center" }}>
        <View style={FinishStyles.OrderV}>
          <LinearGradient
            colors={["#FA69AE", "#B53170"]}
            style={FinishStyles.Icon}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="package" size={31} color="#FFF"></Icon>
          </LinearGradient>
          <Text style={FinishStyles.OrderLbL}>{route.name}</Text>
        </View>
        {data.map((item, index) => {
          return (
            <View
              key={index}
              style={{ flexDirection: "row", width: "100%", marginBottom: 30 }}
            >
              <Text style={{ width: "30%", fontSize: 16, color: "#747373" }}>
                {item.label}
              </Text>
              <Text style={{ width: "70%", fontSize: 16, fontWeight: "bold" }}>
                {item.value}
              </Text>
            </View>
          );
        })}
        <View style={{ flexDirection: "row", width: "100%", marginBottom: 30 }}>
          <Text style={{ width: "30%", fontSize: 16, color: "#747373" }}>
            Pedido:
          </Text>
          <View style={{ width: "70%" }}>
            {route.Order.map((item, index) => (
              <Text
                style={{ color: "#949494", marginBottom: 15 }}
                key={index}
              >{`${item.wine} x${item.quantity}`}</Text>
            ))}
            <View
              style={{ width: "100%", height: 1, backgroundColor: "#949494" }}
            />
            <Text style={FinishStyles.total}>
              {route.Order.reduce(
                (accumulator, currentValue) =>
                  accumulator +
                  parseFloat(currentValue.price) * currentValue.quantity,
                0
              )
                .toFixed(2)
                .replace(".", ",")}
              €
            </Text>
          </View>
        </View>
        <TouchableHighlight
          style={FinishStyles.button}
          underlayColor="#FFD6E9"
          onPress={SendRequest}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: "Nunito Bold",
              fontSize: 26,
            }}
          >
            Finalizar Entrega
          </Text>
        </TouchableHighlight>
      </ScrollView>
    </SafeAreaView>
  );
};
export default FinishLine;
