//Header 组件
import React,{Component} from 'react';
import "./header.less";
import {Link} from "react-router-dom";
class Header extends Component{

    render(){

        return (
            <div className="header-container">
                <div className="header-title">
                    Stack
                </div>
                <div className="header-version">
                    Life is simple 
                </div>
                <div className="header-about">
                    <Link to="/About">@</Link>
                </div>
            </div>
        );

    }
    
}

export default Header;