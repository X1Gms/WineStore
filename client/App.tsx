import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./assets/pages/Home/Login";
import Register from "./assets/pages/Home/Register";
import Functions from "./assets/functions/functions";
import CreateSection from "./assets/pages/M/CreateSection/CreateSection";
import AddBottle from "./assets/pages/M/AddBottle/AddBottle";
import MainContainer from "./assets/pages/M/MainContainer";
import EditBottle from "./assets/pages/M/EditBottle/EditBottle";
import Specifications from "./assets/pages/M/Specifications/Specifications";
import AddOrder from "./assets/pages/M/Orders/AddOrder";
import ViewOrders from "./assets/pages/VOrders/ViewOrders";
import FinishLine from "./assets/pages/FinishLine/FinishLine";

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
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="CreateSection" component={CreateSection} />
        <Stack.Screen name="EditBottle" component={EditBottle} />
        <Stack.Screen name="Specs" component={Specifications} />
        <Stack.Screen name="AddOrder" component={AddOrder} />
        <Stack.Screen name="ViewOrders" component={ViewOrders} />
        <Stack.Screen name="FinishLine" component={FinishLine} />
      </Stack.Navigator>
    </Functions>
  );
}
