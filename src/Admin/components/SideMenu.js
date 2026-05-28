import { Link } from "react-router-dom";

function SideMenu() {
    return (
       <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/* Brand Logo */}
                <Link to={'/admin/dashboard'} className="brand-link">
                    <img src="/dist/img/downloadlogo.png" alt="AdminLTE Logo"  style={{width:"200px",height:"60px"}} />
                    {/* <span className="brand-text font-weight-light"></span> */}
                </Link>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="Admin Image" />
                    </div>
                    <div className="info">
                        <Link to={'/admin/profile'} className="d-block">Admin</Link>
                    </div>
                    </div>
                    <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* Add icons to the links using the .nav-icon class
                            with font-awesome or any other icon font library */}
                        <li className="nav-item menu-open">
                        <Link to={'/admin/dashboard'} className="nav-link active">
                            <i className="nav-icon fas fa-tachometer-alt" />
                            <p>
                            Dashboard
                            </p>
                        </Link>
                        </li>
                         <li className="nav-item menu-open">
                        <Link to={'/admin/customer'} className="nav-link active">
                            <i className="nav-icon fas fa-users" />
                            
                            <p>
                            Customers
                            </p>
                        </Link>

                        <Link to={'/admin/category'} className="nav-link active">
                            <i className="nav-icon fas fa-list" />
                            
                            <p>
                            Category
                            </p>
                        </Link>

                        <Link to={'/admin/product'} className="nav-link active">
                            <i className="nav-icon fas fa-box" />
                            
                            <p>
                            Product
                            </p>
                        </Link>

                        <Link to={'/admin/orderDetail'} className="nav-link active">
                            <i className="nav-icon fas fa-shopping-cart" />
                            
                            <p>
                            Orders
                            </p>
                        </Link>
                        <Link to={'/admin/contactDetails'} className="nav-link active">
                            <i className="nav-icon fas fa-envelope" />
                            
                            <p>
                            Contact
                            </p>
                        </Link>
                        <Link to={'/admin/slider'} className="nav-link active">
                            <i className="nav-icon fas fa-images" />
                            
                            <p>
                            Slider
                            </p>
                        </Link>
                        </li>
                    </ul>
                    </nav>
                    {/* /.sidebar-menu */}
                </div>
                {/* /.sidebar */}
        </aside>
      );
}
export default SideMenu;