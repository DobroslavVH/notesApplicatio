import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NoteProvider } from "./src/context/NoteContext";
import { TagProvider } from "./src/context/TagContext";
import { AuthProvider } from "./src/context/AuthContext";

import IndexScreen from "./src/screens/IndexScreen";
import CreateScreen from "./src/screens/CreateScreen";
import ShowScreen from "./src/screens/ShowScreen";
import EditScreen from "./src/screens/EditScreen";
import TagScreen from "./src/screens/TagScreen";
import SignupScreen from "./src/screens/SignupScreen";

const Stack = createNativeStackNavigator();

function App() {
  return (
  <NavigationContainer>
    <AuthProvider>
      <TagProvider>
        <NoteProvider>
            <Stack.Navigator initialRouteName="Signup">
              <Stack.Screen name="Signup" component={SignupScreen} options={{title: "Signup"}}/>
              <Stack.Screen name="Index" component={IndexScreen} options={{title: "Notes"}}/>
              <Stack.Screen name="Details" component={ShowScreen} options={{title: "Note Details"}}/>
              <Stack.Screen name="Create" component={CreateScreen} options={{title: "Create Note"}}/>
              <Stack.Screen name="Edit" component={EditScreen} options={{title: "Edit Note"}}/>
              <Stack.Screen name="Tag" component={TagScreen} options={{title: "Tags"}}/>
            </Stack.Navigator>
          </NoteProvider>
        </TagProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

export default App;