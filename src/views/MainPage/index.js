import React, { Component } from "react";
import { ButtonGroup, Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { Button, Modal, Navbar, Form, Row, Col, ToggleButton } from "react-bootstrap";
import { MdShoppingBasket } from 'react-icons/md';
import { FaTrashAlt } from 'react-icons/fa';
import Login from '../Login/index';

class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            consumerUri: "",
            productsOnCart: [],
            username: "",
            password: "",
            showCart: false,
            showRecommendations: false,
            showLoginForm: false,
            loggedIn: false,
            checkout: false,
            checkoutStatus: "",
            stores: [],
            products: [],
            recommendations: [],
            selectedStore: '',
            entrada1: '',
            entrada2: '',
            checkedByName: true,
            checkedByDepartament: false,

        }
    }

    componentDidMount() {
        this.getStores();
    }

    getStores = () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        fetch(`http://localhost:8080/store`, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.setState(
                    {
                        stores: result
                    }
                )
                //this.state.stores.forEach(store => this.getProductsFromStore(store));
            })
            .catch(error => console.log('error', error));


    }

    getProductsFromStore = async (store) => {

        console.log("entrou")

        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        };

        await fetch(`http://localhost:8080/product?storeUri=${encodeURIComponent(store.uri)}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.pushProductsIntoStore(result, store);
            }
            )
            .catch(error => console.log('error', error));
    }



    pushProductsIntoStore(products, store) {

        if (products.error) products = [{}];
        let currentStores = this.state.stores;
        let index = currentStores.indexOf(store);
        currentStores[index].products = products;

        this.setState({
            stores: currentStores
        })

    }

    renderLoginForm() {

        if (!this.state.loggedIn) {
            return (
                <div className="Login">
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
                    <h2>{this.state.checkoutStatus}</h2>

                </div>
            )
        }
    }

    renderProductsFromStore(store) {


            var requestOptions = {
                method: 'GET',
                redirect: 'follow',
            };
    
            fetch(`http://localhost:8080/product?storeUri=${encodeURIComponent(store.uri)}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // console.log(result);
                    // this.pushProductsIntoStore(result, store);
                    this.setState({
                        products: result
                    })
                }
                )
                .catch(error => console.log('error', error));
 
    }

    getRecommendations = async () => {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        console.log(this.state.recommendations);
        await fetch(`http://localhost:8080/product/recommendation?consumerEmail=${this.state.username}`, requestOptions)
            .then(response => response.json())
            .then(result =>
                this.setState(
                    {
                        recommendations: result
                    }
                ))
            .catch(error => console.log('error', error));

        console.log("RECOMENDATIONS")
        console.log(this.state.recommendations)
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
    handleLoginClose = () => this.setState(
        {
            showLoginForm: false
        }
    );

    handleLoginShow = () => this.setState(
        { showLoginForm: true }
    );

    handleCartClose = () => this.setState(
        {
            showCart: false,
            checkoutStatus: ""
        }
    );

    handleCartShow = () => this.setState(
        { showCart: true }
    );

    handleRecommendationsClose = () => this.setState(
        { showRecommendations: false }
    );

    handleRecommendationsShow = () => {
        this.getRecommendations();
        this.setState(
            { showRecommendations: true }
        );
    }

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
        this.setState({ username: username })
    }

    setPassword(password) {
        this.setState({ password: password })
    }


    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        console.log(this.state);
        var statusCode;
        var consumer;
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "email": this.state.username, "password": this.state.password });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("http://localhost:8080/login", requestOptions)
            .then(response => response.text())
            .then(result => consumer = result)
            .catch(error => console.log('error', error));

        if (consumer[0] === 'h') {
            this.setState({
                loggedIn: true,
                checkout: true,
                consumerUri: consumer,
                showLoginForm: false
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

        this.state.productsOnCart.forEach(
            product => {
                var status;
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                if (this.state.username) {
                    var raw = JSON.stringify({ "consumerEmail": this.state.username, "price": (product.price * product.qtyOnCart), "productLabel": product.label, "quantity": product.qtyOnCart });

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("http://localhost:8080/order", requestOptions)
                        .then(response => response.json())
                        .then(result => status = result.status)
                        .catch(error => console.log('error', error));

                    if (status !== 500) {
                        this.setState({
                            checkoutStatus: "Compra concluída com sucesso"
                        })
                    }
                }
            }
        )

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

    render() {

        return (
            <>
                <div className="header">

                    <Navbar bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand onClick={this.handleLoginShow}>{this.state.consumerUri ? "Olá novamente!" : "Login"}</Navbar.Brand>
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
                                        <Button variant="outline-danger" size="sm" onClick={() => { this.decreaseQty(product) }}>-</Button>
                                        <span> &nbsp; {product.qtyOnCart} &nbsp; </span>
                                        <Button variant="outline-success" size="sm" onClick={() => { this.increaseQty(product) }}>+</Button>
                                    </span>
                                    <span>Preço:  ${product.price * product.qtyOnCart}</span>
                                    <FaTrashAlt size={26} color="brown" onClick={() => { this.remove(product) }} />
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

                            <h2>{this.state.checkoutStatus}</h2>

                        </Modal.Footer>
                        {this.state.checkout ? this.renderLoginForm() : this.renderCheckout()}
                    </Modal>
                </div>

                <div className="App">
                    <h2 style={{ margin: 30 }}> Lojas </h2>
                    <div style={{ marginBottom: 20 }}>
                        <ButtonGroup>
                            <ToggleButton type="radio" variant='outline-primary' checked={this.state.checkedByName} onClick={this.sortByName}>Por nome</ToggleButton>
                            <ToggleButton type="radio" variant='outline-primary' checked={this.state.checkedByDepartament} onClick={this.sortByDepartment}>Por atividade</ToggleButton>
                        </ButtonGroup>
                    </div>

                    <Accordion className="container">
                        {this.state.stores.map((store, index) =>

                            <Accordion.Item eventKey={index} key={store.uri}>

                                <Accordion.Header onClick={() => { this.renderProductsFromStore(store) }}>
                                    <span className="storeName">{store.label}</span> <span className="department">{store.activity.label}</span>
                                </Accordion.Header>
                                <Accordion.Body>

                                    {this.state.products?.map((product) =>
                                        <div key={product.uri}>
                                            <strong>{product.label} </strong>
                                            <span>Preço: ${product.price} </span>
                                            <span>Quantidade em estoque: {product.quantity} </span>
                                            <Button variant="success" size="sm" onClick={() => { this.addToCart(product) }} >
                                                Adicionar ao carrinho
                                            </Button>
                                        </div>)}

                                </Accordion.Body>
                            </Accordion.Item>
                        )}
                    </Accordion>
                    <div className="container" style={{ marginBottom: 30 }}>
                        <h3 style={{ margin: 30 }}>Mapa do shopping</h3>
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
                        <Button style={{ marginTop: 30 }} onClick={this.handleRecommendationsShow}>Recomendações de Produtos</Button>
                    </div>

                    <Modal show={this.state.showRecommendations} onHide={this.handleRecommendationsClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Recomendação de Produtos</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.recommendations.map((product, index) =>
                                <div className="cartItem" key={index}>
                                    <strong>{product.label} </strong>
                                    <span>Preço:  R$ {product.price}    </span>
                                    <Button variant="success" size="sm" onClick={() => { this.addToCart(product) }}>Adicionar ao carrinho</Button>
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


                    <Modal show={this.state.showLoginForm} onHide={this.handleLoginClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Login</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.renderLoginForm()}
                        </Modal.Body>

                        <Modal.Footer>

                            <Button variant="secondary" onClick={this.handleLoginClose}>
                                Fechar
                            </Button>

                        </Modal.Footer>
                    </Modal>

                </div>
            </>
        )
    }

}

export default MainPage;