import AdminNav from "@/components/AdminNav";
import Sidenavbar from "@/components/Sidenavbar";
import styles from '../../styles/User_Login_log.module.css';
import Link from 'next/link'
import axios from "axios";
import { toast } from "react-toastify"
import { useEffect, useState } from "react";
const User_Login_log = () => {
    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const [originalData, setOriginalData] = useState<any[]>([]);
    const alpha = (e: any) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        if (searchValue === "") {
            setData(originalData);
        } else {
            const filteredData = originalData.filter((item) =>
                item.email.includes(searchValue)
            );
            setData(filteredData);
        }
    }
    useEffect(() => {
       
            getAllLog();
          
    }, [])
    const getAllLog = async () => {
        try {
            const getting = await axios.get("http://localhost:8000/log/getlogindetail");
            const alpha= getting.data.login
            // console.log("alpha",alpha[1].uniqueId)
            // console.log("data",getting.data.login)
            // console.log(getting.data.login.uniqueId)
            
            setData(getting.data.login);
            console.log("Login loh",getting.data.login);
            setOriginalData(getting.data.login);

        } catch (error) {
            console.log(error)

        }


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
                                    <div className="row pt-3 ">
                                        <div className="col-lg-3"></div>
                                        <div className="col-lg-6">
                                            <h3 style={{ fontFamily: "times-new-romen" }} className="text-center" >Search</h3>
                                            <div className="mb-3">
                                                <input type="email" className="form-control" placeholder="Search email......" style={{ height: "40px", borderRadius: "30px" }} onChange={alpha} />
                                            </div>
                                        </div>
                                        <div className="col-lg-3"></div>


                                    </div>
                                    <marquee style={{color:"red"}}>Please search the required data with the email</marquee>
                                    <div className="table-responsive">


                                        <table className="table table-striped">

                                            <thead className="table-dark">
                                                <tr>
                                                    <td scope="col">#</td>
                                                    <td scope="col">Email</td>
                                                    <td scope="col">Login Time</td>
                                                    <td scope="col">Logout Time</td>
                                                    <td scope="col">Status</td>


                                                </tr>
                                            </thead>
                                            {
                                                data?.map((value:any,index:number) => {
                                                    return (
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row">{index+1}</th>
                                                                <td>{value.email}</td>
                                                                <td>{value.logintime}</td>
                                                                <td>{value.logouttime}</td>
                                                                <td>{value.status}</td>

                                                            </tr>


                                                        </tbody>

                                                    )
                                                })
                                            }

                                        </table>
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
export default User_Login_log;