import React, { Component } from "react";
import { Container, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

class MainPage extends Component {

    render () {

        return(

            <div className="App-header">
                
                    
                    <Button variant="dark" size="lg" >
                        <Link to="/stores">
                            Ir para lojas
                        </Link>
                    </Button>
                    <Button variant="dark" size="lg">
                        <Link to="/map">
                            Ir para mapa
                        </Link>
                    </Button>
                
            </div>
               
        )
    }
}

export default MainPage;