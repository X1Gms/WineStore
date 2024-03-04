import { StyleSheet } from "react-native";
import { Colors } from "../../json/global";

const DashContainers = [
  {
    number: 33,
    title: "Garrafas",
    gradient: ["#F89797", "#FF2727"],
    color: "#FFA0A0",
    type: 0,
  },
  {
    number: 9,
    title: "Secções",
    gradient: ["#FDD891", "#FFC327"],
    color: "#FFEBB7",
    type: 0,
  },
  {
    number: 13,
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
    number: "corner-down-left",
    title: "Voltar",
    gradient: ["#C3FF9E", "#1ED800"],
    color: "#BEFFB4",
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
  General: {
    fontWeight: "600",
    color: "#414141",
  },
  name: {
    fontWeight: "700",
    color: "#000",
    fontSize: 20,
  },
});

export { MainStyles, DashContainers, DashAltContainers };
