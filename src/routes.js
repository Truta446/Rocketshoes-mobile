import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from './pages/Main';
import Cart from './pages/Cart';
import Header from './components/Header';
import colors from './styles/colors';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.dark,
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerTitleAlign: 'center',
                    headerBackTitleVisible: false,
                    headerTitle: () => <Header />,
                    cardStyle: {
                        backgroundColor: colors.dark,
                    },
                }}>
                <Stack.Screen name="Home" component={Main} />
                <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
