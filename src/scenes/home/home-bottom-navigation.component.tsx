import React from 'react';
import { BottomNavigationTab, Divider } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { BrandBottomNavigation } from '../../components/brand-bottom-navigation.component';
import { HomeIcon, CartIcon, BookIcon, MenuIcon, GridIcon } from '../../components/icons';

export const HomeBottomNavigation = (props): React.ReactElement => {

  const onSelect = (index: number): void => {
    props.navigation.navigate(props.state.routeNames[index]);
  };

  return (
    <SafeAreaLayout insets='bottom'>
      <Divider/>
      <BrandBottomNavigation
        appearance='noIndicator'
        selectedIndex={props.state.index}
        onSelect={onSelect}>
        <BottomNavigationTab
          title='Home'
          icon={HomeIcon}
        />
        <BottomNavigationTab
          title='Workshops'
          icon={BookIcon}
        />
        <BottomNavigationTab
          title='Basket'
          icon={CartIcon}
        />
        <BottomNavigationTab
          title='Products'
          icon={GridIcon}
        />
        <BottomNavigationTab
          title='More'
          icon={MenuIcon}
        />
      </BrandBottomNavigation>
    </SafeAreaLayout>
  );
};
