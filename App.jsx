import MainFragment from "./assets/components/fragments/MainFragment";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DashBoard from "./assets/components/fragments/DashBoard";
import { Provider } from "react-redux";
import store from "./assets/components/redux/store";
import FontLoader from "./assets/fonts/FontsLoader";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <FontLoader>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={MainFragment} />
            <Stack.Screen name="HomePage" component={DashBoard} />
          </Stack.Navigator>
        </NavigationContainer>
      </FontLoader>
    </Provider>
  );
};
export default App;
