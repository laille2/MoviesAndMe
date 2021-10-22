import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favorites from '../Components/Favorites';
import { Image, StyleSheet } from 'react-native';
import News from '../Components/News';
import Viewed from '../Components/Viewed';

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

const NewsStack = createNativeStackNavigator();

function NewsStackNavigator() {
  return (
    <NewsStack.Navigator initialRouteName="Les Derniers Films">
      <NewsStack.Screen name="Les Derniers Films" component={News} />
      <NewsStack.Screen name="Film" component={FilmDetail} />
    </NewsStack.Navigator>
  )
}

const ViewedStack = createNativeStackNavigator();

function ViewedStackNavigator() {
  return (
    <ViewedStack.Navigator initialRouteName="Films vus">
      <ViewedStack.Screen name="Films vus" component={Viewed} />
      <ViewedStack.Screen name="Film" component={FilmDetail} />
    </ViewedStack.Navigator>
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
      <MoviesTab.Screen
        name="Tab_News"
        options={{
          tabBarIcon: () => {
            return <Image source={require('../Images/ic_fiber_new.png')} style={styles.icon} />
          }
        }}
        component={NewsStackNavigator} />
      <MoviesTab.Screen
        name="Tab_Viewed"
        options={{
          tabBarIcon: () => {
            return <Image source={require('../Images/checked.png')} style={styles.icon} />
          }
        }}
        component={ViewedStackNavigator} />
    </MoviesTab.Navigator>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
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