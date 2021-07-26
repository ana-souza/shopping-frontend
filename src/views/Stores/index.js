import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { Button, Modal, Navbar, Form } from "react-bootstrap";
import { MdShoppingBasket } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import Login from '../Login/index';


class Stores extends Component {

    constructor (props) {
        super(props);

        this.state = {
            productsOnCart: [],
            username: "",
            password: "",
            showCart: false,
            showRecommendations: false,
            loggedIn: false,
            checkout: false,
            stores: [
                {
                  "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/americanas",
                  "activity": {
                    "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/activities/departamento",
                    "label": "Departamento"
                  },
                  "locationURI": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/americanas/location",
                  "label": "Americanas",
                  "products": [
                    {"uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/americanas/products/food/chocolate",
                    "label": "Chocolate",
                    "color": null,
                    "foundIn": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/americanas",
                    "price": 5.0,
                    "quantity": 40
                  }
                  ]
                },
                {
                  "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/cea",
                  "activity": {
                    "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/activities/vestuario",
                    "label": "Vestuário"
                  },
                  "locationURI": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/cea/location",
                  "label": "C&A",
                  "products" : []
                },
                {
                  "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/rihappy",
                  "activity": {
                    "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/activities/brinquedo",
                    "label": "Brinquedos"
                  },
                  "locationURI": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/rihappy/location",
                  "label": "RiHappy",
                  "products": [{
                    "storeUri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/rihappy",
                    "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/rihappy/products/toy/hot-wheels",
                    "label": "Hot Wheels",
                    "color": null,
                    "foundIn": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/rihappy",
                    "price": 6.99,
                    "quantity": 50
                  }]
                },
                {
                  "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/riachuelo",
                  "activity": {
                    "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/activities/vestuario",
                    "label": "Vestuário"
                  },
                  "locationURI": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/riachuelo/location",
                  "label": "Riachuelo",
                  "products": [
                    {
                        "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/riachuelo/products/shirts/ocean-blue",
                        "label": "Camiseta Ocean Blue",
                        "color": "Azul-oceano",
                        "foundIn": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/riachuelo",
                        "price": 35.0,
                        "quantity": 10
                    },
                    {
                        "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/riachuelo/products/pants/simple-jeans",
                        "label": "Calça Jeans Simples",
                        "color": "Azul",
                        "foundIn": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/riachuelo",
                        "price": 55.5,
                        "quantity": 3
                    }
                ]
                },
                {
                  "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/saraiva",
                  "activity": {
                    "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/activities/livraria",
                    "label": "Livraria"
                  },
                  "locationURI": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/saraiva/location",
                  "label": "Saraiva",
                  "products": [
                    {
                      "uri": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/saraiva/products/book/steve-jobs-by-walter-isaacson",
                      "label": "Steve Jobs, por Walter Isaacson",
                      "color": null,
                      "foundIn": "http://www.semanticweb.org/eachusp/ontologies/2021/5/ep-wsemantica#/stores/saraiva",
                      "price": 61.9,
                      "quantity": 2
                    }
                  ]
                }
              ],
            
            recommendations: []
        }
    }

    componentDidMount() {
         this.getStores();
      }

