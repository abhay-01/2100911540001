import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import {
  Container,
  Card,
  Grid,
  CardContent,
  Typography,
  CardMedia,
} from "@material-ui/core";

export default function ProductDetails() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <Typography variant="h4">Product not found</Typography>;
  }

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          alt={product?.name}
          height="350"
          image={product?.image}
          title={product?.name}
        />

        <CardContent>
          <Typography variant="h5">{product?.name}</Typography>
          <Typography color="textSecondary">
            Company: {product?.company}
          </Typography>
          <Typography color="textSecondary">
            Category: {product?.category}
          </Typography>
          <Typography color="textSecondary">Price: ${product?.price}</Typography>
          <Typography color="textSecondary">
            Rating: {product?.rating}
          </Typography>
          <Typography color="textSecondary">
            Discount: {product?.discount}%
          </Typography>
          <Typography color="textSecondary">
            Availability: {product?.available ? "In Stock" : "Out of Stock"}
          </Typography>
          <Typography variant="body2" component="p">
            Description: Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Integer posuere erat a ante.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
