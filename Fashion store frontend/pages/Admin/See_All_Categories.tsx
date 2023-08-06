import AdminNav from "@/components/AdminNav";
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import axios from "axios";
import Image from 'next/image'
type A = {
    name: string,
    description: string,
    dating: string,
    updated?: string,
    _id?: string
}
const See_All_Categories = () => {

    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState<string>("");
    const [originalData, setOriginalData] = useState<A[]>([]);
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [flag, setFlag] = useState<boolean>(false)
    const [iding, setIding] = useState<string>("")
    const [dating, setDating] = useState<string>("")
    const alpha = (e: any) => {
        const searchValue = e.target.value;
        setSearch(searchValue);
        if (searchValue === "") {
            setData(originalData);
        } else {
            const filteredData = originalData.filter((item) =>
                item.name.includes(searchValue)
            );
            setData(filteredData);
        }
    }

    useEffect(() => {
        onFetchState()

    }, [])
    const onFetchState = async () => {
        try {
            const response = await axios.get("http://localhost:8000/comp/complaintsgetting");
            setData(response.data);
            setOriginalData(response.data);
            console.log("dsfdsfds", response);

        } catch (error) {
            console.log(error)

        }


    }
    const onDeletehandler = async (iding: any) => {
        try {
            const response = await axios.delete(`http://localhost:8000/comp/deleteProduct/${iding}`);
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

        const deleteState = data.filter((value, index) => {
            if (iding !== value._id) {
                return value

            }

        })
        setData([...deleteState])

    }
    const beta = (e: any) => {
        setName(e.target.value)

    }
    const gema = (e: any) => {
        setDescription(e.target.value)
    }

    const onEditHandler = (valueing: any) => {
        alert(valueing._id)
        setFlag(true)
        setIding(valueing._id)
        setName(valueing.name)
        setDescription(valueing.description)

        setDating(valueing.dating)




    }
    const onUpdateHandler = async () => {

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
            const response = await axios.put(`http://localhost:8000/cat/updateCategory/${iding}`, update)
            toast.info(response.data.message, {
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
                        <input type="email" className="form-control" placeholder="" style={{ height: "50px", borderRadius: "30px" }} onChange={alpha} />
                    </div>
                </div>
                <div className="col-lg-3"></div>


            </div>
            {
                data.length === 0 ? <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Hii Admin! </strong>There are no categories for showing.

                </div> :
                    <div>
                        <marquee style={{ color: "red" }}>Please search the record with category name</marquee>
                        <div className="table-responsive-sm table-responsive-md">
                            <table className="table table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Image</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Creation date</th>
                                        <th scope="col">Last Updated</th>
                                        <th scope="col">Edit</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((value: A, index: number) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>
                                                        <Image

                                                            src={`http://localhost:8000/complaints//${value.file}`}
                                                            alt="Picture of the author"
                                                            width={100}
                                                            height={80}

                                                        />
                                                    </td>
                                                    <td>{value.name}</td>
                                                    <td>{value.price}</td>
                                                    <td>{value.createdAt}</td>
                                                    <td>{value.updatedAt}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "30px" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => onEditHandler(value)}>Edit</button>
                                                    </td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger btn-sm" style={{ borderRadius: "30px" }} onClick={() => onDeletehandler(value._id)}>Delete</button>
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
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Category Update</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1" className="pb-2">Category Name</label>

                                                <input type="text" className="form-control" id="exampleInputEmail1" value={name} aria-describedby="emailHelp" placeholder="Enter Name" onChange={beta} />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="description" className="pb-2 pt-2">Description</label>
                                                <input type="text" className="form-control" id="description" value={description} aria-describedby="emailHelp" placeholder="Enter email" onChange={gema} />

                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onUpdateHandler}>Submit</button>

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
export default See_All_Categories;