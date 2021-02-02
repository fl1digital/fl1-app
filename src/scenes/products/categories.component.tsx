import React from 'react';
import { Tab, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { BrandTabBar } from '../../components/brand-tab-bar.component';
import { MenuIcon, GridIcon, ListIcon } from '../../components/icons';

export const CategoriesScreen = ({ navigation, state }): React.ReactElement => {

  const onTabSelect = (index: number): void => {
    navigation.navigate(state.routeNames[index]);
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={navigation.toggleDrawer}
    />
  );

  return (
    <SafeAreaLayout insets='top'>
      <TopNavigation
        title='Products and Merchandise'
        leftControl={renderBackAction()}
      />
      <BrandTabBar
        selectedIndex={state.index}
        onSelect={onTabSelect}>
        <Tab icon={GridIcon}/>
        <Tab icon={ListIcon}/>
      </BrandTabBar>
    </SafeAreaLayout>
  );
};
