import AdminNav from "@/components/AdminNav";
import Sidenavbar from "@/components/Sidenavbar";
import styles from '../../styles/Manage_users.module.css';
import Link from 'next/link'
import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import axios from "axios";
const Manage_users = () => {
    const [data, setData] = useState([])
    const [showing,setShowing]=useState<any>({})
    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/getUsers");
            console.log(response.data);
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    const onDeleteHandler = async (iding: any) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/deleteUser/${iding}`);
            alert(response.data.message)
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
            console.log(response.data);

        } catch (error) {
            console.log(error)

        }

        const deleteState = data.filter((value: any, index) => {
            if (iding !== value._id) {
                return value

            }

        })
        setData([...deleteState])

    }
    const onFetchAllData = (valueing:any) =>{
        setShowing(valueing)

    }



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
                                    <h6 className="card-title text-center">Manage Users</h6>
                                    {
                                       data.length === 0 ?<div className="alert alert-warning alert-dismissible fade show" role="alert">
                                       <strong>Hii Admin! </strong>There are no user details  for showing.
                                      
                                     </div>:
                                     <div>
                                         <marquee style={{color:"red"}}> Here's the details of the successfull register users</marquee>
                                    <div className="table-responsive ">


                                        <table className="table table-striped">
                                            <thead className="table-dark">
                                                <tr>
                                                    <td scope="col">#</td>
                                                    <td scope="col">Name</td>
                                                    <td scope="col">Email</td>
                                                    <td scope="col">Contact no</td>
                                                    <td scope="col">Reg. Date</td>
                                                    <td scope="col">Detail</td>
                                                    <td scope="col">Delete</td>

                                                </tr>
                                            </thead>
                                            {
                                                data.map((value: any, index) => {
                                                    return (
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{value.fullName}</td>
                                                                <td>{value.email}</td>
                                                                <td>{value.contactNumber}</td>
                                                                <td>{value.regdate}</td>
                                                                <td>
                                                                    <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "30px" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>onFetchAllData(value)}>Details</button>
                                                                </td>
                                                                <td>
                                                                    <button type="button" className="btn btn-danger btn-sm" style={{ borderRadius: "30px" }} onClick={() => onDeleteHandler(value._id)}>Delete</button>
                                                                </td>
                                                            </tr>


                                                        </tbody>

                                                    )
                                                })
                                            }

                                        </table>
                                        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">User Detail</h1>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <h6>
                                                            User Name: <span style={{ display: 'inline' }}>{showing.fullName}</span><br />
                                                            User email: <span style={{ display: 'inline' }}>{showing.email}</span><br />
                                                            Contact Number: <span style={{ display: 'inline' }}>{showing.contactNumber}</span><br />
                                                            Registration Date: <span style={{ display: 'inline' }}>{showing.regdate}</span><br />
                                                            Address: <span style={{ display: 'inline' }}>{showing.address}</span><br />
                                                            State: <span style={{ display: 'inline' }}>{showing.state}</span><br />
                                                            Country: <span style={{ display: 'inline' }}>{showing.country}</span><br />
                                                          
                                                            Pin Code: <span style={{ display: 'inline' }}>{showing.pincode}</span>
                                                        </h6>



                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    }
                                    <div className="text-center">
                                        <button type="button" style={{ borderRadius: "20px" }} className="btn btn-primary"><Link href="/Admin/See_All_Users" style={{ textDecoration: "none" }}> <span style={{ color: "white" }}>See All</span></Link></button>
                                    </div>








                                </div>

                            </div>
                        </div>
                    </div>


                </div>

            </div>


            <hr style={{ margin: "inherit", color: "black" }} />
            <div style={{ width: "86%", margin: "auto" }} className="pt-4">
                <p style={{ fontSize: "13px" }}><b>© 2023 CMS</b> All rights reserved.</p>

            </div>
        </div>

    )
}
export default Manage_users;