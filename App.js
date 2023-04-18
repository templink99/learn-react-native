import { Ionicons, MaterialIcons, Foundation } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";

import { Colors } from "./constants/styles";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import Screen3 from "./screens/Screen3";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.secondary100 },
        headerTintColor: Colors.primary100,
        drawerActiveBackgroundColor: Colors.primary500,
        drawerActiveTintColor: "white",
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name="home" size={size} focused={focused} color={color} />
          ),
          headerRight: ({ tintColor }) => (
            <MaterialIcons
              name="logout"
              size={24}
              style={{ marginRight: 8 }}
              color={tintColor}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Screen 1"
        component={Screen1}
        options={{
          title: "Screen 1",
          drawerIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name="screen-search-desktop"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Screen 2"
        component={Screen2}
        options={{
          title: "Screen 2",
          drawerIcon: ({ focused, color, size }) => (
            <Foundation name="projection-screen" size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Screen 3"
        component={Screen3}
        options={{
          title: "Screen 3",
          drawerIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name="screen-search-desktop"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerStyle: { backgroundColor: Colors.primary500 },
    //   headerTintColor: "white",
    //   contentStyle: { backgroundColor: Colors.secondary100 },
    // }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.secondary100 },
        headerTintColor: Colors.primary100,
        drawerActiveBackgroundColor: Colors.primary500,
        drawerActiveTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <MaterialIcons
              name="logout"
              size={24}
              style={{ marginRight: 8 }}
              color={tintColor}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
