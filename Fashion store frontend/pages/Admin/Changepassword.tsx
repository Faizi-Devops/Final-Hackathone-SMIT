import AdminNav from "@/components/AdminNav";
import Sidenavbar from "@/components/Sidenavbar";
import styles from '../../styles/Changepassword.module.css';
import { toast } from "react-toastify"
import { useState } from "react";
import axios from "axios";
const Changepassword = () => {
    const [current,setCurrent] = useState<string>("");
    const [newing,setNewing]=useState<string>("")
    const [confirm,setConfirm]=useState<string>("")
    const alpha = (e:any) =>{
        setCurrent(e.target.value)

    }
    
    const beta = (e:any) =>{
        setNewing(e.target.value)


    }
    const gema = (e:any) =>{
        setConfirm(e.target.value)

    }
    
    const onSubmitHandler = async () => {
        try {
            if (current && newing && confirm !== "") {
                if (newing === confirm) {
                    const data = localStorage.getItem('admingmail');
                    let adding = {
                        email: data,
                        password: current,
                        newPassword: newing
                    };
    
                    const response = await axios.put("http://localhost:8000/admi/adminchanging", adding);
                    toast(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setConfirm("");
                    setNewing("");
                    setCurrent("");
                } else {
                    toast('Password and confirm password do not match', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
            } else {
                toast('Please fill all the fields', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div>
            <AdminNav />

            <div className={styles.backgroundColor}>
                <hr style={{ margin: "inherit", color: "black" }} />


                <div className={styles.widthofthepage}>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12" style={{ paddingTop: "30px" }}><Sidenavbar /></div>
                        <div className="col-lg-9 col-md-6 col-sm-12 col-xs-12" style={{ paddingTop: "30px" }}>
                            <div className="card" style={{ width: "100%" }}  >

                                <div className="card-body">
                                    <h6 className="card-title text-center">Admin Change Password</h6>
                                    <div className="row pt-3">
                                        <div className={`col-lg-3 ${styles.currentpassword}`}><p style={{fontSize:"15px",marginBottom:"0px"}}>Current Password</p></div>
                                        <div className="col-lg-7" style={{ marginBottom: "0px" }}>
                                            <div>
                                                <input type="password" className="form-control" value={current} id="exampleFormControlInput1" placeholder="Enter your current password" style={{height:"33px"}} onChange={alpha}/>
                                            </div>
                                        </div>
                                        <div style={{width:"94%",margin:"auto"}}>
                                        <hr />

                                        </div>
                                        

                                    </div>
                                    <div className="row">
                                        <div className={`col-lg-3 ${styles.currentpassword}`}><p style={{fontSize:"15px",marginBottom:"0px"}}>New Password</p></div>
                                        <div className="col-lg-7">
                                            <div>
                                                <input type="password" className="form-control" value={newing} id="exampleFormControlInput1" placeholder="Enter your new current password" style={{height:"33px"}} onChange={beta} />
                                            </div>
                                        </div>
                                        <div style={{width:"94%",margin:"auto"}}>
                                        <hr />

                                        </div>
                                        

                                    </div>
                                    <div className="row ">
                                        <div className={`col-lg-3 ${styles.currentpassword}`}><p style={{fontSize:"15px",marginBottom:"0px"}}>Confirm Password</p></div>
                                        <div className="col-lg-7">
                                            <div>
                                                <input type="password" className="form-control" value={confirm} id="password-input" placeholder="Enter your new Password again"  style={{height:"33px"}} onChange={gema}/>
                                            </div>
                                        </div>
                                        <div style={{width:"94%",margin:"auto"}}>
                                        <hr />

                                        </div>
                                        

                                    </div>


                                    <div className="row ">
                                        <div className={`col-lg-3`}></div>
                                        <div className="col-lg-7">
                                            <div>
                                            <button type="button" className="btn btn-primary" onClick={onSubmitHandler}>Submit </button>
                                                
                                            </div>
                                        </div>
                                       
                                        

                                    </div>


                                   
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    

                </div>
                
            </div>
            

            <hr style={{ margin: "inherit", color: "black" }} />
            <div style={{width:"86%",margin:"auto"}} className="pt-4">
                <p style={{fontSize:"13px"}}><b>© 2023 CMS</b> All rights reserved.</p>

            </div>
        </div>
        
    )
}
export default Changepassword;