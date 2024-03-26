import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./Home/Main";
import Stock from "./Stock/Stock";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../json/global";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";
const MainContainer = () => {
  const Tab = createBottomTabNavigator();

  const { width } = Dimensions.get("window");

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = "";
          let rn: string = route.name;

          if (rn === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Stock") {
            iconName = focused ? "clipboard" : "clipboard-outline";
          }

          return <Icon name={iconName} size={hp(3)} color={color} />;
        },

        headerShown: false,
        tabBarActiveTintColor: Colors.Primary,
        tabBarItemStyle: { flexDirection: "column" },

        tabBarLabelStyle: {
          paddingBottom: hp(1),
          fontSize: hp(1.5),
        },
        tabBarIconStyle: {
          height: hp(3),
          width: hp(3),
          marginLeft: width >= 600 ? 20 : 0,
        },
        tabBarStyle: {
          padding: 10,
          height: hp(8),
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
      })}
    >
      <Tab.Screen name="Home" component={Main} />
      <Tab.Screen name="Stock" component={Stock} />
    </Tab.Navigator>
  );
};
export default MainContainer;
