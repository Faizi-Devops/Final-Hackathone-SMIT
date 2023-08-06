import styles from '../../styles/Register.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router'
import { toast } from 'react-toastify';
import { useState } from 'react';
const Register = () => {
    const router = useRouter()
    const [confirming,setConfirming]=useState<string>("")
    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
            contact: ""
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .min(2, 'Full name is too short')
                .max(15, 'Full name is too long')
                .required('Full name is required'),
            contact: Yup.string()
                .matches(/^[0-9]{10}$/, 'Invalid contact number')
                .required('Contact number is required'),


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
            if (values.password !== confirming) {
                toast.error('Password and Confirm password do not match', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                return; // Return early if the passwords don't match
            }

            try {
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                console.log(formattedDate);




                const response: any = await axios.post("http://localhost:8000/api/userRegister", {
                    email: values.email,
                    password: values.password,
                    contactNumber: values.contact,
                    fullName: values.fullname,
                    address: "none",
                    state: "none",
                    country: "none",
                    pincode: "none",
                    regdate: formattedDate,
                    image: "back.jpg",
                    updatedAt:"no updated yet"

                })
                console.log("response", response)

                if (response.data.status === 'Success') {
                    toast.warn(response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                    // Perform any other actions after successful registration
                    // Reset the form fields
                    router.push("/User");
                    values.email = "";
                    values.password = "";
                    values.contact = "";
                    values.fullname = "";

                }


                else if (response.data.status === 'Exist') {
                    toast.warn(response.data.message, {
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
                    values.contact = "";
                    values.fullname = "";

                }
                else {
                    toast.warn("Registration failed. Please try again.", {
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
                    values.contact = "";
                    values.fullname = "";

                }

            } catch (error) {
                alert(error)


            }




        }


    });
    console.log('====================================');
    console.log(formik);
    console.log('====================================');
    const kuching = (e:any) =>{
        setConfirming(e.target.value)

    }
    return (
        <div className={styles.BackgroundImage}>
            <h2 className={`text-center pt-3 ${styles.Heading}`}>Online Fashion System</h2>
            <div className='container'>
                <hr />

            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex justify-content-center pt-5">

                    <div className="card" style={{ width: "20rem" }}>

                        <div className="card-body">
                            <h5 className="card-title text-center">USER REGISTRATION</h5>
                            <div className="mb-3 mt-4">
                                <input type="text" className="form-control" name='fullname' value={formik.values.fullname} onChange={formik.handleChange} placeholder="Full Name" style={{ height: "35px" }} />
                                <div style={{ fontSize: "13px", color: "red" }} className="text-center">{formik.touched.fullname && formik.errors.fullname && formik.errors.fullname}</div>
                            </div>
                            <div className="mb-3 ">
                                <input type="email" className="form-control" name='email' value={formik.values.email} onChange={formik.handleChange} placeholder="Email ID" style={{ height: "35px" }} />
                                <div style={{ fontSize: "13px", color: "red" }} className="text-center">{formik.touched.email && formik.errors.email && formik.errors.email}</div>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" name='password' value={formik.values.password} onChange={formik.handleChange} placeholder="Password" style={{ height: "35px" }} />
                                <div style={{ fontSize: "13px", color: "red" }} className="text-center">{formik.touched.password && formik.errors.password && formik.errors.password}</div>
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Confirm Password" onChange={kuching} />
                            </div>
                            <div className="mb-3">
                                <input type="number" className="form-control" name='contact' value={formik.values.contact} onChange={formik.handleChange} placeholder="Contact no" style={{ height: "35px" }} />
                                <div style={{ fontSize: "13px", color: "red" }} className="text-center">{formik.touched.contact && formik.errors.contact && formik.errors.contact}</div>
                            </div>
                            


                            <button type="submit" className="btn btn-primary w-100 ">Register</button>
                            <hr />
                            <p className={`text-center ${styles.DonotPassword}`}>Already Register?</p>
                            <p className={` text-center ${styles.forgetPassword}`}><Link href="/User" style={{ textDecoration: "none" }}>Sign In</Link></p>


                        </div>
                    </div>


                </div>
            </form>

        </div>
    )
}
export default Register;