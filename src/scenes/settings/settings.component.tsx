import React from 'react';
import { View, Text } from 'react-native';

export const SettingLinkScreen = (props): React.ReactElement => {

  React.useEffect(()=>{
    props.navigation.addListener('focus', () => {
       // when screen is focused (navigated to)
       props.navigation.openDrawer();
    });  
  })
  return (
    <View>
      
    </View>
  );
};
