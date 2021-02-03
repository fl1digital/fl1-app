import React from 'react';
import { ListRenderItemInfo } from 'react-native';
import { Button, Layout, List, StyleService, Text, useStyleSheet } from '@ui-kitten/components';

import { CartContextType, CartItem, Product} from '../../api/woocommerce.d';
import { CartContext } from '../../services/cart-context';
import { CartListItem } from './extra/cart-item.component';

export default ({ props }): React.ReactElement => {

  const { cartItems, onAddToCart, onRemoveFromCart, onClearCart, onDeductOne, onPostCheckout } = React.useContext(CartContext) as CartContextType;

  const styles = useStyleSheet(themedStyle);
  const [products, setProducts] = React.useState<CartItem[]>(cartItems);

  const totalCost = (): number => {
    const totals: number[] = cartItems.map(element => parseFloat(element.product.price) * element.quantity);
    
    return totals.reduce(number => number + number);
    //return (total.toString())
  };

  const onCheckOut = (): void =>{
    
    // Post the Checkout request with our cart data
    onPostCheckout();
  };

  const onStartShopping = (): void =>{ 
    props && props.navigate('Products');
  }

  const onItemRemove = (product: Product, index: number): void => {
    onRemoveFromCart(product);
  };

  const onItemChange = (product: Product, index: number): void => {
    setProducts([...products]);
  };

  const renderFooter = (): React.ReactElement => (
    <Layout style={styles.footer}>
      <Text category='h5'>Total Cost:</Text>
      <Text category='h5'>{`£${totalCost()}`}</Text>
    </Layout>
  );
 
  const renderProductItem = (info: ListRenderItemInfo<CartItem>): React.ReactElement => (
    <CartListItem
      style={styles.item}
      index={info.index}
      item={info.item} 
      product={info.item.product}
      onProductChange={onItemChange}
      onRemove={onItemRemove}
    />
  );

  return (
    <>
    {cartItems.length > 0?
    <Layout
      style={styles.container}
      level='2'>
      <List
        data={cartItems}
        renderItem={renderProductItem}
        ListFooterComponent={renderFooter}
      />
      <Button
        style={styles.checkoutButton}
        size='giant'>
        CHECKOUT
      </Button>
    </Layout>
    :
    <Layout
    style={styles.container}
    level='2'>
    <Text style={styles.cartHeader}>
      You have no items in your Basket
    </Text>
    <Button
      onPress={onStartShopping}
      style={styles.checkoutButton}
      size='giant'>
      Start Shopping
    </Button>
  </Layout>
    }
    </>
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
  },
  cartHeader: {
    alignSelf: 'center',
    marginTop: 20,
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

