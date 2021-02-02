import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TopNavigation, TopNavigationAction, Avatar, Button, Divider, Layout, Text } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ArrowIosBackIcon } from '../../components/icons';
import { ImageOverlay } from '../../components/image-overlay.component';
import { DispayDate } from '../../components/display-helpers';
import { HtmlDecode } from '../../components/display-helpers';
import HTML from "react-native-render-html";

export const BlogDetailScreen = ({ navigation, route }): React.ReactElement => {

  // De-structure the Routing Params to find out what category we're looking at 
  const { post } = route.params;

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='From the Blog'
        leftControl={renderBackAction()}
      />
      <ScrollView style={styles.container}>
        <ImageOverlay
          style={styles.headerContainer}
          source={{ uri: (post.fimg_url)}}>
          <Text
            style={styles.headerTitle}
            category='h1'
            status='control'>
            {HtmlDecode(post.title.rendered)}
          </Text>
        </ImageOverlay>
        <Layout
          style={styles.contentContainer}
          level='1'>
          <Text>
              <HTML source={{ html: post.content.rendered }} />
          </Text>
        </Layout>
        <Divider/>
        <View style={styles.activityContainer}>
          <Avatar source={{ uri: ('https://hub.fl1digital.com/wp-content/uploads/2018/03/jas.jpg')}}/>
          <View style={styles.authoringInfoContainer}>
            <Text>
              FL1 Digital
            </Text>
            <Text
              appearance='hint'
              category='p2'>
              {DispayDate(post.date)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    minHeight: 256,
    paddingVertical: 24,
  },
  headerTitle: {
    textAlign: 'center',
    marginVertical: 24,
    zIndex: 1,
  },
  headerDescription: {
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  authoringInfoContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});

