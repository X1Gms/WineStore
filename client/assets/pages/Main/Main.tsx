import { Text, View, ScrollView, Pressable } from "react-native";
import { MainStyles } from "./mainset";
import Icon from "react-native-vector-icons/Feather";
import { DashContainers as DC, DashAltContainers } from "./mainset";
import * as Animatable from "react-native-animatable";
import LGContainer from "./LGContainer";
import { useCallback, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { retrieveData } from "../../json/global";
import Requests from "../../components/Requests";
import { useFocusEffect } from "@react-navigation/native";

const Main: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [type, SetType] = useState(false);

  const [myName, setMyName] = useState<string | null>(null);

  const [DashContainers, SetDC] = useState(DC);

  const fetchData = async () => {
    const name = await retrieveData("name");
    setMyName(name);

    const getInfo = await Requests("getinfo", "GET", null);
    console.log(getInfo);

    const uDashContainers = DashContainers.map((item, index) => ({
      ...item,
      number: index < getInfo.length ? getInfo[index] : item.number,
    }));

    SetDC(uDashContainers);
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const Toggle = () => SetType((prev) => !prev);

  const GoTo = (location: string) => {
    navigation.navigate(location);
  };

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
            <Text style={MainStyles.TasksCT}>Ver Todas</Text>
          </View>
          <View style={MainStyles.GHR}></View>
          <View>
            <View style={MainStyles.Task}>
              <LinearGradient
                colors={["#FA69AE", "#B53170"]}
                style={MainStyles.Icon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="package" size={31} color="#FFF"></Icon>
              </LinearGradient>
              <View
                style={{
                  justifyContent: "center",
                  marginBottom: 35,
                  flexWrap: "wrap",
                }}
              >
                <Text style={MainStyles.General}>Encomenda</Text>
                <Text style={MainStyles.name}>João Sampaio</Text>
              </View>
            </View>
            <View style={MainStyles.Task}>
              <LinearGradient
                colors={["#FA69AE", "#B53170"]}
                style={MainStyles.Icon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="package" size={31} color="#FFF"></Icon>
              </LinearGradient>
              <View
                style={{
                  justifyContent: "center",
                  marginBottom: 35,
                  flexWrap: "wrap",
                }}
              >
                <Text style={MainStyles.General}>Encomenda</Text>
                <Text style={MainStyles.name}>Manuel Fernandes</Text>
              </View>
            </View>
            <View style={MainStyles.Task}>
              <LinearGradient
                colors={["#FA69AE", "#B53170"]}
                style={MainStyles.Icon}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Icon name="package" size={31} color="#FFF"></Icon>
              </LinearGradient>
              <View
                style={{
                  justifyContent: "center",
                  marginBottom: 35,
                  flexWrap: "wrap",
                }}
              >
                <Text style={MainStyles.General}>Encomenda</Text>
                <Text style={MainStyles.name}>Daniel Duarte</Text>
              </View>
            </View>
          </View>
        </Animatable.View>
      </View>
    </View>
  );
};
export default Main;
