import AdminNav from '@/components/AdminNav';
import styles from '../../styles/Admin.module.css';
import { useFormik } from "formik";
import axios from 'axios';
import { toast } from 'react-toastify';


import * as Yup from "yup";

import { useRouter } from 'next/router';
import Kuch from '@/components/Kuch';

interface FormValues {
    email: string;
    password: string;
  }

  
const Admin = () => {
    const router = useRouter();
    const formik = useFormik({
        initialValues: {

            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .label("Email")
                .required()
                .email("Invalid email address"),
            password: Yup.string()
                .label("Password")
                .required()
                .min(5, "Password must be at least 5 characters long")
            // .matches(
            //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|;:'",.<>/?\\]).*$/,
            //   "Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character"
            // ),




        }),

        onSubmit: async(values:FormValues) => {

            let a = {
                email: values.email,
                password: values.password
            }
            
        if(a){
            try {
                
        
        
                console.log(values);
                const response = await axios.post("http://localhost:8000/admi/adminlogin", values);
                console.log("response da response", response);
                if (response.data.status === "success") {
                  
                  // Login successful, redirect to the dashboard
                  const statusing = "Successfull"
                  const token = response.data.Token;

                  localStorage.setItem("admingmail",values.email)
                
                
                  
                 
               
        
        
                
                 
                  
                  toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  values.email = "";
                  values.password = "";
                  router.push('/Admin/Check_Status');
                } else {
                  // Login failed, display error message or perform other actions
                  console.error("Login failed");
                  const statusing = "Failed"
                  
                  
        
                  toast.error("Login failed. Please check your credentials.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                  values.email = "";
                  values.password = "";
                }
              } catch (error) {
                console.error("Login failed:", error);
                toast.error("An error occurred. Please try again later.", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                });
              }
            }
        
        
        
            
           
                

        }


        }


    );
  
    return (
        <div className={styles.back}>
            <div>
                <Kuch />

            </div> 
            
            <form onSubmit={formik.handleSubmit}>
            <div className="d-flex justify-content-center mt-5 ">
                <div className={`card ${styles.cardstyle} mt-5`} style={{width: "24rem"}}>
                   
                        <div className="card-body">
                            <h5 className="card-title text-center">Sign in</h5>
                            <div className="mb-3 mt-4">
                                <input type="email" className="form-control" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder="User ID" />
                                <div style={{ fontSize: "13px", color: "red" }}>{formik.touched.email && formik.errors.email && formik.errors.email}</div>
                            </div>
                            <div className="mb-3 mt-2">
                                <input type="password" className="form-control" name='password' value={formik.values.password} onChange={formik.handleChange}  placeholder="Password" />
                                <div style={{ fontSize: "13px", color: "red" }}>{formik.touched.password && formik.errors.password && formik.errors.password}</div>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary w-100 ">Login</button>
                            <br /><br /><br />

                            
                            
                        </div>
                        
                </div>
                

            </div>
            <div className='pt-5'>
            <hr />

            </div>
            <div className='container pt-3'>
              <p  style={{fontSize:"13px"}}> <b>© 2023 CMS</b> All rights reserved.</p>

            </div>
            
            </form>



        </div>
    )
}
export default Admin;