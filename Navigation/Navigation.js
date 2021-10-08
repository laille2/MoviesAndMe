/* import { createAppContainer } from 'react-navigation' */
/* import { createStackNavigator } from 'react-navigation-stack' */
/* import Search from '../Components/Search' */

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';

/* const SearchStackNavigator = createStackNavigator({
  Search: { 
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  }
})

export default createAppContainer(SearchStackNavigator) */

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Rechercher">
        <Stack.Screen name="Rechercher" component={Search} />
        <Stack.Screen name="Film" component={FilmDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}