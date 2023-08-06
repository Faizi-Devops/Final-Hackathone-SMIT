import AdminNav from "@/components/AdminNav";
import Sidenavbar from "@/components/Sidenavbar";
import styles from '../../styles/Manage_users.module.css';
import Link from 'next/link'
import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import axios from "axios";

const Not_process = () => {
    const [data,setData]=useState<any>([])
    const [something, setSomething] = useState<any>({})
    const [process,setProcess]=useState<any>()
    const [search, setSearch] = useState<string>("");
    const [originalData, setOriginalData] = useState<any[]>([]);
    const [notprocess,setNotprocess]=useState<any>()
    const [close,setClose]=useState()
    const [email,setEmail]=useState<any>()
    const [iding,setIding]=useState<any>()
    const [numbering,setNumbering]=useState<any>()
    const searching = (e:any) =>{
      const searchValue = e.target.value;
      setSearch(searchValue);
      if (searchValue === "") {
          setData(originalData);
      } else {
          const filteredData = originalData.filter((item) =>
             String( item.complainumber).includes(searchValue)
          );
          setData(filteredData);
      }


    }
useEffect(()=>{
     // const interval = setInterval(() => {
            // getSignInuserData()
        //   }, 3000);
        //   return () => clearInterval(interval);
    onReadData()
    // sendData()
},[])
    const onReadData = async() =>{
        const newresponse = await axios.get(`http://localhost:8000/nop/getAllComplaints`)
        
            setData(newresponse.data)
            console.log("sdgdsg",newresponse.data)
            setOriginalData(newresponse.data);

    }




    const onViewHandler = async(value: any) => {
        const newresponse:any = await axios.get(`http://localhost:8000/comp/complainemail?email=${value.email}`)
        setEmail(value.email)
        setNotprocess(newresponse.data[0].notprocess)
        setProcess(newresponse.data[0].process)
        setClose(newresponse.data[0].closed)
        setIding(value._id)
        setNumbering(value.complainumber)
        console.log("no process",newresponse.data[0].notprocess)
        console.log("process",newresponse.data[0].process)
        console.log("process",newresponse.data[0].closed)
            
        setSomething(value)
      }
      console.log("something", something)
      const handleFileClick = () =>{
        const fileURL = `http://localhost:8000/noprocess/${something.file}`;
        window.open(fileURL);
      }
       console.log(something)
const onProcess = async()=>{
  let some = {
    email:something.email,
    complainumber:something.complainumber,
    category:something.category,
    complainttype:something.complainttype,
    nature:something.nature,
    details:something.details,
    finalstatus:"In Process",
    regdate:something.regdate,
    subcategory:something.subcategory,
    state:something.state,
    file:something.file,
    fullName:something.fullName,
    notprocess:something.notprocess,
    process:something.process,
    close:something.close,
    updated:something.updated



  }
  console.log(some)
    const response = await axios.post("http://localhost:8000/proc/createProcess",some) 
    const updatedCount = Number(process) + 1;
            setProcess(updatedCount);
    const notproc = Number(notprocess)-1;
    setNotprocess(notproc)
    let adding = {
        email:email,
        process:updatedCount,
        notprocess:notproc

    }
    const kuch = axios.post("http://localhost:8000/comp/countingprocess",adding)
    const deleteState = data.filter((value:any, index:number) => {
        if (iding !== value._id) {
            return value

        }

    })
    setData([...deleteState])
    const reesponse = await axios.delete(`http://localhost:8000/nop/deleteComplain/${iding}`);
    const date = new Date();
        const formattedDateTime = date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        const final = "Processing"
    let sd = {
        complainumber:numbering,
        updated:formattedDateTime,
        finalstatus:final

    }
    const tt = axios.post("http://localhost:8000/comp/updatewithnumber",sd)
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
}
// const onCloss = async() =>{
//   const response = await axios.post("http://localhost:8000/close/createClose",something) 

// }
const onCloss = async()=>{
  let some = {
    email:something.email,
    complainumber:something.complainumber,
    category:something.category,
    complainttype:something.complainttype,
    nature:something.nature,
    details:something.details,
    finalstatus:"Closed",
    regdate:something.regdate,
    subcategory:something.subcategory,
    state:something.state,
    file:something.file,
    fullName:something.fullName,
    notprocess:something.notprocess,
    process:something.process,
    close:something.close,
    updated:something.updated



  }
  console.log(some)
    const response = await axios.post("http://localhost:8000/close/createClose",some) 
    const closeCount:any = Number(close) + 1;
            setClose(closeCount);
    const proc = Number(notprocess)-1;
    setProcess(proc)
    let adding = {
        email:email,
        closed:closeCount,
        notprocess:proc

    }
    const kuch = axios.post("http://localhost:8000/comp/countingClose",adding)
    const deleteState = data.filter((value:any, index:number) => {
        if (iding !== value._id) {
            return value

        }

    })
    setData([...deleteState])
    try {
      const reesponse = await axios.delete(`http://localhost:8000/nop/deleteComplain/${iding}`);
      
    } catch (error) {
      console.log(error)
      
    }
    
    const date = new Date();
        const formattedDateTime = date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        const final = "Closed"
    let sd = {
        complainumber:numbering,
        updated:formattedDateTime,
        finalstatus:final

    }
    const tt = axios.post("http://localhost:8000/comp/updatewithnumber",sd)
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
                                    <h6 className="card-title text-center"><i>Not Process Documents</i></h6>
                                    <div className="d-flex justify-content-center">
                                        <div className="col-lg-6">
                                            <h3 style={{ fontFamily: "times-new-romen" }} className="text-center">Search</h3>
                                            <div className="mb-3">
                                                <input type="email" className="form-control" placeholder="Search Document...." style={{ height: "40px", borderRadius: "30px" }}  onChange={searching} />
                                            </div>
                                        </div>

                                    </div>
                                    {
                                       data.length === 0 ?<div className="alert alert-warning alert-dismissible fade show" role="alert">
                                       <strong>Hii Admin! </strong>There are no Documents for showing.
                                      
                                     </div>:
                                     <div>
                                      <marquee style={{color:"red"}}>Please search the document with the Document number</marquee>
                                    
                                    <div className="table-responsive-sm table-responsive-md">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr >
                            <td scope="col">Document No</td>
                            <td scope="col">Document Name</td>
                            <td scope="col">Reg Date</td>
                            <td scope="col">Status</td>
                            <td scope="col">Action</td>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((value:any,index:number)=>{
                                return(
                                    <tr key={index}>
                                        <th scope="row">{value.complainumber}</th>
                                        <td>{value.fullName}</td>
                                        <td>{value.regdate}</td>
                                        <td><button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "30px" }}  >{value.finalstatus}</button></td>
                                       
                                         <td>
                                         <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "30px" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => onViewHandler(value)}>View Details</button>
                                        </td>
                                       
                                    </tr>

                                )
                            })
                        }
                           
                                    

                                
                            
                        



                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Details</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>Document Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  {something.complainumber}
                </span><br />
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>Category:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  {something.category}
                </span><br />
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>Document Type:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  {something.complainttype}
                </span>  <br />
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>Nature of Document:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  {something.nature}
                </span><br />
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>Document Details:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  {something.details}
                </span><br />
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>Final Status:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  {something.finalstatus}
                </span><br />
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>Reg. Date:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  {something.regdate}
                </span><br />
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>Sub Category:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  {something.subcategory}
                </span><br />
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>Department:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  {something.state}
                </span><br />
                <span style={{ whiteSpace: "nowrap" }}>
                  <h6 style={{ display: "inline" }}>
                    <i>File:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                  </h6>
                  <a href={something.file} onClick={handleFileClick} target="_blank" rel="noopener noreferrer">
                    {something.file}
                  </a>
                </span>
                <h6><i>Please select one action</i></h6>
                <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "30px" }} data-bs-dismiss="modal" onClick={onProcess}>Process</button>&nbsp;&nbsp;
                <button type="button" className="btn btn-success btn-sm" style={{ borderRadius: "30px" }} data-bs-dismiss="modal" onClick={onCloss}>Close</button>


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
export default Not_process;