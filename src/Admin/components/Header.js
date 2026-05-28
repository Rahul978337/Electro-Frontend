import { useEffect } from 'react';
import { Link,useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2';

function Hearder() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // localStorage.clear();
        // navigate('/admin', { replace: true });
        Swal.fire({
              title: "Do you want to save the changes?",
              text: "you will not be able to recover this item",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "yes,delet it",
              cancelButtonText: "no,cancel"
        
        
            }).then((result)=>{
                if(result.isConfirmed){

                    localStorage.clear();
        navigate('/admin', { replace: true });
                }
            })
    };
    useEffect(()=>{
        const getToken=localStorage.getItem("adminToken")
        
        if (getToken) {
            // console.log("token found sucessfully",getToken)

            
        } else {
            navigate('/admin');
            
        }
    }
    )
    return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <Link to={'/admin/dashboard'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <Link to={'/admin/profile'} className="nav-link">My Profile</Link>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link" onClick={handleLogout}>Logout</a>
                </li>
            </ul>
            {/* Right navbar links */}
            </nav>
    );
  } 
  
  export default Hearder;