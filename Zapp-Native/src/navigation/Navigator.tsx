import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Account from '../screens/Account';
import History from '../screens/History';
import {NavigationContainer} from '@react-navigation/native';
import {useUserContext} from '../hooks/ContextHooks';
import Welcome from '../screens/welcome/Welcome';

import Login from '../screens/welcome/Login';
import RegisterStep1 from '../screens/welcome/RegisterStep1';
import RegisterStep2 from '../screens/welcome/RegisterStep2';
import RegisterStep3 from '../screens/welcome/RegisterStep3';
import RegisterStep4 from '../screens/welcome/RegisterStep4';
import Loading from '../screens/welcome/Loading';
import {Ionicons} from '@expo/vector-icons';
import About from '../screens/About';
import Usage from '../screens/Usage';
import Payments from '../screens/Payments';
import Contact from '../screens/Contact';
import Help from '../screens/Help';
import App from '../App';
import OnDrive from '../screens/OnDrive';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#093331',
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        },
        tabBarActiveTintColor: '#1af3cf',
        tabBarInactiveTintColor: '#f9fcfa',
        tabBarIcon: ({color, size}) => {
          let iconName:
            | 'home-outline'
            | 'person-outline'
            | 'time-outline'
            | undefined;

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Account') {
            iconName = 'person-outline';
          } else if (route.name === 'History') {
            iconName = 'time-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="Loading"
        component={Loading}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerShown: false, animation: 'none'}}
      />

      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{title: 'Kirjaudu sisään'}}
      />

      <AuthStack.Screen
        name="RegisterStep1"
        component={RegisterStep1}
        options={{title: 'Rekisteröidy (1/4)'}}
      />
      <AuthStack.Screen
        name="RegisterStep2"
        component={RegisterStep2}
        options={{title: 'Rekisteröidy (2/4)'}}
      />
      <AuthStack.Screen
        name="RegisterStep3"
        component={RegisterStep3}
        options={{title: 'Rekisteröidy (3/4)'}}
      />
      <AuthStack.Screen
        name="RegisterStep4"
        component={RegisterStep4}
        options={{title: 'Rekisteröidy (4/4)'}}
      />
    </AuthStack.Navigator>
  );
};

const AppStack = createNativeStackNavigator();

const AppStackScreen = () => {
  return (
    <AppStack.Navigator screenOptions={{headerShown: false}}>
      <AppStack.Screen name="About" component={About} />
      <AppStack.Screen name="Payments" component={Payments} />
      <AppStack.Screen name="Contact" component={Contact} />
      <AppStack.Screen name="Help" component={Help} />
      <AppStack.Screen name="Usage" component={Usage} />
      <AppStack.Screen name="OnDrive" component={OnDrive} />
      {/* Add other screens here */}
    </AppStack.Navigator>
  );
};

const SortStack = createNativeStackNavigator();

const SortStackScreen = () => {
  return (
    <SortStack.Navigator>
      {/* Add your sort screens here */}
      <SortStack.Screen name="Sort" component={Home} />
    </SortStack.Navigator>
  );
};

// Example of a nested stack navigator for Help and Contact screens
// const HelpStack = createNativeStackNavigator();
// const HelpStackScreen = () => {
//   return (
//     <HelpStack.Navigator>
//       <HelpStack.Screen name="Help" component={Help} />
//       <HelpStack.Screen name="Contact" component={Contact} />
//     </HelpStack.Navigator>
//   );
// };

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="App" component={TabScreen} />
      <Stack.Screen name="AppStack" component={AppStackScreen} />
      <Stack.Screen name="SortStack" component={SortStackScreen} />
      {/* <Stack.Screen name="HelpStack" component={HelpStackScreen} /> */}
    </Stack.Navigator>
  );
};

const Navigator = () => {
  const {user} = useUserContext();
  return (
    <>
      {user ? (
        <NavigationContainer>
          <StackScreen />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthStackScreen />
        </NavigationContainer>
      )}
    </>
  );
};

export {Navigator};

// export default AppNavigator;
