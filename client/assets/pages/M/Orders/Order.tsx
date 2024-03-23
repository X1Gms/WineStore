import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import WineOrder from "./WineOrder";
import { Colors } from "../../../json/global";
const Order: React.FC<{ value: any[]; onDelete: any }> = ({
  value,
  onDelete,
}) => {
  const mapping = value;

  return (
    <ScrollView style={{ maxHeight: 120, marginTop: 15 }}>
      {mapping.map((item, index) => (
        <WineOrder
          name={item.wine}
          quantity={item.quantity}
          id={index}
          key={index}
          onDelete={onDelete}
          style={
            index === 0
              ? [WineOrderSt.style, WineOrderSt.borderTopRadius]
              : index === mapping.length - 1
              ? [WineOrderSt.style, WineOrderSt.borderBottomRadius]
              : WineOrderSt.style
          }
        />
      ))}
    </ScrollView>
  );
};

const WineOrderSt = StyleSheet.create({
  style: {
    padding: 15,
    width: 285,
    backgroundColor: Colors.Secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  borderTopRadius: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  borderBottomRadius: {
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
  },
});
export default Order;
