import React from 'react';
import { Image, ImageSourcePropType, ListRenderItemInfo, ScrollView, } from 'react-native';
import { Button, Card, Icon, List, StyleService, Text, useStyleSheet, TopNavigation, TopNavigationAction, } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { ImageOverlay } from '../../components/image-overlay.component';
import { ArrowIosBackIcon } from '../../components/icons';
import { DispayDate } from '../../components/display-helpers';
import { HtmlDecode } from '../../components/display-helpers';
import HTML from "react-native-render-html";

export const WorkshopDetailsScreen = ({ navigation, route }): React.ReactElement => {

  // De-structure the Routing Params to find out what Workshop we're looking at 
  const { post } = route.params;

  const styles = useStyleSheet(themedStyles);

  const onBookButtonPress = (): void => {
    console.log("option pressed");
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  const renderImageItem = (info: ListRenderItemInfo<ImageSourcePropType>): React.ReactElement => (
    <Image
      style={styles.imageItem}
      source={info.item}
    />
  );

  const renderDetailItem = (detail: string, index: number): React.ReactElement => (
    <Button
      key={index}
      style={styles.detailItem}
      appearance='outline'
      size='tiny'>
      {detail}
    </Button>
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Book a Workshop'
        leftControl={renderBackAction()}
      />
      
    <ScrollView style={styles.container}>
      <ImageOverlay
        style={styles.image}
        source={{ uri: (post.fimg_url)}}
        />
      <Card
        style={styles.bookingCard}
        appearance='filled'
        disabled={true}
        >
        <Text
          style={styles.title}
          category='h6'>
          {HtmlDecode(post.title.rendered)}
        </Text>
        <Text
          style={styles.rentLabel}
          appearance='hint'
          category='p2'>
          {DispayDate(post.date)}
        </Text>
        <Text
          style={styles.priceLabel}
          category='h6'>
          £25
        </Text>
        <Button
          style={styles.bookButton}
          onPress={onBookButtonPress}>
          BOOK NOW
        </Button>
      </Card>
      <Text
        style={styles.sectionLabel}
        category='s1'>
        About
      </Text>
      <Text
        style={styles.description}
        appearance='hint'>
       <HTML source={{ html: post.content.rendered }} />
      </Text>
    </ScrollView>
    </SafeAreaLayout>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-2',
  },
  image: {
    height: 360,
  },
  bookingCard: {
    marginTop: -80,
    margin: 16,
  },
  title: {
    width: '65%',
  },
  rentLabel: {
    marginTop: 24,
  },
  priceLabel: {
    marginTop: 8,
  },
  bookButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  detailsList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  optionList: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 8,
  },
  optionItem: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  description: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  sectionLabel: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  imagesList: {
    padding: 8,
    backgroundColor: 'background-basic-color-2',
  },
  imageItem: {
    width: 180,
    height: 120,
    borderRadius: 8,
    marginHorizontal: 8,
  },
});
