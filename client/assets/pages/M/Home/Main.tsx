import { Text, View, Pressable } from "react-native";
import { MainStyles } from "./mainset";
import Icon from "react-native-vector-icons/Feather";
import { DashContainers as DC, DashAltContainers } from "./mainset";
import * as Animatable from "react-native-animatable";
import LGContainer from "./LGContainer";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveData } from "../../../json/global";
import Requests from "../../../components/Requests";
import { useFocusEffect } from "@react-navigation/native";
import OrderItem from "./OrderItem";
import { useGoto } from "../../../json/global";

const Main: React.FC = () => {
  const [type, SetType] = useState(false);

  const [myName, setMyName] = useState<string | null>(null);

  const [DashContainers, SetDC] = useState(DC);

  const [Orders, SetOrders] = useState([]);

  const GoTo = useGoto();

  const fetchData = async () => {
    const name = await retrieveData("name");
    setMyName(name);

    const getInfo = await Requests("getinfo", "GET");

    const getOrders = await Requests("getorder", "GET");

    if (getOrders && getOrders.length > 0) {
      getOrders.map((item: any) => {
        const date = new Date(item.createdAt);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;

        item.createdAt = formattedDate;
      });
    }

    const uD = DashContainers.map((item, index) => ({
      ...item,
      number: index < getInfo.length ? getInfo[index] : item.number,
    }));

    SetDC(uD);
    SetOrders(getOrders);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const Toggle = () => SetType((prev) => !prev);

  return (
    <View style={{ backgroundColor: "#FFF" }}>
      <View style={{ marginTop: 50, marginHorizontal: 25 }}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View>
            <Text style={MainStyles.Welcome}>Bem-Vindo(a) de Volta</Text>
            <Text style={MainStyles.MyName}>{myName}</Text>
          </View>
          <Pressable
            style={[MainStyles.returnButton, { marginRight: 10 }]}
            onPress={async () => {
              await AsyncStorage.setItem("info", "");
              GoTo("Login");
            }}
          >
            <Icon name="log-out" size={30} color="#B53170" />
          </Pressable>
        </View>
        <Animatable.View
          animation={type ? "fadeOutRight" : "fadeInLeft"}
          duration={1000}
          style={[MainStyles.Status, { display: type ? "none" : "flex" }]}
        >
          {DashContainers.map((item, index) => (
            <LGContainer
              key={index}
              id={index}
              {...item}
              onPress={() => {
                switch (index) {
                  case DashContainers.length - 1:
                    Toggle();
                }
              }}
            />
          ))}
        </Animatable.View>

        <Animatable.View
          animation={type ? "fadeInLeft" : "fadeOutRight"}
          duration={1000}
          style={[MainStyles.Status, { display: type ? "flex" : "none" }]}
        >
          {DashAltContainers.map((item, index) => (
            <LGContainer
              id={index}
              key={index}
              {...item}
              onPress={() => {
                switch (index) {
                  case 0:
                    GoTo("CreateSection");
                    break;
                  case 1:
                    GoTo("AddBottle");
                    break;
                  case 2:
                    GoTo("AddOrder");
                    break;
                  case DashAltContainers.length - 1:
                    Toggle();
                    break;
                }
              }}
            />
          ))}
        </Animatable.View>

        <Animatable.View
          style={MainStyles.TasksC}
          animation="fadeInUp"
          duration={1000}
        >
          <View style={MainStyles.TasksCTs}>
            <Text style={MainStyles.Encomendas}>Encomendas</Text>
            <Pressable onPress={() => GoTo("ViewOrders", Orders)}>
              <Text style={MainStyles.TasksCT}>Ver Todas</Text>
            </Pressable>
          </View>
          <View style={MainStyles.GHR}></View>
          <View>
            {Orders.length > 0 ? (
              Orders.slice(0, 3).map((item, index) => (
                <OrderItem data={item} key={index} />
              ))
            ) : (
              <Text>Nenhuma Encomenda Efetuada</Text>
            )}
          </View>
        </Animatable.View>
      </View>
    </View>
  );
};
export default Main;