    getStores = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
          };
          
          await fetch(`http://localhost:8080/store`, requestOptions)
            .then(response => response.json())
            // .then(result => 
            //     this.setState(
            //         {
            //             stores: result
            //         }
            //     ))
            .catch(error => console.log('error', error));  
            
        //this.state.stores.forEach( store => this.getProductsFromStore(store));
    }

    getProductsFromStore = async(store) => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
          };
          
          fetch(`http://localhost:8080/product?storeUri=${encodeURIComponent(store.uri)}`, requestOptions)
            .then(response => response.json())
            .then(result => 
                this.pushProductsIntoStore(result, store))
            .catch(error => console.log('error', error));

    }

    pushProductsIntoStore(products, store){
        
        if (products.error) products = [{}];
        let storesWithProducts = this.state.stores;
        let index = storesWithProducts.indexOf(store);
        storesWithProducts[index].products = products;

        this.setState({
            stores: storesWithProducts
        })
            
    }

    renderLoginForm() {

        if (!this.state.loggedIn) {
        return (
            <div className="Login">
                    <h2>LOGIN</h2>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group size="lg" controlId="username">
                        <Form.Label>Usuário</Form.Label>
                        <Form.Control
                            autoFocus
                            type="username"
                            value={this.state.username}
                            onChange={(e) => this.setUsername(e.target.value)}
                        />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            value={this.state.password}
                            onChange={(e) => this.setPassword(e.target.value)}
                        />
                        </Form.Group>
                        <Button block size="lg" type="submit" disabled={!this.validateForm()}>
                        Login
                        </Button>
                    </Form>
            </div>
        )
        }
    }

    renderCheckout() {

        if (!this.state.loggedIn) {
        return (
            <div className="Login">
                    <h2>LOGIN</h2>
                    <Form onSubmit={this.handleSubmit}>
                        
                    </Form>
            </div>
        )
        }
    }

     renderProductsFromStore (store){

        let stores = this.state.stores;
        let index = stores.indexOf(store);
        console.log(stores)

        return (
            stores[index].products.map((product) => 
            <div key={product.uri}>
                <strong>{product.label} </strong>
                <span>Preço: ${product.price} </span>
                <span>Quantidade em estoque: {product.quantity} </span>
                <Button variant="success" size="sm" onClick={ () =>{this.addToCart(product)}} >
                    Adicionar ao carrinho
                </Button>
            </div>)
        )
       
    }

    getRecommendations = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
          };
          
          fetch(`http://localhost:8080/product/recommendation`, requestOptions)
            .then(response => response.json())
            .then(result => 
                this.setState(
                    {
                        recommendations: result
                    }
                ))
            .catch(error => console.log('error', error));   
    }


    sortByDepartment = () => {
        var storesByDepartment = this.state.stores;
        storesByDepartment.sort(function (a, b) {
            if (a.activity.label > b.activity.label) {
              return 1;
            }
            if (a.activity.label < b.activity.label) {
              return -1;
            }
            return 0;
          });

          this.setState({
              stores: storesByDepartment
          }
          )
    }

    sortByName = () => {
        var storesByName = this.state.stores;
        storesByName.sort(function (a, b) {
            if (a.label > b.label) {
              return 1;
            }
            if (a.label < b.label) {
              return -1;
            }
            return 0;
          });

          this.setState({
              stores: storesByName
          }
          )
    }

    handleCartClose = () => this.setState(
        {showCart: false}
    );

    handleCartShow = () => this.setState(
       {showCart: true}
    );

    handleRecommendationsClose = () => this.setState(
        {showRecommendations: false}
    );

    handleRecommendationsShow = () => this.setState(
       {showRecommendations: true}
    );

    closeRecOpenCart = () => {
        this.setState(
            {
                showRecommendations: false,
                showCart: true
            }
        )
    }

    increaseQty = (product) => {
        let products = this.state.productsOnCart;
        let index = products.indexOf(product);

        if (products[index].qtyOnCart === products[index].quantity) {
            return;
        }

        products[index].qtyOnCart = products[index].qtyOnCart + 1;

        this.setState(
            {
                productsOnCart: products
            }
        )
    }
    decreaseQty = (product) => {
        let products = this.state.productsOnCart;
        let index = products.indexOf(product);

        if (products[index].qtyOnCart === 1) {
            return;
        }

        products[index].qtyOnCart = products[index].qtyOnCart - 1;

        this.setState(
            {
                productsOnCart: products
            }
        )
    }

    remove = (product) => {
        let products = this.state.productsOnCart;
        let index = products.indexOf(product);

        delete products[index];

        this.setState(
            {
                productsOnCart: products
            }
        )
    }

    setUsername(username) {
        this.setState({username: username})
      }
      
      setPassword(password) {
        this.setState({password: password})
      }
      

       validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
      }
    
       handleSubmit = async (event) => {
        event.preventDefault();
       
        console.log(this.state);
        var statusCode;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"email":this.state.username,"password":this.state.password});

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch("http://localhost:8080/login", requestOptions)
        .then(response => response.json())
        .then(result => statusCode = result.status)
        .catch(error => console.log('error', error));

        if (!statusCode) {
            this.setState({
                loggedIn: true,
                checkout: true
            })
        }

      }
      


    addToCart = (product) => {
        
        let products = this.state.productsOnCart;
        if (products.includes(product)) {
            let index = products.indexOf(product);
            products[index].qtyOnCart = products[index].qtyOnCart + 1;
            
        }
        else {
            product.qtyOnCart = 1;
            products.push(product);
        } 
        this.setState(
            {
                productsOnCart: products
            }
        )
    }

    buy = () => {
        this.setState({
            checkout: true
        })
    }

    
   
    render () {

        return(
            <>
                <div className="header">
                
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="/">Voltar ao menu inicial</Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                            
                                <div to="/cart" className="cart" onClick={this.handleCartShow}>
                                    <div >
                                    <strong>Meu Carrinho</strong>
                                    <span>{this.state.productsOnCart.length} itens</span>
                                    </div>
                                    <MdShoppingBasket size={36} color="#fff" />
                                </div>
                            </Navbar.Text>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    <Modal show={this.state.showCart} onHide={this.handleCartClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Carrinho</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.productsOnCart.map((product, index) => 
                                <div className="cartItem" key={index}>
                                    <strong>{product.label} </strong>
                                    <span>
                                        <Button variant="outline-danger" size="sm" onClick={ () =>{this.decreaseQty(product)}}>-</Button> 
                                        <span> &nbsp; {product.qtyOnCart} &nbsp; </span> 
                                        <Button variant="outline-success" size="sm" onClick={ () =>{this.increaseQty(product)}}>+</Button>
                                    </span>
                                    <span>Preço:  ${product.price * product.qtyOnCart}</span>
                                    <FaTrashAlt size={26} color="brown" onClick={ () =>{this.remove(product)}}/>
                                </div>
                            )}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleCartClose}>
                                Continue Comprando
                            </Button>
                            <Button variant="primary" onClick={this.buy}>
                                Finalizar compra
                            </Button>
                            
                        </Modal.Footer>
                        {this.state.checkout? this.renderLoginForm() : this.renderCheckout()}
                    </Modal>
                </div>

                <div className="App">
                    <h2> Lojas </h2>
                    <div> 
                        <button className="primary" onClick={this.sortByName}>Por nome</button>
                        <button className="primary" onClick={this.sortByDepartment}>Por atividade</button>
                    </div>

                    <Accordion className="container">
                        {this.state.stores.map((store, index) => 
                        
                            <Accordion.Item eventKey={index} key={store.uri}>

                                <Accordion.Header>
                                    <span className="storeName">{store.label}</span> <span className="department">{store.activity.label}</span>
                                </Accordion.Header>
                                <Accordion.Body>
                                    
                                    {/*this.renderProductsFromStore(store)*/}

                                    {store.products.map((product) => 
                                        <div key={product.uri}>
                                            <strong>{product.label} </strong>
                                            <span>Preço: ${product.price} </span>
                                            <span>Quantidade em estoque: {product.quantity} </span>
                                            <Button variant="success" size="sm" onClick={ () =>{this.addToCart(product)}} >
                                                Adicionar ao carrinho
                                            </Button>
                                        </div>)}
                                    
                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>

                    <Button onClick={this.handleRecommendationsShow}>Recomendações de Produtos</Button>      

                    <Modal show={this.state.showRecommendations} onHide={this.handleRecommendationsClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Recomendação de Produtos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.recommendations.map((product, index) => 
                                <div className="cartItem" key={index}>
                                    <strong>{product.label} </strong>
                                    <span>Preço:  ${product.price * product.quantity}</span>
                                    <Button variant="success" size="sm" onClick={ () =>{this.addToCart(product)}}>Adicionar ao carrinho</Button>
                                </div>
                            )}
                        </Modal.Body>

                        <Modal.Footer>
                            
                            <Button variant="secondary" onClick={this.handleRecommendationsClose}>
                                Fechar
                            </Button>
                            <Button variant="primary" onClick={this.closeRecOpenCart}>
                                Abrir Carrinho
                            </Button>
                        </Modal.Footer>
                    </Modal> 

                </div>
            </>
        )
    }
}

export default Stores;