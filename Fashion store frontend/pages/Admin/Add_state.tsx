import AdminNav from "@/components/AdminNav";
import Sidenavbar from "@/components/Sidenavbar";
import styles from '../../styles/Add_state.module.css';
import Link from 'next/link'
import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import axios from 'axios';
type A = {
    name: string,
    description: string,
    dating: string,
    updated?: string,
    _id?: string

}
const Add_state = () => {
    const [data, setData] = useState<A[]>([])
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [flag, setFlag] = useState<boolean>(false)
    const [iding, setIding] = useState<string>("")
    const [dating, setDating] = useState<string>("")
    // const [dating,setDating]=useState<string>("");
    // const [updated,setUpdated]=useState<string>("");
    useEffect(() => {
        onFetchState()
        const fetchInterval = setInterval(() => {
            onFetchState()
          }, 1000); // 1000 milliseconds = 1 second
      
          return () => {
            clearInterval(fetchInterval); // Clean up the interval when the component unmounts
          };

    }, [])
    const onFetchState = async () => {
        try {
            const response = await axios.get("http://localhost:8000/new/getStates");
            setData(response.data.states)

        } catch (error) {
            console.log(error)

        }


    }

    const alpha = (e: any) => {
        setName(e.target.value)
    }
    const beta = (e: any) => {
        setDescription(e.target.value)
    }
    const onAddState = async () => {
        // alert("hello")
        //         const datetime = '2023-03-19 10:31:04';

        //   const formattedDateTime = new Date(datetime).toLocaleString();
        const currentDate = new Date().toLocaleString();
        if (name && description !== "") {
            let addState: A = {
                name: name,
                description: description,
                dating: currentDate,
                updated: ""

            }
            try {
                const response = await axios.post("http://localhost:8000/new/addState", addState);
                const toaster = response.data.message
                toast.success("Deparment Added Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });


            } catch (error) {
                console.error(error);

            }

            setData([...data, addState])
            setName("")
            setDescription("")


        }
        else {
            toast.info('All fields are required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }




    }
    console.log(data)
    const onDeleteHandler = async (iding: any) => {
        try {
            const response = await axios.delete(`http://localhost:8000/new/deleteState/${iding}`);
            toast("Department deleted successfully", {
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

        const deleteState = data.filter((value, index) => {
            if (iding !== value._id) {
                return value

            }

        })
        setData([...deleteState])

    }
    const onEditHandler = (valueing: any) => {

        setFlag(true)
        setIding(valueing._id)
        setName(valueing.name)
        setDescription(valueing.description)

        setDating(valueing.dating)




    }
    const onUpdateHandler = async () => {

        try {
            
        
        if (name && description !== "") {
            setFlag(false)
            const currentDate = new Date().toLocaleString();
            let update = {
                name: name,
                description: description,
                updated: currentDate,
                dating: dating

            }
            let finishing = data.map((value: any, index) => {
                if (iding === value._id) {
                    return update
                }
                else {
                    return value
                }

            })
            const response = await axios.put(`http://localhost:8000/new/updateState/${iding}`, update)
            toast.info("Department updated successfull", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
            setData(finishing)
            setName("")
            setDescription("")

        }
        else {
            toast.info('All fields are required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })

        }
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
                                    <h6 className="card-title text-center">Add Department</h6>
                                    <div className="row pt-3">
                                        <div className={`col-lg-3 ${styles.currentpassword}`}><p style={{ fontSize: "15px", marginBottom: "0px" }}>Department Name</p></div>
                                        <div className="col-lg-7" style={{ marginBottom: "0px" }}>
                                            <div>
                                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter Department Name" style={{ height: "33px" }} value={name} onChange={alpha} required />
                                            </div>
                                        </div>
                                        <div style={{ width: "94%", margin: "auto", color: "#777777" }}>
                                            <hr />

                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className={`col-lg-3 ${styles.currentpasswording}`}><p style={{ fontSize: "15px", marginBottom: "0px" }}>Description</p></div>
                                        <div className="col-lg-7">
                                            <div className="form-outline">
                                                <textarea className="form-control" id="textAreaExample1" rows={5.5} onChange={beta} required value={description}></textarea>

                                            </div>
                                        </div>
                                        <div style={{ width: "94%", margin: "auto" }}>
                                            <hr />

                                        </div>


                                    </div>



                                    <div className="row ">
                                        <div className={`col-lg-3`}></div>
                                        <div className="col-lg-7">
                                            {
                                                flag ? <div>
                                                    <button type="button" className="btn btn-success" style={{ borderRadius: "30px" }} onClick={onUpdateHandler}>Update</button>

                                                </div> :

                                                    <div>
                                                        <button type="button" className="btn btn-primary" style={{ borderRadius: "30px" }} onClick={onAddState}>Create</button>

                                                    </div>
                                            }
                                        </div>



                                    </div>



                                </div>

                            </div>



                            <div className="card mt-4" style={{ width: "100%" }}  >


                                <div className="card-body">
                                    <h6 className="card-title text-center">Manage Depatments</h6>

                                   
                                    {
                                       data.length === 0 ?<div className="alert alert-warning alert-dismissible fade show" role="alert">
                                       <strong>Hii Admin! </strong>There are no departments for showing.
                                      
                                     </div>:
                                     <div>
                                         <marquee style={{color:"red"}}>Here show's only first  5 record.if you want complete please click on see all button </marquee>
                                    <div className="table-responsive ">


                                        <table className="table table-striped ">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Department</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Creation date</th>
                                                    <th scope="col">Last Updated</th>
                                                    <th scope="col">Edit</th>
                                                    <th scope="col">Delete</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data?.slice(0, 5)?.map((value: A, index: number) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">{index + 1}</th>
                                                                <td>{value.name}</td>
                                                                <td>{value.description} </td>

                                                                <td>{value.dating}</td>
                                                                <td>{value.updated}</td>

                                                                <td>
                                                                    <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "30px" }} onClick={() => onEditHandler(value)}>Edit</button>
                                                                </td>
                                                                <td>
                                                                    <button type="button" className="btn btn-danger btn-sm" style={{ borderRadius: "30px" }} onClick={() => onDeleteHandler(value._id)}>Delete</button>
                                                                </td>
                                                            </tr>
                                                        )


                                                    })
                                                }




                                            </tbody>
                                        </table>
                                    </div>
                                    </div>
                                    }
                                    <div className="text-center pt-2">
                                        <button type="button" style={{ borderRadius: "20px" }} className="btn btn-primary"><Link href="/Admin/See_All_States" style={{ textDecoration: "none" }}> <span style={{ color: "white" }}>See All</span></Link></button>
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
export default Add_state;