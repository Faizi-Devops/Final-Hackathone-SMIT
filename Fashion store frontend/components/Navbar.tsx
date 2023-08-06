import Link from 'next/link';
const Navbar = () =>{
    return(
        <div>
            <nav className="navbar navbar-expand-lg NavbarBackgroundColour">
  <div className="container">
    <a className="navbar-brand"><span className="NavbarTextcolor textresponsive">Online Fashion Store</span></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link href="/User" className="nav-link linkingtext" aria-current="page">User Login</Link>
        </li>
        <li className="nav-item">
          <Link href="/User/Register" className="nav-link linkingtext" aria-current="page">User Registration</Link>
        </li>
        <li className="nav-item">
        <Link href="/Admin" className="nav-link linkingtext" aria-current="page">Admin</Link>
        </li>
       
        
      </ul>
     
    </div>
  </div>
</nav>



        </div>
    )
}
export default Navbar;