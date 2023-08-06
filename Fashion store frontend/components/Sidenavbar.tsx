import Link from 'next/link'
const Sidenavbar = () => {
    return (
        <div className="container-fluid">
            <div>
                <div>
                    <div style={{ height: "auto", backgroundColor: "black", borderRadius: "5px" }}>
                        <div style={{ height: "auto", padding: "0px" }}>


                        <div className="accordion" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button fixing collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" style={{ borderColor: 'transparent' }}>
        <div>
          <p style={{ color: "white" }}><i className="fa-solid fa-gear"></i> <span style={{ paddingLeft: "10px" }} className="one">Manage Documents</span></p>
        </div>
      </button>
    </h2>
    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
      <div className="simpling">
                        <div style={{ height: "50px" }}>
                            <Link href="/Admin/Not_process" style={{ textDecoration: "none" }}>
                                <div style={{ padding: "15px 13px 10px 13px" }}>
                                    <p style={{ color: "white" }}><i className="fa-solid fa-circle-exclamation"></i> <span style={{ paddingLeft: "10px" }} className="one">No Process Yet Orders</span></p>


                                </div>
                            </Link>

                        </div>
                        <hr style={{ margin: "inherit", color: "white" }} />
                        <div style={{ height: "50px" }}>
                            <Link href="/Admin/Pending_complaint" style={{ textDecoration: "none" }}>
                                <div style={{ padding: "15px 13px 10px 13px" }}>
                                    <p style={{ color: "white" }}><i className="fa-solid fa-hourglass"></i> <span style={{ paddingLeft: "10px" }} className="one">Pending Orders</span></p>


                                </div>
                            </Link>

                        </div>
                        <hr style={{ margin: "inherit", color: "white" }} />
                        <Link href="/Admin/Closed_complaint" style={{ textDecoration: "none" }}>
                            <div style={{ padding: "15px 13px 10px 13px" }}>
                                <p style={{ color: "white" }}><i className="fa-regular fa-folder-closed"></i> <span style={{ paddingLeft: "10px" }} className="one">Closed Orders</span></p>


                            </div>
                        </Link>
                        

                    </div>
      </div>
    </div>
  </div>
</div>



                        </div>
                        <hr style={{ margin: "inherit", color: "white" }} />
                        <Link href="/Admin/Manage_users" style={{ textDecoration: "none" }}>
                            <div style={{ height: "60px" }}>
                                <div style={{ padding: "15px 13px 10px 13px" }}>
                                    <p style={{ color: "white" }}><i className="fa-solid fa-users"></i> <span style={{ paddingLeft: "10px" }} className="one">Manage Users</span></p>


                                </div>


                            </div>
                        </Link>



                    </div>
                    <div className="ndnaving">
                        <div style={{ height: "50px" }}>
                            <Link href="/Admin/Add_category" style={{ textDecoration: "none" }}>
                                <div style={{ padding: "15px 13px 10px 13px" }}>
                                    <p style={{ color: "white" }}><i className="fa-sharp fa-solid fa-bars"></i> <span style={{ paddingLeft: "10px" }} className="one">Add Product</span></p>


                                </div>
                            </Link>

                        </div>
                        <hr style={{ margin: "inherit", color: "white" }} />
                        {/* <div style={{ height: "50px" }}>
                            <Link href="/Admin/Add_subcategory" style={{ textDecoration: "none" }}>
                                <div style={{ padding: "1F5px 13px 10px 13px" }}>
                                    <p style={{ color: "white" }}><i className="fa-sharp fa-solid fa-bars"></i> <span style={{ paddingLeft: "10px" }} className="one">Add Sub-Category</span></p>


                                </div>
                            </Link>

                        </div> */}
                        <hr style={{ margin: "inherit", color: "white" }} />
                        {/* <Link href="/Admin/Add_state" style={{ textDecoration: "none" }}>
                            <div style={{ padding: "15px 13px 10px 13px" }}>
                                <p style={{ color: "white" }}><i className="fa-solid fa-file-circle-plus"></i> <span style={{ paddingLeft: "10px" }} className="one">Add Department</span></p>


                            </div>
                        </Link> */}

                    </div>
                    <div className="thirdnaving">
                        <Link href="/Admin/User_Login_log" style={{ textDecoration: "none" }}>
                            <div style={{ padding: "15px 13px 0px 13px" }}>
                                <p style={{ color: "white" }}><i className="fa-sharp fa-solid fa-bars"></i> <span style={{ paddingLeft: "10px" }} className="one">User Login Log</span></p>


                            </div>
                        </Link>
                        <hr style={{ margin: "inherit", color: "white" }} />
                        <Link href="/Admin/Changepassword" style={{ textDecoration: "none" }}>
                            <div style={{ padding: "15px 13px 0px 13px" }}>
                                <p style={{ color: "white" }}><i className="fa-solid fa-lock"></i> <span style={{ paddingLeft: "10px" }} className="one">Change Password</span></p>


                            </div>
                        </Link>
                        
                        


                    </div>


                </div>



            </div>

        </div>
    )
}
export default Sidenavbar;