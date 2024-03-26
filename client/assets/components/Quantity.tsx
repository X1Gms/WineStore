import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Colors } from "../json/global";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Quantity: React.FC<{ number: number; onChange: any }> = ({
  number,
  onChange,
}) => {
  return (
    <View style={styles.Container}>
      <Pressable style={styles.plus} onPress={() => onChange("plus")}>
        <Icon name="plus" size={wp(9)} color={Colors.SecText} />
      </Pressable>
      <View style={styles.number}>
        <Text style={styles.numbert}>{number}</Text>
      </View>
      <Pressable style={styles.minus} onPress={() => onChange("minus")}>
        <Icon name="minus" size={wp(9)} color={Colors.SecText} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: "row",
  },
  plus: {
    width: hp(9),
    height: hp(7.3),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Third,
    borderTopStartRadius: wp(4.5),
    borderBottomLeftRadius: wp(4.5),
  },
  minus: {
    width: hp(9),
    height: hp(7.3),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Third,
    borderTopRightRadius: wp(4.5),
    borderBottomRightRadius: wp(4.5),
  },
  number: {
    width: hp(10.25),
    height: hp(7.3),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFEBF6",
  },
  numbert: {
    fontFamily: "Sansita One",
    color: "#D195B9",
    fontSize: hp(5),
  },
});
export default Quantity;
