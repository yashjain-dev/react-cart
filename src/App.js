import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  
  constructor() {
      super();
      this.state = {
          products: [],
          loading: true
      }

      this.db = firebase.firestore();
  }

  componentDidMount () {

    // FETCHING PRODUCTS WITHOUT ANY LISTNER WITHOUT AUTO UPDATE

    // firebase
    //   .firestore()
    //   .collection('products')
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => (
    //       console.log(doc.data())
    //     ));

    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();

    //       data['id'] = doc.id;
    //       return data;
    //     })

    //     this.setState({
    //       products,
    //       loading: false
    //     })
    //   })

    // FETCHING PRODUCTS WITH LISTNER FOR AUTO UPDATE

    this.db
      .collection('products')
      .where('price', '<=', 999)
      .orderBy('price', 'desc')
      .onSnapshot((snapshot) => {
        console.log(snapshot);

        snapshot.docs.map((doc) => (
          console.log(doc.data())
        ));

        const products = snapshot.docs.map((doc) => {
          const data = doc.data();

          data['id'] = doc.id;
          return data;
        })

        this.setState({
          products,
          loading: false
        })
      })
    }

  handleIncreaseQuantity = (product) => {
      
      const { products } = this.state;

      const index = products.indexOf(product);

      // products[index].qty += 1;

      // this.setState({
      //     products: products
      // })

      const docRef = this.db.collection('products').doc(products[index].id);

      docRef
        .update({
          qty: products[index].qty +1
        })
        .then(() => {
          console.log('Product qty increased sucessfully');
        })
        .catch((error) => {
          console.log('Error', error);
        })
  }

  handleDecreaseQuantity = (product) => {
      
      const { products } = this.state;

      const index = products.indexOf(product);

      if(products[index].qty === 0)
          return;

      // products[index].qty -= 1;

      // this.setState({
      //     products: products
      // })

      const docRef = this.db.collection('products').doc(products[index].id);

      docRef
        .update({
          qty: products[index].qty - 1
        })
        .then(() => {
          console.log('Product qty decreased sucessfully');
        })
        .catch((error) => {
          console.log('Error', error);
        })
  }

  handleDeleteProduct = (id) => {
      
      // const { products } = this.state;

      // const items = products.filter((item) => item.id!==id);

      // this.setState({
      //     products: items
      // })

      const docRef = this.db.collection('products').doc(id);

      docRef
        .delete()
        .then(() => {
          console.log('Product deleted sucessfully');
        })
        .catch((error) => {
          console.log('Error', error);
        })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty
    })

    return count;
  }

  getCartTotal = () => {

    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      if(product.qty > 0) {
        cartTotal = cartTotal + product.qty*product.price;
      }
      
      return '';
    })

    return cartTotal;
  }

  addProduct = () => {
    this.db
      .collection('products')
      .add({
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJRQBlWzp1QuQk0ssFRtfMaZzCpoOczCH9A&usqp=CAU',
        title: 'DSLR Camera',
        price: 89999,
        qty: 8,
      })
      .then((docRef) => {
        console.log('Product has been added', docRef);
      })
      .catch((error) => {
        console.log("Eroor", error);
      })
  }
  
  render () {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        {/* <div>
          <button onClick={this.addProduct}>Add Product</button>
        </div> */}
        <Cart 
          // key={this.key}
          products={products} 
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onhandleDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{
              height: 70,
              background: '#4267b2',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: 20,
              color: '#fff'
            }}>
            TOTAL: {this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;
