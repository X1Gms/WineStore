import { StyleSheet } from "react-native";
import { Colors } from "../../../json/global";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DashContainers = [
  {
    number: 0,
    title: "Garrafas",
    gradient: ["#F89797", "#FF2727"],
    color: "#FFA0A0",
    type: 0,
  },
  {
    number: 0,
    title: "Secções",
    gradient: ["#FDD891", "#FFC327"],
    color: "#FFEBB7",
    type: 0,
  },
  {
    number: 0,
    title: "Encomendas",
    gradient: ["#C3FF9E", "#1ED800"],
    color: "#BEFFB4",
    type: 0,
  },
  {
    number: "plus",
    title: "Adicionar Item",
    gradient: ["#9EE8FF", "#00A4D8"],
    color: "#B4E4FF",
    type: 0,
  },
];

const DashAltContainers = [
  {
    title: "Secção",
    func: "Criar",
    gradient: ["#F89797", "#FF2727"],
    color: "#FFA0A0",
    type: 1,
  },
  {
    title: "Bebidas",
    func: "Adicionar",
    gradient: ["#FDD891", "#FFC327"],
    color: "#FFEBB7",
    type: 1,
  },
  {
    title: "Encomendas",
    func: "Adicionar",
    gradient: ["#C3FF9E", "#1ED800"],
    color: "#BEFFB4",
    type: 1,
  },
  {
    number: "corner-down-left",
    title: "Voltar",
    gradient: ["#9EE8FF", "#00A4D8"],
    color: "#B4E4FF",
    type: 0,
  },
];

