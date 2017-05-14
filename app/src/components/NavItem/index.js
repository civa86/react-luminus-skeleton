import React, { Component } from 'react'
import { Link, IndexLink, withRouter } from 'react-router'

class NavItem extends Component {
    render () {
        const
            { router, index, to, children, onlyActiveOnIndex } = this.props,
            LinkComponent = index ?  IndexLink : Link;

        return (
            <li className={router.isActive(to, onlyActiveOnIndex) ? 'active' : ''}>
                <LinkComponent to={to}>
                    {children}
                </LinkComponent>
            </li>
        )
    }
}

NavItem = withRouter(NavItem);

export default NavItem
