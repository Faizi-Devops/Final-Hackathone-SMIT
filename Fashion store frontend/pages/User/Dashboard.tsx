import UserNav from "@/components/UserNav";
import Image from 'next/image'
import styles from '../../styles/Dashboard.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [data,setData]=useState<any>({})
    const [noprocess,setNoprocess]=useState<any>()
    const [process,setProcess]=useState<any>()
    const [closed,setClosed]=useState<any>()


   

    useEffect(() => {
        getSignInuserData()
        const interval = setInterval(() => {
            dating()
          }, 1000);
          return () => clearInterval(interval);

    }, [])
    console.log(data.image)


    const getSignInuserData = async () => {
        try {
            const userEmail = localStorage.getItem('email');
            const response:any =await  axios.get(`http://localhost:8000/api/userData?email=${userEmail}`)
            setData(response?.data)
            const newresponse = await axios.get(`http://localhost:8000/comp/complainemail?email=${userEmail}`)
            setNoprocess(newresponse.data[0].notprocess)
            setProcess(newresponse.data[0].process)
            setClosed(newresponse.data[0].closed)

            console.log(newresponse.data)
            
            
           
            const sdd = localStorage.setItem('fullName',response.data.fullName);
            
            
            
            console.log("Dashboard",response?.data?.image)
            
            // localStorage.setItem('uniqueId', response.data.uniqueId);

        } catch (error) {
            console.log(error)

        }


    }
    const dating = async() =>{
        try {
            const userEmail = localStorage.getItem('email');
        const newresponse = await axios.get(`http://localhost:8000/comp/complainemail?email=${userEmail}`)
            setNoprocess(newresponse.data[0].notprocess)
            setProcess(newresponse.data[0].process)
            setClosed(newresponse.data[0].closed)

            console.log(newresponse.data)
            
        } catch (error) {
            console.log(error)
            
        }
        
        
    }
    // localStorage.setItem('fullName',data.fullName);
    return (
        <div>
            <UserNav />
            <div className="d-flex justify-content-center pt-4" style={{borderRadius:"50%"}}>
                <Image

                    src={`http://localhost:8000/uploads//${data.image}`}
                    alt="Picture of the author"
                    width={130}
                    height={130}
                    style={{ borderRadius: '50%' }}

                />


            </div>
            <h3 className=" text-center nothing pt-2" style={{fontFamily:"Times New Roman', Times, serif"}}>{data.fullName}</h3>

            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-4">
                        <div className={`card ${styles.cardstyle}`} style={{ width: "100%" }}>

                            <div className="card-body">
                                <div className="text-center pt-3">


                                    <Image

                                        src="/file.png"
                                        alt="Picture of the author"
                                        width={70}
                                        height={70}
                                    />
                                </div>
                                <h3 className="card-title text-center pt-4">{noprocess ? noprocess : "0"}</h3>
                                <p className={styles.changecolor}>{noprocess ? noprocess : "0"} Orders not <br />process yet</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-4">
                        <div className={`card ${styles.cardstyle}`} style={{ width: "100%" }}>

                            <div className="card-body">
                                <div className="text-center pt-3">


                                    <Image

                                        src="/file.png"
                                        alt="Picture of the author"
                                        width={70}
                                        height={70}
                                    />
                                </div>

                                <h3 className="card-title text-center pt-4">{process ? process : "0"}</h3>
                                <p className={styles.changecolor}>0 Orders <br /> Status in process</p>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12 col-xs-12 pt-4">
                        <div className={`card ${styles.cardstyle}`} style={{ width: "100%" }}>

                            <div className="card-body">
                                <div className="text-center pt-3">


                                    <Image

                                        src="/file.png"
                                        alt="Picture of the author"
                                        width={70}
                                        height={70}
                                    />
                                </div>
                                <h3 className="card-title text-center pt-4">{closed ? closed : "0"}</h3>
                                <p className={styles.changecolor}>{closed ? closed : "0"} Orders has<br />been closed</p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default Dashboard;