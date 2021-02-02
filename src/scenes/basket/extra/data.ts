import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly id: number,
              readonly title: string,
              readonly subtitle: string,
              readonly image: ImageSourcePropType,
              readonly price: number,
              readonly amount: number) {
  }

  get formattedPrice(): string {
    return `£${this.price}`;
  }

  get totalPrice(): number {
    return this.price * this.amount;
  }

  static pinkChair(): Product {
    return new Product(
      0,
      'That Was Easy Button',
      'Buttons',
      require('../../products/assets/image-buttons.jpg'),
      5,
      1,
    );
  }

  static blackLamp(): Product {
    return new Product(
      1,
      'FL1 Branded Hoodie',
      'Hoodies',
      require('../../products/assets/image-hooides.png'),
      25,
      1,
    );
  }
}
