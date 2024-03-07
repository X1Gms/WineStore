import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./assets/pages/Home/Login";
import Register from "./assets/pages/Home/Register";
import Main from "./assets/pages/Main/Main";
import Functions from "./assets/functions/functions";
import CreateSection from "./assets/pages/CreateSection/CreateSection";
import AddBottle from "./assets/pages/AddBottle/AddBottle";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Functions>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="AddBottle" component={AddBottle} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="CreateSection" component={CreateSection} />
      </Stack.Navigator>
    </Functions>
  );
}
