import React from 'react';
import { RouteProp } from '@react-navigation/core';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { WelcomeNavigator } from './welcome.navigator';
import { WorkshopsNavigator } from './workshops.navigator';
import { ThemesNavigator } from './themes.navigator';
import { HomeBottomNavigation } from '../scenes/home/home-bottom-navigation.component';
import { ProductsNavigator } from './products.navigator';
import { SettingLinkScreen } from '../scenes/settings/settings.component';
import { HomeDrawer } from '../scenes/home/home-drawer.component';
import { BasketScreen } from '../scenes/basket/basket.component';
import { ProductListScreen } from '../scenes/products/product-list/product-list';
import { ProductDetailsScreen } from '../scenes/products/product-details/product-details';

const BottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

/*
 * When dev is true in .expo/settings.json (started via `start:dev`),
 * open Components tab as default.
 */
const initialTabRoute: string = __DEV__ ? 'Welcome' : 'Welcome';

/*
 * Can we access it from `HomeNavigator`?
 */
const ROOT_ROUTES: string[] = ['Welcome', 'Cart', 'Workshops', 'Products','ArticleDetails', 'WorkshopDetails', 'EcommerceList', 'EcommerceGrid', 'More'];

const isOneOfRootRoutes = (currentRoute: RouteProp<any, any>): boolean => {
  return ROOT_ROUTES.find(route => currentRoute.name === route) !== undefined;
};

const TabBarVisibleOnRootScreenOptions = ({ route }): BottomTabNavigationOptions => {
  const currentRoute = route.state && route.state.routes[route.state.index];
  return { tabBarVisible: currentRoute && isOneOfRootRoutes(currentRoute) };
};

const HomeTabsNavigator = (): React.ReactElement => (  <BottomTab.Navigator
    screenOptions={TabBarVisibleOnRootScreenOptions}
    initialRouteName={initialTabRoute}
    tabBar={props => <HomeBottomNavigation {...props} />}>
    <BottomTab.Screen name='Welcome' component={WelcomeNavigator}/>
    <BottomTab.Screen name='Workshops' component={WorkshopsNavigator}/>
    <BottomTab.Screen name='Cart' component={BasketScreen}/>
    <BottomTab.Screen name='Products' component={ProductsNavigator}/>
    <BottomTab.Screen name='More' component={SettingLinkScreen}/>
    <BottomTab.Screen name='Settings' component={ThemesNavigator}/>
    <BottomTab.Screen name='ProductList' component={ProductListScreen}/>
    <BottomTab.Screen name='ProductDetails' component={ProductDetailsScreen}/>
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator
    screenOptions={{ gestureEnabled: false }}
    drawerContent={props => <HomeDrawer {...props}/>}>
    <Drawer.Screen name='Home' component={HomeTabsNavigator}/>
  </Drawer.Navigator>
);
