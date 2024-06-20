import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authManager";


export default function NavBar({ loggedInUser, setLoggedInUser}) {
    const [open, setOpen] = useState(false);


const toggleNavbar = () => setOpen(!open);

return (
    <div >
    <Navbar color="light" light fixed="true" expand="lg">
    <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        Taskly
        </NavbarBrand>
        {loggedInUser ? (
                <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
                        <Nav navbar>   
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/create-task">Create Task</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={RRNavLink} to="/complete">Completed</NavLink>
                            </NavItem>
          
                </Nav>
            </Collapse>
            <Button
            color="primary"
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                setLoggedInUser(null);
                setOpen(false);
                });
            }}
                        className="mt-2"
                    >
                        
            Logout
            </Button>
                    
        </>
        ) : (
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                <Button color="primary" className="mt-2">Login</Button>
            </NavLink>
            </NavItem>
                      
        </Nav>
        )}
    </Navbar>
    </div>

);
}

