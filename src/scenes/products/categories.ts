import { ImageSourcePropType } from 'react-native';

export class Category {

  constructor(readonly title: string,
              readonly image: ImageSourcePropType) {
  }
  
  static TShirts(): Category {
    return new Category(
      'T Shirts',
      require('../../scenes/products/assets/image-tshirt.png'),
    );
  }

  static Hoodies(): Category {
    return new Category(
      'Hoodies',
      require('../../scenes/products/assets/image-hooides.png'),
    );
  }

  static Posters(): Category {
    return new Category(
      'Posters',
      require('../../scenes/products/assets/image-posters.png'),
    );
  }

  static Mugs(): Category {
    return new Category(
      'Mugs',
      require('../../scenes/products/assets/image-mugs.png'),
    );
  }

  static CrystalBalls(): Category {
    return new Category(
      'Crystal Balls',
      require('../../scenes/products/assets/image-crystal-ball.jpg'),
    );
  }

  static Buttons(): Category {
    return new Category(
      'Buttons',
      require('../../scenes/products/assets/image-buttons.jpg'),
    );
  }
  
  
}
