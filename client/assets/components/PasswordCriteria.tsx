import { Text } from "react-native";
import PasswordCt from "./PasswordCt";
import { PasswordSecurity } from "../pages/Home/logreg";
import { View } from "react-native";

const PasswordCriteria: React.FC<{
  input:
    | {
        name: string;
        value: string;
        type: string;
      }
    | undefined; // Update type definition to allow for undefined
}> = ({ input }) => {
  const result =
    input && input?.value ? (
      <View>
        {PasswordSecurity.map((item, index) => (
          <PasswordCt key={index} {...item} password={input.value} />
        ))}
      </View>
    ) : (
      <Text style={{ fontSize: 25, textAlign: "center" }}>
        Palavra-Passe não{`\n`}Preenchida ⚠️
      </Text>
    );

  return result;
};
export default PasswordCriteria;
