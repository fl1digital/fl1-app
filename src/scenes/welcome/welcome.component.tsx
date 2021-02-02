import React from 'react';
import axios from 'axios';
import { Divider, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import {
  ImageBackground,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { Button, List, Text } from '@ui-kitten/components';
import { ImageOverlay } from './image-overlay.component';
import { MenuIcon } from '../../components/icons';
import { HtmlDecode } from '../../components/display-helpers';

import { Post, PostSearchParams } from '../../api/wordpress.d';
import { wpGetPostsUrl } from '../../api/wpAPI';

export const WelcomeScreen = (props): React.ReactElement => {

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const fetchPosts = async () =>{

    try {
      let params: PostSearchParams = { search :'fl1' };

      const response = await axios.get<Post[]>(wpGetPostsUrl(params));
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);

  const onItemPress = (index: number, item: Post): void => {
    props.navigation.navigate('ArticleDetails',{
      post: item
    });
  };

  const renderDrawerAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={props.navigation.toggleDrawer}
    />
  );

  const isItemReverse = (index: number): boolean => {
    return index % 2 === 1;
  };

  const renderHeadingItem = (): React.ReactElement => (
    <ImageOverlay
      style={styles.headingArticleContainer}
      source={{ uri: ('https://fl1digital.com/stuff/uploads/Blog-820x421.png')}}>
      <Text
        style={styles.headingArticleTitle}
        status='control'
        category='h3'>
        Web Design and Development at its best
      </Text>
      <Text
        style={styles.headingArticleDescription}
        category='h6'
        status='control'>
        Our process is simple, streamlined and set up in a way that will make sense to you. 
      </Text>
      <Button
        style={styles.readButton}
        status='control'
        onPress={() => onItemPress(0, null)}>
        FIND OUT MORE
      </Button>
    </ImageOverlay>
  );

  const renderArticleItem = (info: ListRenderItemInfo<Post>): React.ReactElement => (
    <TouchableOpacity
      style={[styles.item, isItemReverse(info.index) && styles.itemReverse]}
      activeOpacity={0.95}
      onPress={() => onItemPress(info.index + 1, info.item)}>
      <ImageBackground
        style={styles.itemSection}
        source={{uri: info.item.fimg_url}}
      />
      <View style={styles.itemSection}>
        <Text
          style={styles.itemTitle}
          category='h5'>
            {HtmlDecode(info.item.title.rendered)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaLayout
      style={styles.safeArea}
      insets='top'>
      <TopNavigation
        title='FL1 App'
        leftControl={renderDrawerAction()}
      />
      <Divider/>
      {loading ? <ActivityIndicator /> : 
      <List
        style={styles.list}
        data={posts}
        renderItem={renderArticleItem}
        ListHeaderComponent={renderHeadingItem}
      />}
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  readButton: {
    width: '50%',
    marginTop: 32,
  },
  headingArticleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
  },
  headingArticleTitle: {
    zIndex: 1,
    textAlign: 'center',
  },
  headingArticleDescription: {
    padding: 10,
    zIndex: 1,
  },
  item: {
    flexDirection: 'row',
    minHeight: 188,
  },
  itemReverse: {
    flexDirection: 'row-reverse',
  },
  itemSection: {
    flex: 1,
    padding: 16,
  },
  itemReactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: -8,
  },
  itemTitle: {
    flex: 1,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  safeArea: {
    flex: 1,
  },
});