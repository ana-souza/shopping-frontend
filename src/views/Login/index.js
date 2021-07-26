import React, { Component } from "react";
import { Form, Button} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
          username: "",
          password: ""
        }
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
    
       handleSubmit = (event) => {
        event.preventDefault();
        
        
      }

      
      

    render () {

        return(


            <div className="App-header">
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
                
            </div>
               
        )
    }
}


export default Login;