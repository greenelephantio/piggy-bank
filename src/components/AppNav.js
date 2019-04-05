import React from 'react';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import { CultureSelector } from './CultureSelector';
import brand from './assets/images/brand.svg';
import { isLoggedIn } from '../utils/auth-service';

export class AppNav extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            points: 0
        };    }

    texts = {
        'logOut': {
            'en': { value: 'Log out' },
            'sv': { value: 'Logga ut' },
            'de': { value: 'Abmelden' }
        },
        'logIn': {
            'en': { value: 'Log in' },
            'sv': { value: 'Logga in' },
            'de': { value: 'Anmelden' }
        },
        'settings': {
            'en': { value: 'Settings' },
            'sv': { value: 'Inställnigar' },
            'de': { value: 'Einstellungen' }
        },
        'about': {
            'en': { value: 'About' },
            'sv': { value: 'Info' },
            'de': { value: 'Info' }
        }
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    translate = (textId) => {
        let text = this.texts[textId];
        return text[this.props.culture.language].value;
    }

    isLoggedIn = () => {
        return isLoggedIn();
    }

    login = () => {

    }

    logout = () => {
        
    }

    render() {
        return (
            <div>
                <Navbar color="primary" light expand="md">
                    <NavbarBrand href="/"><span><img src={brand} width="30" height="30" className="d-inline-block align-top" alt="" /></span> Piggy Bank</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link className="nav-link" to="/">Home</Link>
                            </NavItem>
                            <NavItem>
                                <Link className="nav-link" to="/about">{this.translate('about')}</Link>
                            </NavItem>
                            {
                                (this.isLoggedIn()) ?
                                    <NavItem>
                                        <Link className="nav-link" to="/settings">{this.translate('settings')}</Link>
                                    </NavItem>
                                    : ''
                            }
                            <NavItem>
                                {
                                    (this.isLoggedIn()) ?
                                        (
                                            <NavLink onClick={() => this.logout()} href="#">{this.translate('logOut')}</NavLink>
                                        ) :
                                        (
                                            <NavLink href="#" onClick={() => this.login()} >
                                                {this.translate('logIn')}
                                            </NavLink>
                                        )
                                }
                            </NavItem>
                            <CultureSelector culture={this.props.culture} changeCulture={this.props.changeCulture} />
                        </Nav>
                    </Collapse>
                </Navbar>
            </div >
        )
    }
}
