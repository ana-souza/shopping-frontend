import React, { Component } from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { Button, Modal, Navbar, Form, Row, Col, ToggleButton } from "react-bootstrap";
import { MdShoppingBasket } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import Login from '../Login/index';

class MainPage extends Component {

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
            recommendations: [],
            selectedStore: '',
            entrada1: '',
            entrada2: '',
            checkedByName: true,
            checkedByDepartament: false
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
              stores: storesByDepartment,
              checkedByName: false,
              checkedByDepartament: true
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
              stores: storesByName,
              checkedByName: true,
              checkedByDepartament: false
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

    handleClickRiachuelo = () => {
        this.setState({
            selectedStore: 'Riachuelo',
            entrada1: 'Entrada/Saída 1: Siga em frente e a loja será a primeira a sua esquerda',
            entrada2: 'Entrada/Saída 2: Siga em frente e a loja será a segunda a sua direita'
        })
    }
    handleClickAmericanas = () => {
        this.setState({
            selectedStore: 'Americanas',
            entrada1: 'Entrada/Saída 1: Siga em frente e a loja será a primeira a sua direita',
            entrada2: 'Entrada/Saída 2: Siga em frente e a loja será a terceira a sua esquerda'
        })
    }
    handleClickCA = () => {
        this.setState({
            selectedStore: 'C&A',
            entrada1: 'Entrada/Saída 1: Siga em frente e a loja será a segunda a sua direita',
            entrada2: 'Entrada/Saída 2: Siga em frente e a loja será a segunda a sua esquerda'
        })
    }
    handleClickSaraiva = () => {
        this.setState({
            selectedStore: 'Saraiva',
            entrada1: 'Entrada/Saída 1: Siga em frente e a loja será a terceira a sua direita',
            entrada2: 'Entrada/Saída 2: Siga em frente e a loja será a primeira a sua esquerda'
        })
    }
    handleClickRiHappy = () => {
        this.setState({
            selectedStore: 'RiHappy',
            entrada1: 'Entrada/Saída 1: Siga em frente e a loja será a segunda a sua esquerda',
            entrada2: 'Entrada/Saída 2: Siga em frente, e a loja será a primeira a sua direita'
        })
    }
   
    render () {

        return(
            <>
                <div className="header">
                
                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="/login">Login</Navbar.Brand>
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
                    <h2 style={{margin: 30}}> Lojas </h2>
                    <div style={{marginBottom: 20}}> 
                        <ButtonGroup>
                        <ToggleButton type="radio" variant='outline-primary' checked={this.state.checkedByName} onClick={this.sortByName}>Por nome</ToggleButton>
                        <ToggleButton type="radio" variant='outline-primary' checked={this.state.checkedByDepartament} onClick={this.sortByDepartment}>Por atividade</ToggleButton>
                        </ButtonGroup>
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
                    <div className="container" style={{marginBottom: 30}}>
                    <h3 style={{margin: 30}}>Mapa do shopping</h3>
                <Row>
                    <Col>
                        <img src="mapa.jpg" usemap="#image-map" />

                        <map name="image-map">
                            <area alt="Riachuelo" title="Riachuelo" onClick={this.handleClickRiachuelo} coords="325,101,390,101,391,26,284,27,284,106,315,107" shape="poly" />
                            <area alt="RiHappy" title="RiHappy" onClick={this.handleClickRiHappy} coords="393,26,393,102,424,126,463,125,464,64,418,26" shape="poly" />
                            <area alt="Americanas" title="Americanas" onClick={this.handleClickAmericanas} coords="195,163,192,231,267,232,267,132,235,133" shape="poly" />
                            <area alt="C&amp;A" title="C&amp;A" onClick={this.handleClickCA} coords="270,134,293,133,323,157,379,157,380,232,269,232" shape="poly" />
                            <area alt="Saraiva" title="Saraiva" onClick={this.handleClickSaraiva} coords="381,156,407,156,414,152,486,152,486,232,382,232" shape="poly" />
                        </map>
                    </Col>
                    <Col>
                        
                        <p>Clique em uma loja para obter sua rota</p>
                        <div name="store">
                        <h4>{this.state.selectedStore}</h4>
                        <p>{this.state.entrada1}</p>
                        <p>{this.state.entrada2}</p>
                        </div>
                    </Col>
                </Row>
                <Button style={{marginTop: 30}} onClick={this.handleRecommendationsShow}>Recomendações de Produtos</Button>   
                </div>

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

export default MainPage;