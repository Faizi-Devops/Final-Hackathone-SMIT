import AdminNav from "@/components/AdminNav";
import Sidenavbar from "@/components/Sidenavbar";
import styles from '../../styles/Add_state.module.css';
import Image from 'next/image'
// import styles from '../../styles/Dashboard.module.css'
import Link from 'next/link'
import { useEffect, useState,useRef } from "react";
import axios from "axios";
const Check_Status = () => {
    const [data,setData]=useState<any>([])
    const [process,setProcess]=useState<any>([])
    const [closed,setClosed]=useState<any>([])
    const audioRef = useRef(null);
useEffect(()=>{
    const intervalId = setInterval(onReadData, 1000);
    onReadData()
    return () => {
      clearInterval(intervalId);
    };
    
    // sendData()
},[])
useEffect(() => {
    // Play the audio when the length of data increases
    if (data.length > 0) {
      audioRef.current.play();
    }
  }, [data]);
    const onReadData = async() =>{
        const newresponse = await axios.get(`http://localhost:8000/nop/getAllComplaints`)
        const response = await axios.get(`http://localhost:8000/proc/getprocess`)
        const alpha = await axios.get("http://localhost:8000/close/getAllCLose")
            setData(newresponse.data)
            setProcess(response.data)
            setClosed(alpha.data)
            console.log("sdgdsg",newresponse.data)

    }
    console.log("data",data)
    // const sendData = async() =>{
    //     for (const complaint of data) {
    //         try {
    //           await axios.post("http://localhost:8000/nop/createNoprocess", complaint);
    //           console.log("Complaint sent to backend:", complaint);
    //         } catch (error) {
    //           console.error("Error sending complaint to backend:", error);
    //         }
    //       }

    // }const multer  = require('multer')




    
    
    
    return (
        <div>
            <audio ref={audioRef}>
        <source src="/beep.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
            <AdminNav />

            <div className={styles.backgroundColor}>
                <hr style={{ margin: "inherit", color: "black" }} />


                <div className={styles.widthofthepage}>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12" style={{ paddingTop: "30px" }}><Sidenavbar /></div>
                        <div className="col-lg-9 col-md-6 col-sm-12 col-xs-12" style={{ paddingTop: "30px" }}>

                            <div className="card" style={{ width: "100%" }}  >

                                <div className="card-body">
                                    <h6 className="card-title text-center">Check Status</h6>
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
                                                    <h3 className="card-title text-center pt-4">{data?.length !== undefined ? data.length : "0"}</h3>
                                                    <p className="text-center text-danger">{data?.length !== undefined ? data.length : "0"} Orders not <br />process yet</p>
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

                                                    <h3 className="card-title text-center pt-4">{process?.length !== undefined ? process.length : "0"}</h3>
                                                    <p className="text-center text-danger">{process?.length !== undefined ? process.length : "0"} Orders <br /> Status in process</p>

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
                                                    <h3 className="card-title text-center pt-4">{closed?.length !== undefined ? closed.length : "0"}</h3>
                                                    <p className="text-center text-danger">{closed?.length !== undefined ? closed.length : "0"} Orders has<br />been closed</p>
                                                </div>
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
            <div style={{ width: "86%", margin: "auto" }} className="pt-4">
                <p style={{ fontSize: "13px" }}><b>© 2023 CMS</b> All rights reserved.</p>

            </div>
        </div>
    )
}
export default Check_Status