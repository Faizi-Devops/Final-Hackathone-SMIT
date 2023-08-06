import UserNav from "@/components/UserNav";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from 'next/image'
import { toast } from "react-toastify";



const Products = () => {
    const [data, setData] = useState<any[]>([])
    const [kuch,setKuch]=useState<any[]>([])
    const [something, setSomething] = useState<any[]>([])
    const [search, setSearch] = useState<string>("");
    const [originalData, setOriginalData] = useState<A[]>([]);
    const [file,setFile]=useState<string>("")
    const [name,setName]=useState<string>("")
    const [category,setCategory]=useState<string>("")
    const [color,setColor]=useState<string>("")
    const [price,setPrice]=useState()
    const [quantity,setQuantity]=useState(1)
    const [iding,setIding]=useState<string>("")
    useEffect(() => {
        onFetchCategory();
        // const fetchInterval = setInterval(() => {
        //     onFetchCategory();
        // }, 1000);

        // Clean up the interval when the component unmounts
        // return () => clearInterval(fetchInterval);
        // const fetchInterval = setInterval(() => {
        //     onFetchCategory();
        // }, 1000); // 1000 milliseconds = 1 second



    }, [])
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

    
   
    const onFetchCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8000/comp/complaintsgetting");
            setData(response.data);
            
            setOriginalData(response.data);

            // console.log(response.data)

        } catch (error) {
            console.log(error)

        }


    }
    const onViewDetails = (valueing: any) => {
        setSomething(valueing)
        setFile(valueing.file)
        setName(valueing.name)
        setCategory(valueing.category)
        setColor(valueing.color)
        setPrice(valueing.price)
        setIding(valueing._id)
        



    }
    console.log("price", price)

    const onInc = () =>{
        setQuantity(quantity + 1);
        
    }
    const onDec = () =>{
        if(quantity<=1){
            setQuantity(1)
        }
        else{
            setQuantity(quantity -1)

        }
        
    }
    const ondataHandle  = () =>{
        let a = {
            file:file,
            name:name,
            category:category,
            color:color,
            quantity:quantity,
            price:price,
            productId:iding
        }
        // setKuch((prevKuch) => [...prevKuch, a]);
        const jsonData = JSON.stringify([...kuch, a]);
        localStorage.setItem('productData', jsonData);
        toast('Data add to cart Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        


    }
    return (
        <div>
            <UserNav />
            <div className="text-center pt-3">
                <h3>Online Fashion Store</h3>
                <h3 style={{ fontFamily: "times-new-romen" }} className="text-center">Search</h3>
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="" style={{ height: "50px", borderRadius: "30px" }} onChange={alpha} />
                    </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>

                            <th scope="col">Image</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Color</th>
                            <th scope="col">Size</th>
                            <th scope="col">Category</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((value, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <Image

                                                src={`http://localhost:8000/complaints//${value.file}`}
                                                alt="Picture of the author"
                                                width={50}
                                                height={80}



                                            />
                                        </td>
                                        <td>{value.name}</td>
                                        <td>{value.description}</td>
                                        <td>{value.price}</td>
                                        <td>{value.color}</td>
                                        <td>{value.size}</td>
                                        <td>{value.category}</td>
                                        <td>
                                            <button type="button" className="btn btn-primary btn-sm" style={{ borderRadius: "30px" }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => onViewDetails(value)} >View Details</button>
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
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Add to Cart</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">



                                <Image

                                    src={`http://localhost:8000/complaints//${something.file}`}
                                    alt="Picture of the author"
                                    width={50}
                                    height={80}



                                />
                                <br />


                                <span style={{ whiteSpace: "nowrap" }}>
                                    <h6 style={{ display: "inline" }}>
                                        <i>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                                    </h6>
                                    {something.name}
                                </span><br />
                                <span style={{ whiteSpace: "nowrap" }}>
                                    <h6 style={{ display: "inline" }}>
                                        <i>Category:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                                    </h6>
                                    {something.category}
                                </span><br />
                                <span style={{ whiteSpace: "nowrap" }}>
                                    <h6 style={{ display: "inline" }}>
                                        <i>Color:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                                    </h6>
                                    {something.color}
                                </span><br />
                                <span style={{ whiteSpace: "nowrap" }}>
                                    <h6 style={{ display: "inline" }}>
                                        <i>Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                                    </h6>
                                    {something.price}
                                </span><br />
                                <span style={{ whiteSpace: "nowrap" }}>
                                    <h6 style={{ display: "inline" }}>
                                        <i>Quantity:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                                    </h6>
                                    <button type="button" className="btn btn-primary" onClick={onDec}>-</button> {quantity} <button type="button" className="btn btn-danger" onClick={onInc}>+</button>
                                    
                                </span><br />
                              
                                
                              

                                
                                



                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={ondataHandle}>Add</button>

                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    )
}
export default Products;