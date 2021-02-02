import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly title: string,
              readonly description: string,
              readonly price: ProductPrice,
              readonly primaryImage: ImageSourcePropType,
              readonly images: ImageSourcePropType[],
              readonly details: string[],
              readonly options: ProductOption[]) {
  }

  static thatWasEasyButton(): Product {
    return new Product(
      'That Was Easy Button',
      'The ultimate in FL1 geeky toys, the That Was Easy Button. Press this whenever you\'ve succesfully got rid of a client or got a gnarly bit of code working!' +
      '\n\n' +
      'Powered by 2 x AAA batteries, simply press and have "That was Easy" barked at you in a goofy American accent....enjoy!',
      ProductPrice.tenDollarsPerNight(),
      require('../assets/image-buttons.jpg'),
      [
        require('../assets/image-hr-button.png'),
        require('../assets/fl1-usb-lamp.png'),
        require('../assets/image-panic-button.jpeg'),
      ],
      [
        '2 Guests',
        '2 Bad',
        '2 Bath',
      ],
      [
        ProductOption.wifiOption(),
        ProductOption.tvOption(),
        ProductOption.parkingOption(),
      ],
    );
  }
}

export class ProductPrice {

  constructor(readonly value: number,
              readonly currency: string,
              readonly scale: string) {
  }

  get formattedValue(): string {
    return `${this.currency}${this.value}`;
  }

  get formattedScale(): string {
    return `/${this.scale}`;
  }

  static tenDollarsPerNight(): ProductPrice {
    return new ProductPrice(4.99, '£', 'night');
  }
}

export class ProductOption {

  constructor(readonly icon: string,
              readonly title: string) {
  }

  static wifiOption(): ProductOption {
    return new ProductOption('wifi', 'Wi-Fi');
  }

  static tvOption(): ProductOption {
    return new ProductOption('tv', 'TV');
  }

  static parkingOption(): ProductOption {
    return new ProductOption('car', 'Free Parking');
  }
}

