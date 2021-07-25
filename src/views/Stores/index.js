import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import Header from "./components/Header";
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

    getStore = (id) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`http://localhost:8080/store/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => 
                this.setState(
                    {
                        store: result
                    }
                ))
            .catch(error => console.log('error', error));

    }

    getProducts = (id) => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8080/store", requestOptions)
            .then(response => response.text())
            .then(result => 
                this.setState(
                    {
                        stores: result
                    }
                ))
            .catch(error => console.log('error', error));

    }

    getReccomendedProducts = () => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch(`http://localhost:8080/product/recommendation`, requestOptions)
            .then(response => response.text())
            .then(result => 
                this.setState(
                    {
                        recommendations: result
                    }
                ))
            .catch(error => console.log('error', error));
    }

    handleClose = () => this.setState(
        {showCart: false}
    );
    handleShow = () => this.setState(
       {showCart: true}
   );

    addToCart = () => this.setState(
        {productsOnCart: [{label: "produto XYZ"}]}
    );

   
    render () {

        return(
            <>
                {/* <Header products={this.state.productsOnCart} /> */}
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
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.productsOnCart.map((product, index) => 
                            <div key={index}>{product.label}</div>
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

                <Container>
                    <span>
                    <h2> Lojas </h2>
                    
                    </span>
                </Container>
                
                <div> 
                    <button className="primary">Por nome</button>
                    <button className="primary">Por atividade</button>
                </div>
                
                
                <Accordion className="container">
                {this.state.stores.map((store, index) => 
                
                    <Accordion.Item eventKey={index} key={store.uri}>
                        {/* <Accordion.Header>{store.label}</Accordion.Header> */}

                        <Accordion.Header><span className="storeName">{store.label}</span> <span className="department">{store.activity.label}</span></Accordion.Header>
                        <Accordion.Body>
                        Produto X <button onClick={this.addToCart}>Adicionar ao carrinho</button>
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