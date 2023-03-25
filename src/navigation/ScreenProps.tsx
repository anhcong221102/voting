import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";

export type StackParamList = {
    AuthenticationStack: undefined;
    MainStack: undefined,
    LoginScreen: undefined;
    HomeScreen:undefined
};

type ScreenNavigationProp<T extends keyof StackParamList> = StackNavigationProp<StackParamList, T>;
type ScreenRouteProp<T extends keyof StackParamList> = RouteProp<StackParamList, T>;

export type ScreenProps<T extends keyof StackParamList> = {
    route: ScreenRouteProp<T>;
    navigation: ScreenNavigationProp<T>;
};
