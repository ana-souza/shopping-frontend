import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { Button, Modal, Navbar } from "react-bootstrap";
import { MdShoppingBasket } from 'react-icons/md';

class Stores extends Component {

    constructor (props) {
        super(props);

        this.state = {
            productsOnCart: [],
            showCart: false,
            stores: [],
            store: {
                "activity": {
                  "label": "string",
                  "uri": "string"
                },
                "label": "string",
                "locationURI": "string",
                "productList": {
                  "items": [
                    {
                      "color": "string",
                      "foundIn": "string",
                      "label": "string",
                      "price": 0,
                      "quantity": 0,
                      "uri": "string"
                    }
                  ]
                },
                "uri": "string"
              },
            products: [
                {
                  "color": "string",
                  "foundIn": "string",
                  "label": "string",
                  "price": 0,
                  "quantity": 0,
                  "uri": "string"
                }
              ],
            recommendations: [
                {
                  "color": "string",
                  "foundIn": "string",
                  "label": "string",
                  "price": 0,
                  "quantity": 0,
                  "uri": "string"
                }
              ]
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
          
          fetch(`http://localhost:8080/store`, requestOptions)
            .then(response => response.json())
            .then(result => 
                this.setState(
                    {
                        stores: result
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

    handleClose = () => this.setState(
        {showCart: false}
    );
    handleShow = () => this.setState(
       {showCart: true}
   );

    increaseQty = (product) => {
        
    }
    decreaseQty = (product) => {
        
    }

    addToCart = (product) => {
        let products = this.state.productsOnCart;
        if (products.includes(product)) {
            let index = products.indexOf(product);
            products[index].quantity = products[index].quantity + 1;
            
        }
        else products.push(product);
        this.setState(
            {
                productsOnCart: products
            }
        )
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
                            
                                <div to="/cart" className="cart" onClick={this.handleShow}>
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


                
                    <Modal show={this.state.showCart} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Carrinho</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.productsOnCart.map((product, index) => 
                                <div className="cartItem" key={index}>
                                    {product.label} 
                                    <span>
                                        <Button variant="outline-danger" size="sm" onClick={ () =>{this.decreaseQty(product)}}>-</Button> 
                                        <span>{product.quantity}</span> 
                                        <Button variant="outline-success" size="sm" onClick={ () =>{this.increaseQty(product)}}>+</Button>
                                    </span>
                                    <strong>Preço: </strong> {product.price * product.quantity}
                                </div>
                            )}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Continue Comprando
                            </Button>
                            <Button variant="primary" onClick={this.handleClose}>
                                Finalizar compra
                            </Button>
                        </Modal.Footer>
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
                                    <li>Produto X <Button variant="success" size="sm" >Adicionar ao carrinho</Button></li>
                                    {this.state.products.map((product) => 
                                    <li key={product.uri}>{product.label} <Button variant="success" size="sm" onClick={ () =>{this.addToCart(product)}} >Adicionar ao carrinho</Button></li>)}
                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>

                    <Button>Recomendações de Produtos</Button>       

                </div>
            </>
        )
    }
}

export default Stores;