const MainStyles = StyleSheet.create({
  Welcome: {
    fontSize: hp(1.75),
    fontFamily: "Nunito Bold",
    color: Colors.LightGray,
  },
  MyName: {
    fontSize: hp(3.5),
    fontWeight: "bold",
    marginTop: 5,
  },
  returnButton: {
    elevation: 15,
    padding: 15,
    backgroundColor: "#FFF",
    width: hp(7),
    height: hp(7),
    alignItems: "center",
    borderRadius: wp(2),
    marginBottom: 20,
  },
  Status: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: hp(3),
    justifyContent: "center",
  },
  TasksC: {
    elevation: 17,
    width: "100%",
    minHeight: hp(47),
    backgroundColor: "#FDFDFD",
    borderRadius: hp(2.5),
    shadowColor: "#000000",
    paddingTop: hp(3),
    padding: hp(3.5),
  },
  TasksCTs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(1.7),
  },
  TasksCT: {
    fontFamily: "Inter Bold",
    color: "#B53170",
    fontSize: hp(1.7),
  },
  Encomendas: {
    fontFamily: "Inter Bold",
    color: Colors.LightGray,
    fontSize: hp(1.7),
  },
  GHR: {
    backgroundColor: "#EAEAEA",
    width: "100%",
    height: hp(0.3),
    borderRadius: 10,
    marginBottom: 50,
  },
  Task: {
    flexDirection: "row",
    width: "100%",
  },
  Icon: {
    width: hp(7),
    height: hp(6.5),
    borderRadius: hp(1),
    justifyContent: "center",
    alignItems: "center",
    marginRight: hp(2),
  },
  NeoIcon: {
    width: hp(7.5),
    height: hp(7),
    borderRadius: hp(1),
    justifyContent: "center",
    alignItems: "center",
    marginRight: hp(2),
  },
  DateLbl: {
    color: "#A4A4A4",
    fontSize: hp(1.6),
  },
  General: {
    fontWeight: "600",
    color: "#414141",
    fontSize: hp(1.8),
  },
  name: {
    fontWeight: "700",
    color: "#000",
    fontSize: hp(2.6),
  },
  MainTitle: {
    marginTop: 50,
    fontSize: wp(13),
    textAlign: "center",
    fontFamily: "Sansita One",
    color: Colors.Primary,
  },
  input: {
    color: Colors.Text,
    fontFamily: "Nunito Italic",
    height: hp(7),
    fontSize: hp(1.7),
    padding: wp(4),
    width: wp(75),
    backgroundColor: Colors.Secondary,
    borderRadius: wp(5.25),
    marginBottom: hp(5.5),
  },
  eInput: {
    fontFamily: "Nunito Bold Italic",
    borderWidth: wp(0.5),
    borderColor: Colors.Primary,
  },
  button: {
    height: hp(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: wp(5.25),
    marginVertical: hp(1.75),
    width: wp(75),
  },
  dropdown: {
    padding: wp(4),
    width: wp(75),
    backgroundColor: Colors.Secondary,
    borderRadius: wp(5.25),
    height: hp(7),
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  dropdownOpen: {
    borderRadius: 0,
    borderTopEndRadius: wp(5.25),
    borderTopStartRadius: wp(5.25),
  },
  dropText: {
    color: Colors.Label,
    fontFamily: "Nunito Bold Italic",
    fontSize: hp(1.7),
  },
  dropItem: {
    color: Colors.Primary,
    fontSize: hp(1.7),
  },
  cloudbtn: {
    padding: wp(3),
    width: wp(75),
    borderRadius: wp(5.25),
    height: hp(8),
    color: Colors.Text,
    marginBottom: 10,
    fontFamily: "Nunito Italic",
    backgroundColor: Colors.Third,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityLbl: {
    color: Colors.SecText,
    fontSize: hp(1.6),
    fontFamily: "Nunito Bold",
    alignSelf: "flex-start",
    marginVertical: hp(1.8),
  },
});

const StockStyle = StyleSheet.create({
  title: {
    color: Colors.Primary,
    alignSelf: "center",
    marginTop: hp(3),
    marginBottom: hp(9),
    fontSize: hp(3.7),
    fontWeight: "bold",
    width: hp(25),
    textAlign: "center",
  },
  WineTitle: {
    color: "#494949",
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginLeft: wp(10),
  },
  Card: {
    backgroundColor: "#FFF",
    height: hp(26),
    width: hp(16),
    borderRadius: hp(2),
    elevation: hp(1),
    shadowColor: "#00000081",
    marginVertical: hp(3),
    marginLeft: wp(5),
    padding: wp(4),
  },
  quantity: {
    alignSelf: "flex-end",
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: Colors.Primary,
  },
  Label: {
    fontWeight: "bold",
    fontSize: hp(1.8),
  },
});

const SpecStyles = StyleSheet.create({
  EditButton: {
    backgroundColor: Colors.Primary,
    width: wp(18),
    height: wp(12),
    borderRadius: wp(3),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 20,
  },

  EBText: {
    color: "#FFF",
    fontSize: wp(4),
    fontFamily: "Nunito Bold",
  },

  Price: {
    color: "#939393",
    fontSize: hp(4),
    fontWeight: "bold",
  },

  Quantity: {
    color: Colors.Primary,
    fontSize: hp(5),
    fontWeight: "bold",
  },

  Name: {
    width: hp(33),
    alignSelf: "center",
    marginTop: hp(1.5),
    fontSize: hp(3.1),
    fontWeight: "bold",
  },
});

const FinishStyles = StyleSheet.create({
  OrderV: {
    flexDirection: "row",
    marginTop: hp(15),
    marginBottom: hp(7),
  },
  OrderLbL: { alignSelf: "center", fontWeight: "bold", fontSize: hp(3) },
  Icon: {
    width: hp(7),
    height: hp(7),
    borderRadius: hp(1),
    justifyContent: "center",
    alignItems: "center",
    marginRight: hp(2.5),
  },
  total: {
    marginTop: hp(0.5),
    alignSelf: "flex-end",
    color: Colors.Primary,
    fontWeight: "bold",
    fontSize: hp(3),
  },
  button: {
    height: hp(8),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: wp(5.25),
    marginVertical: hp(1.75),
    width: wp(75),
    alignSelf: "center",
  },
});

export {
  MainStyles,
  DashContainers,
  DashAltContainers,
  StockStyle,
  SpecStyles,
  FinishStyles,
};
