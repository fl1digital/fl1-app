import { LayoutItem } from '../../model/layout-item.model';

export interface WorkshopsData extends LayoutItem {
    route: string;
  }
  
export const workshops: WorkshopsData[] = [
    {
      title: 'Google Analytics Essentials',
      description: '24th January 2021',
      image: require('../../assets/images/workshops/workshop-analytics.png'),
      route: 'WorkshopDetails',
    },
    {
      title: 'Planning and Creating a Website',
      description: '25th February 2021',
      image: require('../../assets/images/workshops/workshop-seo.png'),
      route: 'WorkshopDetails',
    },
    {
      title: 'WordPress Essentials',
      description: '25th March 2021',
      image: require('../../assets/images/workshops/workshop-wp.png'),
      route: 'WorkshopDetails',
    },
    {
      title: 'Google AdWords Essentials',
      description: '25th March 2021',
      image: require('../../assets/images/workshops/workshop-ads.png'),
      route: 'WorkshopDetails',
    },
    {
      title: 'WordPress Advanced',
      description: '25th March 2021',
      image: require('../../assets/images/workshops/workshop-wp-advanced.png'),
      route: 'WorkshopDetails',
    },
    {
      title: 'WordPress Beginner',
      description: '25th March 2021',
      image: require('../../assets/images/workshops/workshop-wp-beginner.png'),
      route: 'WorkshopDetails',
    },
  ];