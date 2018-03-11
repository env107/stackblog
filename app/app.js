//APP组件
import React,{Component} from 'react';
import {render} from "react-dom";
import Header from "./lib/components/header";
import {HashRouter as Router,Link,Switch,Route} from "react-router-dom";
import Index from "./lib/components/index";
import Container from "./lib/components/container";
import About from "./lib/components/about";

import './app.less';
class App extends Component{

    render(){

        return (
            <div>
            <Router>
            <div>
                <Header />
                <div className="main-container" >              
                            <Switch>
                                <Route path="/About"   component={About} />
                                <Route path="/Container/:id" strict render={(props)=>{
                                    return (
                                        <div>
                                            <Container {...props} userinfo={{id:821103}} />
                                        </div>
                                    )
                                }}  />
                                <Route path="/"  component={Index}  />
                            </Switch>                 
                        </div>
                </div>
                </Router>
            </div>
        );

    }

}

export default App;