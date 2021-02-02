import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Button, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';

import { CartContextType, CartItem, Product} from '../../api/woocommerce.d';
import { CartContext } from '../../services/cart-context';
import { CartListItem } from './extra/cart-item.component';

export default (): React.ReactElement => {

  const { cartItems, onAddToCart, onRemoveFromCart, onClearCart, onDeductOne } = React.useContext(CartContext) as CartContextType;

  const styles = useStyleSheet(themedStyle);
  const [products, setProducts] = React.useState<CartItem[]>(cartItems);

  const totalCost = (): number => {
    return products.reduce((acc: number, product: Product): number => acc + product.totalPrice, 0);
  };

  const onItemRemove = (product: Product, index: number): void => {
    onRemoveFromCart(product);
  };

  const onItemChange = (product: Product, index: number): void => {
    //products[index] = product;
    setProducts([...products]);
  };

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text category='h5'>Total Cost:</Text>
      <Text category='h5'>{`£${totalCost()}`}</Text>
    </Layout>
  );
 
  const renderProductItem = (info: ListRenderItemInfo<Product>): React.ReactElement => (
    <CartListItem
      style={styles.item}
      index={info.index}
      product={info.item}
      onProductChange={onItemChange}
      onRemove={onItemRemove}
    />
  );

  return (
    <Layout
      style={styles.container}
      level='2'>
      <List
        data={products}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
      />
      <Button
        style={styles.checkoutButton}
        size='giant'>
        CHECKOUT
      </Button>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.5,
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  checkoutButton: {
    marginHorizontal: 16,
    marginVertical: 24,
  },
});

