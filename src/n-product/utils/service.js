import axios from 'axios';
import { API_ENDPOINT, BEARER_TOKEN } from './constants';

export const fetchProducts = async (AMZ, Laptop, top, minPrice, maxPrice) => {
  try {
    const response = await axios.get(API_ENDPOINT.replace(':companies', AMZ).replace(':categories', Laptop), {
      params: { top, minPrice, maxPrice },
      headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
    });

    console.log('Fetched products:', response.data);
    return response.data.map((product, index) => ({
      ...product,
      id: `${AMZ}-${Laptop}-${index}`
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
