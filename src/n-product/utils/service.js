import axios from 'axios';
import { API_ENDPOINT, BEARER_TOKEN } from './constants';

export const fetchProducts = async (AMZ, Laptop, top, minPrice, maxPrice) => {
  try {
    const response = await axios.get(API_ENDPOINT.replace(':companies', AMZ).replace(':categories', Laptop), {
      params: { top, minPrice, maxPrice },
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxNDU1OTQ4LCJpYXQiOjE3MjE0NTU2NDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImFhM2ZlNDVlLWI3ZTAtNGNkOS1iYjhlLTA0ZDRlMjM3YzQ5MCIsInN1YiI6IjIxY3NkczAxNkBqc3NhdGVuLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiYWJoYXkiLCJjbGllbnRJRCI6ImFhM2ZlNDVlLWI3ZTAtNGNkOS1iYjhlLTA0ZDRlMjM3YzQ5MCIsImNsaWVudFNlY3JldCI6ImdtY0RySXFjbXVwZVFyWGciLCJvd25lck5hbWUiOiJhYmhheSIsIm93bmVyRW1haWwiOiIyMWNzZHMwMTZAanNzYXRlbi5hYy5pbiIsInJvbGxObyI6IjIxMDA5MTE1NDAwMDEifQ.gMZ_4HGfGjY2yORLsNcEAMI5a99aIIIj0PZj-yqy1wA'}` }
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
