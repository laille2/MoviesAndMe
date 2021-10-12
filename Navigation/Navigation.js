import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from '../Components/Favorites';
import { Image, StyleSheet } from 'react-native';
import Test from '../Components/Test';

const SearchStack = createNativeStackNavigator();

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator initialRouteName="Rechercher">
      <SearchStack.Screen name="Rechercher" component={Search} />
      <SearchStack.Screen name="Film" component={FilmDetail} />
    </SearchStack.Navigator>
  )
}

const FavoritesStack = createNativeStackNavigator();

function FavorisStackNavigator() {
  return (
    <FavoritesStack.Navigator initialRouteName="Rechercher">
      <FavoritesStack.Screen name="Favoris" component={Favorites} />
      <FavoritesStack.Screen name="Film" component={FilmDetail} />
    </FavoritesStack.Navigator>
  )
}

const MoviesTab = createBottomTabNavigator();

function MoviesTabNavigator() {
  return (
    <MoviesTab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveBackgroundColor: '#DDDDDD',
      tabBarInactiveBackgroundColor: '#FFFFFF'
    }}>
      <MoviesTab.Screen
        name="Tab_Rechercher"
        options={{
          tabBarIcon: () => {
            return <Image source={require('../Images/ic_search.png')} style={styles.icon} />
          }
        }} component={SearchStackNavigator} />
      <MoviesTab.Screen
        name="Tab_Favorites"
        options={{
          tabBarIcon: () => {
            return <Image source={require('../Images/ic_favorite.png')} style={styles.icon} />
          }
        }}
        component={FavorisStackNavigator} />
      {/* <MoviesTab.Screen
        name="Test"
        options={{
          headerShown: true,
          tabBarIcon: () => {
            return <Image source={require('../Images/test.png')} style={styles.icon_test} />
          }
        }} component={Test} /> */}
    </MoviesTab.Navigator>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  },
  icon_test: {
    width: 60,
    height: 30
  }
})

export default function Navigation() {
  return (
    <NavigationContainer>
      <MoviesTabNavigator />
    </NavigationContainer>
  );
}