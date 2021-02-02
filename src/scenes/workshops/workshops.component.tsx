import React from 'react';
import axios from 'axios';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ListRenderItemInfo, StyleSheet as RNStyleSheet, ActivityIndicator } from 'react-native';
import { Card, List, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../../components/image-overlay.component';
import { HtmlDecode } from '../../components/display-helpers';
import { MenuIcon } from '../../components/icons';
import HTML from "react-native-render-html";

import { Event, EventSearchParams } from '../../api/wordpress.d';
import { wpGetEventsUrl } from '../../api/wpAPI';

export const WorkshopsScreen = (props): React.ReactElement => {

  const [events, setEvents] = React.useState<Event[]>([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const fetchPosts = async () =>{

    try {
      let params: EventSearchParams = { search :'fl1' };

      const response = await axios.get<Event[]>(wpGetEventsUrl(params));
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);
  
  const onItemPress = (index: number, item: Event): void => {
    props.navigation.navigate('WorkshopDetails',{
      post: item
    });
  };

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={props.navigation.toggleDrawer}
    />
  );

  const renderItem = (info: ListRenderItemInfo<Event>): React.ReactElement => (
    <Card
      style={styles.item}
      onPress={() => onItemPress(info.index, info.item)}>
      <ImageOverlay
        style={styles.itemImage}
        source={{uri: info.item.fimg_url}}>
        <Text
          style={styles.itemTitle}
          category='h1'
          status='control'>
          {HtmlDecode(info.item.title.rendered)}
        </Text>
        <Text
          style={styles.itemDescription}
          category='s1'
          status='control'>
          {HtmlDecode(info.item.excerpt.rendered)}
        </Text>
      </ImageOverlay>
    </Card>
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='Workshops'
        leftControl={renderDrawerAction()}
      />
      <Divider/>
      {loading? <ActivityIndicator />:
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={events}
        renderItem={renderItem}
      />}
    </SafeAreaLayout>
  );
};

const styles = RNStyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
    height: 220,
  },
  itemImage: {
    ...RNStyleSheet.absoluteFillObject,
    height: 220,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemTitle: {
    zIndex: 1,
    fontSize: 26,
    lineHeight: 32,
  },
  itemDescription: {
    zIndex: 1,
    marginVertical: 16,
  },
  itemFooter: {
    position: 'absolute',
    flexDirection: 'row',
    left: 8,
    bottom: 8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  safeArea: {
    flex: 1,
  },
});