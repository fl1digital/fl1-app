import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CategoriesScreen } from '../scenes/products/categories.component';
import { CategoriesGridScreen } from '../scenes/products/categories-grid.component';
import { CategoriesListScreen } from '../scenes/products/categories-list.component';

const TopTab = createMaterialTopTabNavigator();
const ProductStack = createStackNavigator();

export const ProductsNavigator = (): React.ReactElement => (
  <TopTab.Navigator tabBar={(props) => <CategoriesScreen {...props}/>}>
    <TopTab.Screen name='EcommerceGrid' component={CategoriesGridScreen}/>
    <TopTab.Screen name='EcommerceList' component={CategoriesListScreen}/>
  </TopTab.Navigator>
);