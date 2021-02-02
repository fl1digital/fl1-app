import React from 'react';
import axios from 'axios';

import { ActivityIndicator, ListRenderItemInfo, StyleSheet } from 'react-native';
import { LayoutListElement } from '../../components/layout-list.component';
import { Card, CardElement, List, Text } from '@ui-kitten/components';

import { Category, ProductCategoriesSearchParams } from '../../api/woocommerce.d';
import { wooGetProductCategoriesUrl } from '../../api/wpAPI';

import { HtmlDecode } from '../../components/display-helpers';

export const CategoriesListScreen = ({ navigation }): LayoutListElement => {

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

  const onItemPress = (index: number): void => {
    const category: Category = categories[index];

    navigation && navigation.navigate('ProductList', {
      category_id: category.id,
      category_name: HtmlDecode(category.name),
    });
  };

  const renderItem = (info: ListRenderItemInfo<Category>): CardElement => (
    <Card
      style={styles.itemContainer}
      onPress={() => onItemPress(info.index)}>
      <Text
        category='s1'>
        {HtmlDecode(info.item.name)}
      </Text>
      <Text
        style={styles.itemDescription}
        appearance='hint'>
        {HtmlDecode(info.item.description)}
      </Text>
    </Card>
  );

  return (
    <>
    {loading ? <ActivityIndicator style={styles.loadingIndicator} />: 
    <List
      contentContainerStyle={styles.productList}
      data={categories}
      renderItem={renderItem}
    />}
    </>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  container: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  itemContainer: {
    marginVertical: 8,
    marginHorizontal: 8,
  },
  itemDescription: {
    marginTop: 4,
  },
  productList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});