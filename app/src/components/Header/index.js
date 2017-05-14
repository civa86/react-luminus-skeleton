import React from 'react';
import { Link } from 'react-router';

import NavItem from '../NavItem';

const Header = (props) => {

    const { onLinkClick } = props;

    return (
       <header>
           <nav className="navbar navbar-default navbar-inverse" role="navigation">
               <div className="container-fluid">
                   <div className="navbar-header">
                       <button type="button"
                               className="navbar-toggle collapsed"
                               data-toggle="collapse"
                               data-target="#bs-example-navbar-collapse-1">
                           <span className="sr-only">Toggle navigation</span>
                           <span className="icon-bar"></span>
                           <span className="icon-bar"></span>
                           <span className="icon-bar"></span>
                       </button>

                       <Link to="/" className="navbar-brand">
                            <i className="glyphicon glyphicon-home"/>
                       </Link>
                   </div>

                   <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                       <ul className="nav navbar-nav">
                           <NavItem to="/about">About</NavItem>
                       </ul>
                       <ul className="nav navbar-nav navbar-right">
                           <li className="dropdown">
                               <a href="#"
                                  className="dropdown-toggle"
                                  data-toggle="dropdown">
                                   <b>Login</b> <span className="caret"></span>
                               </a>
                               <ul id="login-dp" className="dropdown-menu">
                                   <li>
                                       <div className="row">
                                           <div className="col-md-12">
                                               <form className="form" role="form" method="post" action="login" acceptCharset="UTF-8" id="login-nav">
                                                    form
                                               </form>
                                           </div>
                                       </div>
                                   </li>
                               </ul>
                           </li>
                       </ul>
                   </div>
               </div>
           </nav>
       </header>
    );
};

export default Header;
