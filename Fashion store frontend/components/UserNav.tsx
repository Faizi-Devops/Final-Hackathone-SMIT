import { useRouter } from 'next/router';
import Link from 'next/link'
import axios from 'axios';
const UserNav = () => {
    const router = useRouter()
    const onNavigatePage = async() => {
        
        const date = new Date();
        const formattedDateTime = date.toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        const email = localStorage.getItem('email');
        const id = localStorage.getItem('randomUniqueNumber');
        console.log(email)
        let adding = {
        uniqueness:id,
        email:email,
            logouttime:formattedDateTime
        }
        try {
            const logout = await axios.put("http://localhost:8000/log/updatelogindetails",adding)
            
            localStorage.removeItem('uniqueId');
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            localStorage.removeItem("fullName")
            localStorage.removeItem("randomUniqueNumber")
        router.push('/Landing')
            
        } catch (error) {
            console.log(error)
            
        }
        
    }
    return (
        <div style={{ backgroundColor: "#ffd777" }}>
            <div style={{ width: "88%", margin: "auto" }}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                    <div className="container-fluid">
                        <a className="navbar-brand" ><b>CMS | User</b></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                                <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/User/Dashboard">Dashboard</Link>
                                    
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Account Setting
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" href="/User/Profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" href="/User/Change_Password">Change Password</Link></li>
                                  
                                        
                                        
                                       
                                    </ul>
                                </li>


                                {/* <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/User/Register_Complaint">Create Order</Link>
                                </li> */}
                                <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/User/Products">Products</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/User/Cart">Cart</Link>
                                </li>
                                <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" href="/User/Complaint_History">Order History</Link>
                                </li>
                                {/* <li className="nav-item">
                                    <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "10px" }} onClick={onNavigatePage}>Logout</button>
                                </li> */}



                            </ul>
                            <form className="d-flex" role="search">

                                <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "10px" }} onClick={onNavigatePage}>Logout</button>
                            </form>

                        </div>
                    </div>
                </nav>

            </div>

        </div>
    )
}
export default UserNav;