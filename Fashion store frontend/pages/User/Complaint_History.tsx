import UserNav from "@/components/UserNav";
import styles from '../../styles/Complaint_History.module.css';
import { useEffect, useState } from "react";
import axios from "axios";

const Complaint_History = () => {
  const [data, setData] = useState<any>([])
  const [something, setSomething] = useState<any>({})

  useEffect(() => {
    const intervalId = setInterval(getData, 1000);
    getData()

    return () => {
      clearInterval(intervalId);
    };
    
    
  }, [])
  const getData = async () => {
    const userEmail = localStorage.getItem('email');
    const nextresponse = await axios.get(`http://localhost:8000/comp/complainemail?email=${userEmail}`)
    setData(nextresponse.data);
  }
  console.log(data)
  const onViewHandler = (value: any) => {
    setSomething(value)
  }
  console.log("something", something)
  const handleFileClick = () =>{
    const fileURL = `http://localhost:8000/complaints/${something.file}`;
    window.open(fileURL);
  }
  return (
    <div>
      <UserNav />
      <h3 className={styles.heading}>Your Document History</h3>
      {
                                       data.length === 0 ?<div className="alert alert-warning alert-dismissible fade show" role="alert">
                                       <strong>{data.fullName} </strong>There are no document detail for showing.
                                      
                                     </div>:
                                     <div>
                                         <marquee style={{color:"red"}}>Here show's only the document data </marquee>
      <div className="table-responsive-sm table-responsive-md">

        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <td scope="col">Document Number</td>
              <td scope="col">Reg Date</td>
              <td scope="col">Last Updation date</td>
              <td scope="col">Status</td>
              <td scope="col">Action</td>

            </tr>
          </thead>
          <tbody>
            {
              data.map((value: any, index: number) => {
                return (
                  <tr>
                    <th scope="row">{value.complainumber}</th>
                    <td>{value.regdate}</td>
                    <td>{value.updated}</td>
                    <td><button type="button" className="btn btn-danger btn-sm rounded-pill">{value.finalstatus}</button></td>
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
  )
}
export default Complaint_History;