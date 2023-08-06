import AdminNav from "@/components/AdminNav";
import Sidenavbar from "@/components/Sidenavbar";
import styles from '../../styles/Add_category.module.css';
import Link from 'next/link'
import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import Image from 'next/image'
import axios from "axios";
type A = {
    name: string,
    description: string,
    dating: string,
    updated?: string,
    _id?: string

}
const Add_category = () => {

    const [data, setData] = useState<any[]>([])
    const [search, setSearch] = useState<string>("");
    const [originalData, setOriginalData] = useState<A[]>([]);
    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [flag, setFlag] = useState<boolean>(false)
    const [iding, setIding] = useState<string>("")
    const [dating, setDating] = useState<string>("")
    const [pricing, setPricing] = useState<number>(0)
    const [description, setDescription] = useState<string>("")
    const [sizing, setSizing] = useState<string>("")
    const [stocking, setStockinig] = useState<number>(0)
    const [coloring, setColoring] = useState<string>("")
    const [file, setFile] = useState<string>("")
    useEffect(() => {
        onFetchCategory()
        // const fetchInterval = setInterval(() => {
        //     onFetchCategory();
        // }, 1000); // 1000 milliseconds = 1 second

        

    }, [])

    const onFetchCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8000/comp/complaintsgetting");
            setData(response.data);
            setOriginalData(response.data);
            console.log(response.data)

        } catch (error) {
            console.log(error)

        }


    }

    const alpha = (e: any) => {
        setName(e.target.value)
    }
    const onAddCategory = async () => {
        try {


            const currentDate = new Date();

            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
            const year = currentDate.getFullYear();

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            const formattedDateTime = `${month}/${day}/${year}, ${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;

            console.log(formattedDateTime);


            const formData: any = new FormData();
            formData.append('name', name);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('price', pricing);
            formData.append('color', coloring);
            formData.append('size', sizing);
            formData.append('stock', stocking);
            formData.append('createdAt', formattedDateTime);
            formData.append('file', file);







            formData.append('updatedAt', "");
            toast.success('Product Successfully Created', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setName("")
            setCategory("")
            setColoring("")
            setDescription("")
            setPricing("")
            setSizing("")
            setStockinig("")



            const response = await axios.post("http://localhost:8000/comp/createComplain", formData);


        } catch (error) {
            console.log(error)

        }

        // alert("hello")
        //         const datetime = '2023-03-19 10:31:04';

        //   const formattedDateTime = new Date(datetime).toLocaleString();
        // const currentDate = new Date().toLocaleString();
        // if (name && description !== "") {
        //     let addCategory: A = {
        //         name: name,
        //         description: description,
        //         dating: currentDate,
        //         updated: ""

        //     }
        //     try {
        //         const response = await axios.post("http://localhost:8000/cat/addCategory", addCategory);
        //         const toaster = response.data.message
        //         toast.success(toaster, {
        //             position: "top-right",
        //             autoClose: 5000,
        //             hideProgressBar: false,
        //             closeOnClick: true,
        //             pauseOnHover: true,
        //             draggable: true,
        //             progress: undefined,
        //             theme: "colored",
        //         });


        //     } catch (error) {
        //         console.error(error);

        //     }

        //     setData([...data, addCategory])
        //     setName("")
        //     setDescription("")


        // }
        // else {
        //     toast.info('All fields are required', {
        //         position: "top-right",
        //         autoClose: 5000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //         theme: "colored",
        //     })
        // }




    }
    const onDeleteHandler = async (iding: any) => {
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

    const onEditHandler = (valueing: any) => {

        setFlag(true)
        setIding(valueing._id)
        setName(valueing.name)
        setDescription(valueing.description)
        setCategory(valueing.category)
        setPricing(valueing.price)
        setSizing(valueing.size)
        setStockinig(valueing.stock)
        setColoring(valueing.color)
        

        setDating(valueing.dating)




    }
    const onUpdateHandler = async () => {
        try {
            const currentDate = new Date();

            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
            const year = currentDate.getFullYear();

            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            const formattedDateTime = `${month}/${day}/${year}, ${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;

            console.log(formattedDateTime);


            const formData: any = new FormData();
            formData.append('name', name);
            formData.append('category', category);
            formData.append('description', description);
            formData.append('price', pricing);
            formData.append('color', coloring);
            formData.append('size', sizing);
            formData.append('stock', stocking);
            formData.append('createdAt', formattedDateTime);
            formData.append('file', file);
            formData.append('updatedAt',formattedDateTime)



            
                setFlag(false)
                
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
                const response = await axios.put(`http://localhost:8000/comp/UpdateProduct/${iding}`, formData)
                toast.info("Updated Successfully", {
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
            

            
         catch (error) {
            console.log(error)

        }
    }
    const nonon = (e: any) => {
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
    const beta = (e: any) => {
        setCategory(e.target.value)


    }
    const gema = (e: any) => {
        setPricing(e.target.value)


    }
    const peta = (e: any) => {
        setDescription(e.target.value)
    }
    const tera = (e: any) => {
        setSizing(e.target.value)

    }
    const bba = (e: any) => {
        setStockinig(e.target.value)

    }
    const cs = (e: any) => {
        setColoring(e.target.value)

    }
    const seven = (e: any) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])

    }

    console.log("data", data)

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
                                    <h6 className="card-title text-center">Add Product</h6>
                                    {/* <div className="row pt-3">
                                        <div className={`col-lg-3 ${styles.currentpassword}`}><p style={{ fontSize: "15px", marginBottom: "0px" }}>Category Name</p></div>
                                        <div className="col-lg-7" style={{ marginBottom: "0px" }}>
                                            <div>
                                                <input type="text" value={name} className="form-control" placeholder="Enter category Name" onChange={alpha} style={{ height: "33px" }} />
                                            </div>
                                        </div>
                                        <div style={{ width: "94%", margin: "auto", color: "#777777" }}>
                                            <hr />

                                        </div>


                                    </div> */}
                                    {/* <div className="row">
                                        <div className={`col-lg-3 ${styles.currentpasswording}`}><p style={{ fontSize: "15px", marginBottom: "0px" }} >Description</p></div>
                                        <div className="col-lg-7">
                                            <div className="form-outline">
                                                <textarea className="form-control" id="textAreaExample1" rows={5.5} value={description} onChange={beta}></textarea>

                                            </div>
                                        </div>
                                        <div style={{ width: "94%", margin: "auto" }}>
                                            <hr />

                                        </div>


                                    </div> */}
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Product Name</label>
                                        <input type="email" className="form-control" id="username" value={name} placeholder="Please enter your name" onChange={alpha} />
                                    </div>
                                    <label className="form-label">Category</label>
                                    <select className="form-select" aria-label="Default select example" value={category} onChange={beta}>
                                        <option selected>Open this select menu</option>
                                        <option value="Cloth">Cloth</option>
                                        <option value="Shoes">Shoes</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label pt-3">Price</label>
                                        <input type="number" className="form-control" id="username" value={pricing} placeholder="Please enter your name" onChange={gema} />
                                    </div>
                                    <div className="form-outline">
                                        <label className="form-label" htmlFor="textAreaExample">Description</label>
                                        <textarea className="form-control" id="textAreaExample1" value={description} rows="4" onChange={peta}></textarea>

                                    </div>
                                    <label className="form-label">Size</label>
                                    <select className="form-select" aria-label="Default select example" value={sizing} onChange={tera}>
                                        <option selected>Open this select menu</option>
                                        <option value="Small">Small</option>
                                        <option value="Large">Large</option>
                                        <option value="Extra Large">Extra Large</option>
                                    </select>
                                    <div className="mb-3">
                                        <label htmlFor="stock" className="form-label pt-3">Stock</label>
                                        <input type="number" className="form-control" id="stock" value={stocking} placeholder="Please enter stock" onChange={bba} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="color" className="form-label pt-3">Color</label>
                                        <input type="text" className="form-control" id="color" value={coloring} placeholder="Please write color" onChange={cs} />
                                    </div>
                                    <div className="mb-3">

                                        <input className="form-control form-control-sm" id="formFileSm" type="file" accept="image/jpeg,image/png,image/gif" onChange={seven} />
                                    </div>


                                    <div className="row ">
                                        <div className={`col-lg-5`}></div>
                                        <div className="col-lg-7">
                                            {
                                                flag ? <div>
                                                    <button type="button" className="btn btn-success" style={{ borderRadius: "30px" }} onClick={onUpdateHandler}>Update</button>

                                                </div> :

                                                    <div>
                                                        <button type="button" className="btn btn-primary " style={{ borderRadius: "30px" }} onClick={onAddCategory}>Add Product</button>

                                                    </div>
                                            }
                                        </div>



                                    </div>



                                </div>

                            </div>



                            <div className="card mt-4" style={{ width: "100%" }}  >


                                <div className="card-body">
                                    <h6 className="card-title text-center">Manage Products</h6>
                                    <div className="col-lg-12">
                                                    <h3 style={{ fontFamily: "times-new-romen" }} className="text-center">Search</h3>
                                                    <div className="mb-3">
                                                        <input type="email" className="form-control" placeholder="Please search with name" style={{ height: "40px", borderRadius: "30px" }}  onChange={nonon} />
                                                    </div>
                                                </div>
                                    {
                                        data.length === 0 ? <div className="alert alert-warning alert-dismissible fade show" role="alert">
                                            <strong>Hii Admin! </strong>There are no products for showing.

                                        </div> :
                                            <div>
                                                
                                                <div className="table-responsive ">
                                                    


                                                    <table className="table table-striped ">
                                                        <thead className="table-dark">
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">Image</th>
                                                                <th scope="col">Name</th>
                                                                <th scope="col">Price</th>
                                                                <th scope="col">Last Updated</th>
                                                                <th scope="col">Edit</th>
                                                                <th scope="col">Delete</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                data.map((value: A, index: number) => {
                                                                    return (
                                                                        <tr key={index}>
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
                                    {/* <div className="text-center pt-2">
                                        <button type="button" style={{ borderRadius: "20px" }} className="btn btn-primary"><Link href="/Admin/See_All_Categories" style={{ textDecoration: "none" }}> <span style={{ color: "white" }}>See All</span></Link></button>
                                    </div> */}








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
export default Add_category;