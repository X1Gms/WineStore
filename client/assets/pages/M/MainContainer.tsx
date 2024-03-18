import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from "./Home/Main";
import Stock from "./Stock/Stock";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../../json/global";
const MainContainer = () => {
  const Tab = createBottomTabNavigator();

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

          return <Icon name={iconName} size={size} color={color} />;
        },

        headerShown: false,
        tabBarActiveTintColor: Colors.Primary,
        tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
        tabBarStyle: {
          padding: 10,
          height: 60,
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
