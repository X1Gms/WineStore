import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
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
    <Pressable style={{ marginRight: id % 2 === 0 ? 16 : 0 }} onPress={onPress}>
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
                <Icon size={33} name={number} />
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
    width: 163,
    height: 122,
    borderRadius: 25,
    marginBottom: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  StatusTitle: {
    fontSize: 35,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Inter Bold",
  },
  StatusSub: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 18,
    fontFamily: "Inter Bold",
  },
  StatusAltTitle: {
    fontSize: 21,
    color: "#FFF",
    lineHeight: 25,
    fontFamily: "Inter Bold",
  },
});
