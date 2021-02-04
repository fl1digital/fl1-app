import { CategorySearchParams, EventSearchParams, PostSearchParams, PageSearchParams, SearchParams } from './wordpress.d';
import { ProductSearchParams, ProductCategoriesSearchParams, WooSearchParams } from './woocommerce.d';
import config from '../env';

const MakeSearchParamsGeneric  = (params: SearchParams ) =>{

  let args = '?_embed';
  args += params.per_page? '&per_page=' + params.per_page : "?per_page=10";
  args += params.id? '&id=' + params.id : "";
  args += params.search? '&search=' + params.search : "";
  
  return (args);
}

const MakeWooSearchParamsGeneric  = (params: WooSearchParams ) =>{

  let args = '';
  args += params.per_page? '?per_page=' + params.per_page : "?per_page=10";
  args += params.id? '&id=' + params.id : "";
  args += params.search? '&search=' + params.search : "";
  args += '&consumer_key=' + config.woo_key;
  args += '&consumer_secret=' + config.woo_secret;
  
  return (args);
}

export const  wpGetCategoriesUrl  = (params: ProductCategoriesSearchParams ) =>{

  let args = '';
  args = MakeWooSearchParamsGeneric(params);

  const url = `${config.wp_endpoint}categories/${args}`;      
  return (url);
}

export const  wpGetEventsUrl  = (params: EventSearchParams ) =>{

  let args = '';
  args = MakeSearchParamsGeneric(params);

  const url = `${config.wp_endpoint}event/${args}`;      
  return (url);
}

export const  wpGetPostsUrl  = (params: PostSearchParams ) =>{

  let args = '';
  args = MakeSearchParamsGeneric(params);

  const url = `${config.wp_endpoint}posts/${args}`;      
  return (url);
}

export const  wpGetPagesUrl  = (params: PageSearchParams ) =>{

  let args = '';
  args = MakeSearchParamsGeneric(params);

  const url = `${config.wp_endpoint}pages/${args}`;      
  return (url);
}

export const  wooGetProductsUrl  = (params: ProductSearchParams ) =>{

  let args = '';
  args = MakeWooSearchParamsGeneric(params);
  args += params.category? '&category=' + params.category : "";

  const url = `${config.woo_endpoint}products/${args}`;      
  return (url);
}

export const  wooGetProductCategoriesUrl  = (params: ProductCategoriesSearchParams ) =>{

  let args = '';
  args = MakeWooSearchParamsGeneric(params);

  const url = `${config.woo_endpoint}products/categories/${args}`; 
  return (url);
}


