import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/items/123')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container">Cargando producto...</div>;
  }
  if (error) {
    return <div className="container">Error: {error.message}</div>;
  }

  if (!product) {
    return <div className="container">Producto no encontrado.</div>;
  }

  return (
    <div className="App">
      <header className="header">
        <div className="logo">MercadoLibre</div>
        <input type="text" placeholder="Buscar productos..." className="search-bar" />
      </header>
      <div className="container product-detail-page">
        <div className="product-main-info">
          <div className="image-gallery">
            {/* Placeholder for image gallery */}
            <div className="main-image"></div>
            <div className="thumbnails">
              <div className="thumbnail"></div>
              <div className="thumbnail"></div>
              <div className="thumbnail"></div>
            </div>
          </div>
          <div className="purchase-panel">
            <p className="product-status">{product.status}</p>
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">{product.price}</p>
            <p className="shipping-info">{product.shippingInfo}</p>
            <p className="stock-info">Stock: {product.stock}</p>
            <button className="buy-button">Comprar ahora</button>
            <button className="add-to-cart-button">Agregar al carrito</button>
            <div className="seller-info">
              <p>Vendido por: <strong>{product.sellerInfo}</strong></p>
            </div>
            <div className="payment-methods">
              <h3>Métodos de pago</h3>
              <div className="payment-icons">
                {product.paymentMethods && product.paymentMethods.map((method, index) => (
                  <span key={index} className="payment-icon">{method}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="product-secondary-info">
          <div className="product-features">
            <h2>Características del producto</h2>
            <ul>
              {product.features && Object.entries(product.features).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
          </div>
          <div className="product-description">
            <h2>Descripción</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
