import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import OrderItem from "./OrderItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import { useGoto } from "../../json/global";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const ViewOrders: React.FC = () => {
  const GoTo = useGoto();

  type Orders = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    Address: string;
    Order: { price: string; wine: string; quantity: number }[];
    createdAt: string;
  }[];

  const route: Orders = useRoute().params as Orders;

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ margin: hp(3), marginTop: hp(9) }}>
          {route && route.length > 0 ? (
            route.map((item, index) => (
              <OrderItem
                data={item}
                key={index}
                navigation={() => GoTo("FinishLine", item)}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: hp(4.2),
                  textAlign: "center",
                }}
              >
                Nenhuma Encomenda Efetuada
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default ViewOrders;
