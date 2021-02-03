import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, ListItem, ListItemProps, Text } from '@ui-kitten/components';
import { CloseIcon, MinusIcon, PlusIcon } from './icons';
import { CartContextType, CartItem, Product} from '../../../api/woocommerce.d';
import { CartContext } from '../../../services/cart-context';

export type CartItemProps = ListItemProps & {
  index: number;
  product: Product;
  item: CartItem;
  onProductChange: (product: Product, index: number) => void;
  onRemove: (product: Product, index: number) => void;
};

export const CartListItem = (props: CartItemProps): React.ReactElement => {
  
  const { onAddToCart, onRemoveFromCart, onClearCart, onDeductOne } = React.useContext(CartContext) as CartContextType;

  const { style, product, item, index, onProductChange, onRemove, ...listItemProps } = props;

  const decrementButtonEnabled = (): boolean => {
    return item.quantity > 1;
  };

  return (
    <ListItem
      {...listItemProps}
      style={[styles.container, style]}>
      <Image
        style={styles.image}
        source={{uri: product.images[0].src}}
      />
      <View style={styles.detailsContainer}>
        <Text
          category='s1'>
          {product.name}
        </Text>
        <Text category='s2'>
          £{product.price}
        </Text>
        <View style={styles.amountContainer}>
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size='tiny'
            icon={MinusIcon}
            onPress={()=>onDeductOne(product)}
            disabled={!decrementButtonEnabled()}
          />
          <Text
            style={styles.amount}
            category='s2'>
            {`${item.quantity}`}
          </Text>
          <Button
            style={[styles.iconButton, styles.amountButton]}
            size='tiny'
            icon={PlusIcon}
            onPress={()=>onAddToCart(product)}
          />
        </View>
      </View>
      <Button
        style={[styles.iconButton, styles.removeButton]}
        appearance='ghost'
        status='basic'
        icon={CloseIcon}
        onPress={()=>onRemoveFromCart(product)}
      />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  image: {
    width: 120,
    height: 144,
  },
  detailsContainer: {
    flex: 1,
    height: '100%',
    padding: 16,
  },
  amountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    left: 16,
    bottom: 16,
  },
  amountButton: {
    borderRadius: 16,
  },
  amount: {
    textAlign: 'center',
    width: 40,
  },
  removeButton: {
    position: 'absolute',
    right: 0,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
