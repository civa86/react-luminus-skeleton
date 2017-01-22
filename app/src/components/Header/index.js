import React from 'react';
import { Link } from 'react-router';

const Header = () => {

    return (
       <header className="row">
           <div className="col-xs-12">
               <div className="container">
                   <div className="row">
                       <div className="col-xs-12">
                           Header
                           <nav>
                               <Link to="/">Home</Link>
                               &nbsp;|&nbsp;
                               <Link to="/info">Info</Link>
                           </nav>
                       </div>
                   </div>
               </div>
           </div>
       </header>
    );
};

export default Header;
