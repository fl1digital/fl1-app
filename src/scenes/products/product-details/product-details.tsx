import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  ScrollView,
} from 'react-native';
import { TopNavigation, TopNavigationAction, Button, Card, Icon, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../../components/safe-area-layout.component';
import { ImageOverlay } from '../../../components/image-overlay.component';
import { ArrowIosBackIcon, CartIcon } from '../../../components/icons';
import { HtmlDecode } from '../../../components/display-helpers';
import { CartContextType} from '../../../api/woocommerce.d';
import { CartContext } from '../../../services/cart-context';
import HTML from "react-native-render-html";

export const ProductDetailsScreen = ({ navigation, route }): React.ReactElement => {

  const styles = useStyleSheet(themedStyles);
  const { product } = route.params;

  const { onAddToCart } = React.useContext(CartContext) as CartContextType;

  const onBuyButtonPress = (): void => {
    onAddToCart(product);
    navigation && navigation.navigate('Cart');
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
      source={{uri: info.item.src}}
    />
  );

  const renderOptionItemIcon = (style: ImageStyle, icon: string): React.ReactElement => (
    <Icon {...style} name={icon}/>
  );

  const renderOptionItem = (option: ProductOption, index: number): React.ReactElement => (
    <Button
      key={index}
      style={styles.optionItem}
      appearance='ghost'
      size='small'
      icon={(style: ImageStyle) => renderOptionItemIcon(style, option.icon)}>
      {option.title}
    </Button>
  );

  return (
    <SafeAreaLayout
    style={styles.container}
    insets='top'>
    <TopNavigation
      title={`${HtmlDecode(product.title)}`}
      leftControl={renderBackAction()}
    />

    <ScrollView style={styles.container}>
      <ImageOverlay
        style={styles.image}
        source={{uri: product.images[0].src}}
      />
      <Card
        style={styles.bookingCard}
        appearance='filled'
        disabled={true}
        >
        <Text
          style={styles.title}
          category='h6'>
          {HtmlDecode(product.name)}
        </Text>
        <Text
          style={styles.rentLabel}
          appearance='hint'
          category='p2'>
            <HTML source={{ html: product.short_description }} />
        </Text>
        <Text
          style={styles.priceLabel}
          category='h6'>
          {product.price}
          <Text> (VAT inslusive)</Text>
        </Text>
        <Button
          style={styles.buyButton}
          onPress={onBuyButtonPress}>
          BUY NOW
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
        <HTML source={{ html: product.description }} />
      </Text>
      {product.images.length> 1?
      <>
      <Text
        style={styles.sectionLabel}
        category='s1'>
        Photos
      </Text>
      <List
        contentContainerStyle={styles.imagesList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={product.images}
        renderItem={renderImageItem}
      />
      </>: <Text></Text>
      }
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
  buyButton: {
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
