import React from 'react';
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import "./AdminSidebar.css"

const AdminSidebar = () => {
    return (
      
            <div className=" SideBar_Admin">
                <div className=" bg-dark sidebar" style={{ height: '100vh', overflowY: 'auto', maxHeight: '500px' }}>
                    <h4 className="mt-3">Admin Panel</h4>
                    <Nav className="flex-column">
                        <Nav.Item>
                            <Link className="nav-link  sidebar-link" to="/">
                                <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link  sidebar-link" to="/Banner">
                                <i className="fas fa-image me-2"></i>Banner
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link  sidebar-link" to="/products">
                                <i className="fas fa-box me-2"></i>Manage Products
                            </Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
      
    );
};

export default AdminSidebar;
