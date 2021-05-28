import React from 'react';

const CartItem = (props) => {

    // NOW THAT WE HAVE PROPS, WE DO NOT NEDD STATE HERE
    // constructor() {
    //     super();
    //     this.state = {
    //         title: "Product Name",
    //         price: 999,
    //         qty: 1
    //     }
    //     // this.increaseQuantity = this.increaseQuantity.bind(this);
    //     // this.testing();
    // }

    
    // testing() {
    //     const promise = new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve('done');
    //         })
    //     })

    //     promise.then(() => {
    //         // setState acts like synchronous calls
    //         this.setState({ qty: this.state.qty +10});

    //         this.setState({ qty: this.state.qty +10});

    //         this.setState({ qty: this.state.qty +10});

    //         console.log('state: ', this.state);
    //     });
    // }

    // increaseQuantity = () => {
        
    //     // console.log('this: ', this.state);

    //     // Ideal Method 
    //     //this.state.qty += 1;

    //     // Using SETSTATE method using an OBJECT
    //     // use this when the property to be changed does not depends on the previous state
    //     // this.setState({
    //     //     qty: this.state.qty +1
    //     // });

    //     // using SETSTATE method using a call back function
    //     // use this when the property to be changed, requires a dependency on the previous state 
    //     this.setState((prevState) => {
    //         return {
    //             qty: prevState.qty + 1
    //         }
    //     });

    // }

    // decreaseQuantity = () => {

    //     const { qty } = this.state;

    //     if(qty === 0) {
    //         return;
    //     }

    //     this.setState((prevState) => {
    //         return {
    //             qty: prevState.qty - 1
    //         }
    //     });
    // }

    
    const { title, price, qty} = props.product;
    const { 
        product, 
        onIncreaseQuantity, 
        onDecreaseQuantity,
        onhandleDeleteProduct
    } = props;
    
    return (
        <div className="cart-item">
            <div className="cart-img">
                <img style={styles.image} src={product.img} alt="Product" />
            </div>
            <div className="cart-desc">
                <div style={{font: 25, fontWeight: 700}}>{ title }</div>
                <div>Rs. { price }</div>
                <div>Qnt: { qty }</div>
                <div className="cart-item-actions">
                    <img 
                        alt="Increase" 
                        className="action-icons" 
                        src="https://image.flaticon.com/icons/png/512/1237/1237946.png" 
                        onClick= {() => onIncreaseQuantity(product)}
                    />
                    <img 
                        alt="Decrease" 
                        className="action-icons" 
                        src="https://image.flaticon.com/icons/png/512/56/56889.png" 
                        onClick= {() => onDecreaseQuantity(product)}
                    />
                    <img 
                        alt="Delete" 
                        className="action-icons" 
                        src="https://image.flaticon.com/icons/png/512/3096/3096687.png" 
                        onClick= {() => onhandleDeleteProduct(product.id)}
                    />
                </div>
            </div>
        </div>
    );
}

const styles = {
    image: {
        height: 120,
        width: 120,
        borderRadius: 7,
        background: '#777'
    }
};

export default CartItem;