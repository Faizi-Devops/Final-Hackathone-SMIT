import AdminNav from "@/components/AdminNav";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"

const See_All_Users = () => {
    const [data,setData]=useState([])
    const [search, setSearch] = useState<string>("");
    const [originalData, setOriginalData] = useState([]);
    const [showing,setShowing]=useState<any>({})
    useEffect(() => {
        getAllUsers();
      }, []);
      
      const getAllUsers = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/getUsers");
          console.log(response.data);
          setData(response.data)
          setOriginalData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      const alpha = (e: any) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        if (searchValue === "") {
            setData(originalData);
        } else {
            const filteredData = originalData.filter((item:any) =>
                item.fullName.includes(searchValue)
            );
            setData(filteredData);
        }
    }
    const onDeleteHandler = async (iding: any) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/deleteUser/${iding}`);
            
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
       

        const deleteState = data.filter((value:any, index) => {
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
            <div>
                <AdminNav />
            </div>
            <div className="row pt-3 mb-3">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <h3 style={{ fontFamily: "times-new-romen" }} className="text-center">Search</h3>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="name@example.com" style={{ height: "50px", borderRadius: "30px" }} onChange={alpha}/>
                    </div>
                </div>
                <div className="col-lg-3"></div>


            </div>
            <div className="table-responsive-sm table-responsive-md">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact no</th>
                            <th scope="col">Reg. Date</th>
                            <th scope="col">Detail</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data?.map((value: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{value.fullName}</td>
                                        <td>{value.email}</td>
                                        <td>{value.contactNumber}</td>
                                        <td>{value.regdate}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "30px" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>onFetchAllData(value)}>Details</button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger btn-sm" style={{ borderRadius: "30px" }} onClick={()=>onDeleteHandler(value._id)}>Delete</button>
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
    )
}
export default See_All_Users;