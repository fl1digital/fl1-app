import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WorkshopsScreen } from '../scenes/workshops/workshops.component';
import { WorkshopDetailsScreen } from '../scenes/workshops/workshop.component';

const Stack = createStackNavigator();

export const WorkshopsNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Workshops' component={WorkshopsScreen}/>
    <Stack.Screen name='WorkshopDetails' component={WorkshopDetailsScreen}/>
  </Stack.Navigator>
);
