import React, { Component } from "react";
import { Container, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

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
      
      clickHandler() {
        // put your own code here
        alert(`Username: ${this.state.username} Password: ${this.state.password}`)
      }

    render () {

        return(

            <div className="App-header">
                
                    
                <form>
                    <div>
                <label>
                    Usuário:
                    <input type="text" name="name" />
                </label>
                </div>
                <div>
                <label>
                    Senha:
                    <input type="password" name="password" />
                </label>
                </div>
                <div>
                <input type="submit" value="Enviar" />
                </div>
                </form>
                
            </div>
               
        )
    }
}


export default Login;