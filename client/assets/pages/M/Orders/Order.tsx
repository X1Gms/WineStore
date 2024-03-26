import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import WineOrder from "./WineOrder";
import { Colors } from "../../../json/global";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Order: React.FC<{ value: any[]; onDelete: any }> = ({
  value,
  onDelete,
}) => {
  const mapping = value;

  return (
    <ScrollView style={{ maxHeight: hp(15), marginTop: hp(2) }}>
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
    padding: wp(4),
    width: wp(75),
    backgroundColor: Colors.Secondary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  borderTopRadius: {
    borderTopRightRadius: wp(5.25),
    borderTopLeftRadius: wp(5.25),
  },
  borderBottomRadius: {
    borderBottomLeftRadius: wp(5.25),
    borderBottomEndRadius: wp(5.25),
  },
});
export default Order;
