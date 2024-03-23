import { StyleSheet } from "react-native";
import { Colors } from "../../../json/global";

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
    fontSize: 13,
    fontFamily: "Nunito Bold",
    color: Colors.LightGray,
  },
  MyName: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 5,
  },
  returnButton: {
    elevation: 10,
    padding: 15,
    backgroundColor: "#FFF",
    width: 60,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  Status: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 25,
    justifyContent: "center",
  },
  TasksC: {
    elevation: 17,
    width: "100%",
    minHeight: 450,
    backgroundColor: "#FDFDFD",
    borderRadius: 20,
    shadowColor: "#000000",
    paddingTop: 20,
    padding: 30,
  },
  TasksCTs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  TasksCT: {
    fontFamily: "Inter Bold",
    color: "#B53170",
  },
  Encomendas: {
    fontFamily: "Inter Bold",
    color: Colors.LightGray,
  },
  GHR: {
    backgroundColor: "#EAEAEA",
    width: "100%",
    height: 3,
    borderRadius: 10,
    marginBottom: 50,
  },
  Task: {
    flexDirection: "row",
    width: "100%",
  },
  Icon: {
    width: 55,
    height: 53,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  NeoIcon: {
    width: 47,
    height: 47,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  DateLbl: {
    color: "#A4A4A4",
    fontSize: 13,
  },
  General: {
    fontWeight: "600",
    color: "#414141",
  },
  name: {
    fontWeight: "700",
    color: "#000",
    fontSize: 20,
  },
  MainTitle: {
    marginTop: 50,
    fontSize: 45,
    textAlign: "center",
    fontFamily: "Sansita One",
    color: Colors.Primary,
  },
  input: {
    color: Colors.Text,
    fontFamily: "Nunito Italic",
    padding: 15,
    width: 285,
    backgroundColor: Colors.Secondary,
    borderRadius: 20,
  },
  eInput: {
    fontFamily: "Nunito Bold Italic",
    borderWidth: 2,
    borderColor: Colors.Primary,
  },
  button: {
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: 20,
    marginVertical: 15,
    width: 285,
  },
  dropdown: {
    padding: 15,
    width: 285,
    backgroundColor: Colors.Secondary,
    borderRadius: 20,
    height: 61,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  dropdownOpen: {
    borderRadius: 0,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  dropText: {
    color: Colors.Label,
    fontFamily: "Nunito Bold Italic",
  },
  dropItem: {
    color: Colors.Primary,
  },
  cloudbtn: {
    color: Colors.Text,
    marginBottom: 10,
    fontFamily: "Nunito Italic",
    padding: 15,
    width: 285,
    backgroundColor: Colors.Third,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityLbl: {
    color: Colors.SecText,
    fontSize: 13,
    fontFamily: "Nunito Bold",
    alignSelf: "flex-start",
    marginVertical: 15,
  },
});

const StockStyle = StyleSheet.create({
  title: {
    color: Colors.Primary,
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 80,
    fontSize: 30,
    fontWeight: "bold",
    width: 220,
    textAlign: "center",
  },
  WineTitle: {
    color: "#494949",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 40,
  },
  Card: {
    backgroundColor: "#FFF",
    height: 220,
    width: 130,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#00000081",
    marginVertical: 20,
    marginLeft: 20,
    padding: 15,
  },
  quantity: {
    alignSelf: "flex-end",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.Primary,
  },
  Label: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

const SpecStyles = StyleSheet.create({
  EditButton: {
    backgroundColor: Colors.Primary,
    width: 75,
    height: 45,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 20,
  },

  EBText: {
    color: "#FFF",
    fontSize: 17,
    fontFamily: "Nunito Bold",
  },

  Price: {
    color: "#939393",
    fontSize: 30,
    fontWeight: "bold",
  },

  Quantity: {
    color: Colors.Primary,
    fontSize: 40,
    fontWeight: "bold",
  },

  Name: {
    width: 265,
    alignSelf: "center",
    marginTop: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
});

const FinishStyles = StyleSheet.create({
  OrderV: {
    flexDirection: "row",
    marginTop: 120,
    marginBottom: 60,
  },
  OrderLbL: { alignSelf: "center", fontWeight: "bold", fontSize: 25 },
  Icon: {
    width: 55,
    height: 55,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  total: {
    marginTop: 5,
    alignSelf: "flex-end",
    color: Colors.Primary,
    fontWeight: "bold",
    fontSize: 25,
  },
  button: {
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: 20,
    marginVertical: 15,
    width: 285,
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
