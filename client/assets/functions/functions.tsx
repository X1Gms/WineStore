import FontsLoader from "./FontsLoader";
import { TextProps } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { AuthProvider } from "./global";

const Functions: React.FC<TextProps> = ({ children }) => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootSiblingParent>
        <NavigationContainer>
          <FontsLoader>
            <AuthProvider>{children}</AuthProvider>
          </FontsLoader>
        </NavigationContainer>
      </RootSiblingParent>
    </GestureHandlerRootView>
  );
};
export default Functions;
