import React, {useEffect,useState,useContext} from 'react'
import{
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Slider
} from '@material-ui/core';
import {
    Link
} from  'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { fetchProducts } from '../utils/service';

function ProductList() {
    const { products, setProducts } = useContext(ProductContext);
    const [filters, setFilters] = useState({ category: '', company: '', rating: 0, priceRange: [0, 10000], availability: '' });
    const [sortedProducts, setSortedProducts] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const data = await fetchProducts('AMZ', 'Laptop', 10, 0, 10000);
        setProducts(data);
      };
  
      fetchData();
    }, [setProducts]);
  
    useEffect(() => {
      let filteredProducts = [...products];
      if (filters.rating) filteredProducts = filteredProducts.filter(p => p.rating >= filters.rating);
      if (filters.availability) filteredProducts = filteredProducts.filter(p => p.availability === filters.availability);
      filteredProducts = filteredProducts.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
      setSortedProducts(filteredProducts);
    }, [filters, products]);
  
    const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };
  
    return (
      <Container>
        <Typography variant="h4" gutterBottom>All Products</Typography>
        <TextField name="rating" label="Minimum Rating" type="number" onChange={handleFilterChange} />
        <TextField name="availability" label="Availability" onChange={handleFilterChange} />
        <Slider
          value={filters.priceRange}
          onChange={(e, newValue) => setFilters(prevFilters => ({ ...prevFilters, priceRange: newValue }))}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={10000}
        />
        <Grid container spacing={3}>
          {sortedProducts.map((product, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">{product.productName}</Typography>
                  <Typography color="textSecondary">Price: ${product.price}</Typography>
                  <Typography color="textSecondary">Rating: {product.rating}</Typography>
                  <Typography color="textSecondary">Discount: {product.discount}%</Typography>
                  <Typography color="textSecondary">{product.availability === 'yes' ? 'In Stock' : 'Out of Stock'}</Typography>
                  <Link to={`/product/${index}`}>View Details</Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
  
  export default ProductList;