import React, { Component } from "react";
import { Button, Modal, Navbar, Container } from "react-bootstrap";
import { MdShoppingBasket } from 'react-icons/md';

class Header extends Component {

    constructor (props) {
        super(props);

        this.state = {
            products: props.products,
            showCart: false,
        }
    }

    handleClose = () => this.setState(
        {showCart: false}
    );
    handleShow = () => this.setState(
       {showCart: true}
   );

    render () {

        return(

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
                        <span>0 itens</span>
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
                        {this.state.products.map((product, index) => 
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
               
        )
    }
}

export default Header;