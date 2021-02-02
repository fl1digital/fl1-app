import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen } from '../scenes/welcome/welcome.component';
import { Article1Screen } from '../scenes/articles/article-1.component';
import { BlogDetailScreen } from '../scenes/blog/blog-details.component';

const Stack = createStackNavigator();

export const WelcomeNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Welcome' component={WelcomeScreen}/>
    <Stack.Screen name='ArticleDetails' component={BlogDetailScreen}/>
  </Stack.Navigator>
);
