import React from 'react';
import { LayoutItem } from '../../model/layout-item.model';

export interface BlogData extends LayoutItem {
    route: string;
  }
  
export const articles: BlogData[] = [
    {
      title: 'Buy Jason a new Macbook with an M1 chip',
      description: 'Option 1',
      image: require('../../assets/images/blog/mbp-spacegray-select-202011-820x421.jpeg'),
      route: 'Article1',
    },
    {
      title: 'Geeky Projects: The Internet Enabled Biscuit Tin',
      description: 'Option 2',
      image: require('../../assets/images/blog/My-Post-820x421.jpg'),
      route: 'Article2',
    },
    {
      title: 'What is an API?',
      description: 'Option 3',
      image: require('../../assets/images/blog/Artboard-2.png'),
      route: 'Article3',
    },
    {
      title: 'Taking payments online… What is Strong Customer Authentication (SCA)?',
      description: 'Option 1',
      image: require('../../assets/images/blog/AdobeStock_171831332-820x421.jpeg'),
      route: 'ArticleList1',
    },
    {
      title: 'The impact of Brexit on your website',
      description: 'Option 2',
      image: require('../../assets/images/blog/AdobeStock_113305240-820x421.jpeg'),
      route: 'ArticleList2',
    },
    {
      title: 'B2B Marketing Expo 2020 – FL1 are at the ExCeL London',
      description: 'Option 3',
      image: require('../../assets/images/image-layout-article-list-3.jpg'),
      route: 'ArticleList3',
    },
    {
      title: 'Get Ready for WordPress Gutenberg',
      description: 'Option 4',
      image: require('../../assets/images/image-layout-article-list-4.jpg'),
      route: 'ArticleList4',
    },
  ];