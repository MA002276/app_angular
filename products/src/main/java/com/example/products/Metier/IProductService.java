package com.example.products.Metier;
import com.example.products.entities.Product;

import java.util.List;

public interface IProductService {
    public List<Product> getAllProducts();
    public Product getProductById(Long id);
     public Product saveProduct(Product product);
     public void deleteProduct(Long id);

}
