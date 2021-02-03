import React from 'react';
import axios from 'axios';
import { Dimensions, ImageBackground, ListRenderItemInfo, View, ActivityIndicator } from 'react-native';
import { TopNavigation, TopNavigationAction, Button, Card, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { SafeAreaLayout } from '../../../components/safe-area-layout.component';
import { ArrowIosBackIcon, CartIcon } from '../../../components/icons';
import { HtmlDecode } from '../../../components/display-helpers';
import { Product, ProductSearchParams, CartContextType} from '../../../api/woocommerce.d';
import { wooGetProductsUrl } from '../../../api/wpAPI';
import { CartContext } from '../../../services/cart-context';
import { useIsFocused } from "@react-navigation/native";

export const ProductListScreen = ({ navigation, route }): React.ReactElement => {

  const { onAddToCart } = React.useContext(CartContext) as CartContextType;

  const [products, setProducts] = React.useState<Product[]>([]);
  const [category, setCategory] = React.useState<number>(0);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  // De-structure the Routing Params to find out what category we're looking at 
  const { category_id, category_name } = route.params;

  const styles = useStyleSheet(themedStyles);

  const fetchPosts = async () =>{

    try {
      let params: ProductSearchParams = { category : category_id };

      const response = await axios.get<Product[]>(wooGetProductsUrl(params));
      setProducts(response.data);
      setLoading(false);

    } catch (error) {
      setError(error.message);
    }
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);

  // Pick up the screen focus, and use this instead of an open useEffect 
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused)
    {
      fetchPosts();
    }
    else{
      setProducts(null);
    }
  }, [navigation, isFocused]);


  const onItemPress = (index: number, item: Product): void => {
    navigation && navigation.navigate('ProductDetails',{
      product: item
    });
  };
  
  const onItemCartPress = (index: number, product: Product): void => {
    onAddToCart(product);
    navigation && navigation.navigate('Cart');
  };

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  const renderItemFooter = (info: ListRenderItemInfo<Product>): React.ReactElement => (
    <View style={styles.itemFooter}>
      <Text category='s1'>
        {info.item.price}
      </Text>
      <Button
        style={styles.iconButton}
        size='small'
        icon={CartIcon}
        onPress={() => onItemCartPress(info.index, info.item)}
      />
    </View>
  );

  const renderItemHeader = (info: ListRenderItemInfo<Product>): React.ReactElement => (
    <ImageBackground
      style={styles.itemHeader}
      source={{uri: info.item.images[0].src}}
    />
  );

  const renderProductItem = (info: ListRenderItemInfo<Product>): React.ReactElement => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(info)}
      footer={() => renderItemFooter(info)}
      onPress={() => onItemPress(info.index, info.item)}>
      <Text category='s1'>
        {info.item.name}
      </Text>
      <Text
        appearance='hint'
        category='c1'>
        {category_name}
      </Text>
    </Card>
  );

  return (

    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title={`${HtmlDecode(category_name)} - All Products`}
        leftControl={renderBackAction()}
      />

    {loading? <ActivityIndicator /> :
    <List
      contentContainerStyle={styles.productList}
      data={products}
      numColumns={2}
      renderItem={renderProductItem}
    />}

    </SafeAreaLayout>
    
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  productItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
    backgroundColor: 'background-basic-color-1',
  },
  itemHeader: {
    height: 140,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
