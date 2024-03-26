import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LGContainer: React.FC<{
  id: number;
  number?: any;
  title: string;
  gradient: string[];
  color: string;
  onPress: any;
  type: number;
  func?: any;
}> = ({ id, number, title, gradient, color, onPress, type, func }) => {
  return (
    <Pressable
      style={{ marginRight: id % 2 === 0 ? wp(3) : 0 }}
      onPress={onPress}
    >
      <LinearGradient
        style={styles.StatusM}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={gradient}
      >
        {type === 0 ? (
          <View>
            <Text style={styles.StatusTitle}>
              {typeof number === "number" ? (
                number
              ) : (
                <Icon size={hp(6)} name={number} />
              )}
            </Text>
            <Text style={[styles.StatusSub, { color }]}>{title}</Text>
          </View>
        ) : type === 1 ? (
          <View>
            <Text style={[styles.StatusSub, { color: color }]}>{func}</Text>
            <Text style={[styles.StatusAltTitle]}>{title}</Text>
          </View>
        ) : (
          <View></View>
        )}
      </LinearGradient>
    </Pressable>
  );
};
export default LGContainer;
const styles = StyleSheet.create({
  StatusM: {
    width: wp(41),
    height: hp(14.5),
    borderRadius: wp(5),
    marginBottom: hp(1.5),
    padding: wp(2),
    justifyContent: "center",
    alignItems: "center",
  },
  StatusTitle: {
    fontSize: hp(4.5),
    color: "#fff",
    textAlign: "center",
    fontFamily: "Inter Bold",
  },
  StatusSub: {
    textAlign: "center",
    fontSize: hp(2.2),
    lineHeight: hp(2.2),
    fontFamily: "Inter Bold",
  },
  StatusAltTitle: {
    fontSize: hp(2.6),
    color: "#FFF",
    lineHeight: hp(2.6),
    fontFamily: "Inter Bold",
  },
});
