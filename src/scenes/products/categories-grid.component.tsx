import React from 'react';
import axios from 'axios';
import { Dimensions, ImageBackground, ListRenderItemInfo, ActivityIndicator } from 'react-native';
import { Card, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';

import { Category, ProductCategoriesSearchParams } from '../../api/woocommerce.d';
import { wooGetProductCategoriesUrl } from '../../api/wpAPI';

export const CategoriesGridScreen = ({ navigation, route }): React.ReactElement => {
  
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  const fetchPosts = async () =>{

    try {
      let params: ProductCategoriesSearchParams = { search :'' };

      const response = await axios.get<Category[]>(wooGetProductCategoriesUrl(params));
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
    }
  }

  React.useEffect(() => {
    fetchPosts();
  }, []);


  const styles = useStyleSheet(themedStyles);

  const onItemPress = (info: ListRenderItemInfo<Category>): void => {
    navigation && navigation.navigate('ProductList', {
      category_id: info.item.id,
      category_name: info.item.name,
    });
  };

  const renderItemHeader = (info: ListRenderItemInfo<Category>): React.ReactElement => (
    <ImageBackground
      style={styles.itemHeader}
      source={{uri: info.item.image.src}}
    />
  );

  const renderProductItem = (info: ListRenderItemInfo<Category>): React.ReactElement => (
    <Card
      style={styles.productItem}
      header={() => renderItemHeader(info)}
      onPress={() => onItemPress(info)}>
      <Text category='s1'>
        {info.item.name}
      </Text>
      <Text
        appearance='hint'
        category='c1'>
      </Text>
    </Card>
  );

  return (
    <>
    {loading ? <ActivityIndicator style={styles.loadingIndicator} />: 
    <List
      contentContainerStyle={styles.productList}
      data={categories}
      numColumns={2}
      renderItem={renderProductItem}
    />}
    </>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  loadingIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
