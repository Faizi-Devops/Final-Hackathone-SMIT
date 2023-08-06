import styles from '../../styles/Login.module.css';
import { useFormik } from "formik";
import { useRouter } from 'next/router'
import * as Yup from "yup";
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
const User = () => {

  const router = useRouter()
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

    onSubmit: async (values) => {
      try {
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


        console.log(values);
        const response = await axios.post("http://localhost:8000/api/userLogin", values);
        console.log("response da response", response);
        if (response.data.status === "success") {
          let kuch =  localStorage.getItem('uniqueId');
          // Login successful, redirect to the dashboard
          const statusing = "Successfull"
          const token = response.data.Token;
          localStorage.setItem('token', token);
          localStorage.setItem('email', values.email);
          const generateUniqueRandomNumber = () =>{
            return Math.floor(1000000 + Math.random() * 9000000);
          }
         
          const randomUniqueNumber:any = generateUniqueRandomNumber();
          localStorage.setItem('randomUniqueNumber',randomUniqueNumber );


          let adding = {
            email: values.email,
            logintime: formattedDateTime,
            logouttime: "",
            status: statusing,
            uniqueness:randomUniqueNumber,
            uniqueId:"" || kuch

          }
          const ultra = await axios.post("http://localhost:8000/log/logindetail", adding)
          console.log("ultra", ultra)
          console.log(token);
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
          router.push("/User/Products");
        } else {
          // Login failed, display error message or perform other actions
          console.error("Login failed");
          const statusing = "Failed"
          let adding = {
            email: values.email,
            logintime: formattedDateTime,
            logouttime: "",
            status: statusing

          }
          const ultra = await axios.post("http://localhost:8000/log/logindetail", adding)
          console.log("ultra", ultra)

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




  });
  console.log('====================================');
  console.log(formik);
  console.log('====================================');

  return (
    <div className={styles.BackgroundImage}>
      <h2 className={`text-center pt-3 ${styles.Heading}`}>Online Fashion Store</h2>
      <div className='container'>
        <hr />

      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="d-flex justify-content-center pt-5">

          <div className="card" style={{ width: "24rem" }}>

            <div className="card-body">
              <h5 className="card-title text-center">SIGN IN NOW</h5>
              <div className="mb-3 mt-4">
                <input type="email" className="form-control" name='email' value={formik.values.email} onChange={formik.handleChange} id="exampleFormControlInput1" placeholder="Email" />
                <div style={{ fontSize: "13px", color: "red" }}>{formik.touched.email && formik.errors.email && formik.errors.email}</div>
              </div>
              <div className="mb-3 mt-4">
                <input type="password" className="form-control" name='password' value={formik.values.password} onChange={formik.handleChange} id="exampleFormControlInput1" placeholder="Password" />
                <div style={{ fontSize: "13px", color: "red" }}>{formik.touched.password && formik.errors.password && formik.errors.password}</div>
              </div>
              {/* <p className={` text-end ${styles.forgetPassword}`}>Forgot Password?</p> */}

              <button type="submit" className="btn btn-primary w-100 ">SIGN IN</button>
              <hr />
              <p className={`text-center ${styles.DonotPassword}`}>Don't have an account yet?</p>
              <p className={` text-center ${styles.forgetPassword}`}><Link href="/User/Register" style={{ textDecoration: "none" }}>Create an account</Link></p>


            </div>
          </div>


        </div>
      </form>

    </div>
  )
}
export default User;