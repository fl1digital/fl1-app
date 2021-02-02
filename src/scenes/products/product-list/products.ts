import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly title: string,
              readonly category: string,  
              readonly image: ImageSourcePropType,
              readonly price: number) {
  }

  get formattedPrice(): string {
    return `£${this.price}`;
  }
  
  static FL1TShirtGrey(): Product {
    return new Product(
      'FL1 Grey',
      'T Shirts',
      require('../assets/fl1-polo-grey.png'),
      15,
    );
  }

  static FL1TShirtWhite(): Product {
    return new Product(
      'FL1 White',
      'T Shirts',
      require('../assets/image-tshirt.png'),
      15,
    );
  }

  static FL1TShirtGatsby(): Product {
    return new Product(
      '(The Grey) Gatsby',
      'T Shirts',
      require('../assets/gatsby-polo-grey.png'),
      15,
    );
  }

  static FL1TShirtKevin(): Product {
    return new Product(
      'Kevin',
      'T Shirts',
      require('../assets/gatsby-polo-white.png'),
      15,
    );
  }

  static Hoodies(): Product {
    return new Product(
      'FL1 Hoodie',
      'Hoodies',
      require('../assets/image-hooides.png'),
      25,
    );
  }

  static FL1TrainingPoster(): Product {
    return new Product(
      'FL1 Trainimg',
      'Posters',
      require('../assets/image-posters.png'),
      9.99,
    );
  }

  static FL1ServicesPoster(): Product {
    return new Product(
      'FL1 Services',
      'Posters',
      require('../assets/image-posters.png'),
      9.99,
    );
  }

  static Mugs(): Product {
    return new Product(
      'FL1 Mug',
      'Mugs',
      require('../assets/image-mugs.png'),
      5.99,
    );
  }

  static CrystalBallRaghav(): Product {
    return new Product(
      'Raghav\'s Crystal Ball',
      'Crystal Balls',
      require('../assets/image-crystal-ball.jpg'),
      15.99,
    );
  }

  static CrystalBallAlex(): Product {
    return new Product(
      'Alex\'s Crystal Ball',
      'Crystal Balls',
      require('../assets/image-crystal-ball.jpg'),
      15.99,
    );
  }

  static ButtonsThatWasEasy(): Product {
    return new Product(
      'That Was Easy',
      'Buttons',
      require('../assets/image-buttons.jpg'),
      5,
    );
  }

  static ButtonsPanic(): Product {
    return new Product(
      'Pete\'s Panic Button',
      'Buttons',
      require('../assets/image-panic-button.jpeg'),
      5,
    );
  }
  
  static ButtonsHR(): Product {
    return new Product(
      'HR Button',
      'Buttons',
      require('../assets/image-hr-button.png'),
      5,
    );
  }  
}
