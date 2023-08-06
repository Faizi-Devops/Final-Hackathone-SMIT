import Link from "next/link";
const Kuch = () => {
    return (
        <div style={{backgroundColor:"lightblue"}}>
            <div style={{width:"88%",margin:"auto"}}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                    <div className="container-fluid">
                        <a className="navbar-brand" ><b>CMS | Admin</b></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                           
                            <Link href="/" className="nav-link linkingtext" aria-current="page"><span style={{fontSize:"13px"}}>Back to Portal</span></Link>
                           

                            
                                </li>
                               
                                
                                
                                
                            </ul>
                          
                        </div>
                    </div>
                </nav>

            </div>

        </div>
    )
}
export default Kuch;