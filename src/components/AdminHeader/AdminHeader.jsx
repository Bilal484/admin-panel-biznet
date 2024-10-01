import React from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import logo from '../../assets/images/logo.png'; 
import "./AdminHeader.css"

const AdminHeader = () => {
    return (
        <Navbar bg="light" expand="lg" className="shadow-sm ">
            <Container fluid>
                <Navbar.Brand href="/">
                    <img src={logo} alt="Biznet" width="60" height="60" className="d-inline-block align-top" />
                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                       
                    </Nav>
                    {/* Search Filter */}
                    <Form className="d-flex">
                        <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    {/* User Section */}
                    <Button className="ms-3" variant="dark">User</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AdminHeader;
