import UserNav from '@/components/UserNav';
import styles from '../../styles/Register_Complaint.module.css';
import { useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
const Register_Complaint = () => {
    const [states, setStates] = useState<any>([])
    const [cat, setCat] = useState<any>([])
    const [sub, setSub] = useState<any>([])
    const [category, setCategory] = useState<string>("")
    const [subcategory, setSubcategory] = useState<string>("")
    const [complainttype, setComplainttype] = useState<string>("")
    const [state, setState] = useState<string>("")
    const [nature, setNature] = useState<string>("")
    const [details, setDetails] = useState<string>("")
    const [file, setFile] = useState<any>(null)
    const [counting,setCounting]=useState<any>()
    const [show,setShow]=useState<any[]>([])
    const [subcategories, setSubcategories] = useState<any[]>([]);
    const router = useRouter()
    useEffect(() => {
        getAllStates()

    }, [])
    const getAllStates = async () => {
        try {
            const userEmail = localStorage.getItem('email');
            const response = await axios.get('http://localhost:8000/new/getStates');
            const category = await axios.get("http://localhost:8000/cat/getCategories")
            const SUBcategory = await axios.get("http://localhost:8000/sub/getSub");
            setSub(SUBcategory.data.states)
            console.log(response.data)
            setStates(response.data.states)
            setCat(category.data.states)
             const nextresponse = await axios.get(`http://localhost:8000/comp/complainemail?email=${userEmail}`)
             setCounting(nextresponse.data[0]?.notprocess || 0);
            


            const data = response.data;
        } catch (error) {
            console.error('Error fetching states:', error);

        }
    }
    console.log(counting)
    
    const one = async(e: any) => {
        try {
            
        
        console.log("dsgd",e.target.value)
        setCategory(e.target.value)
        setShow(e.target.value)
        let alfa = e.target.value;
        // const SUBcategory = await axios.get("http://localhost:8000/sub/showing",{
        //     params: {
        //         category: alfa, // Use "alfa" as the query parameter name
        //       },);
        // console.log(SUBcategory.data.state)
        const response = await axios.get(`http://localhost:8000/sub/showing`, {
            params: {
              category: alfa, // Use "alfa" as the query parameter name
            },
          });
          const subcategoriesData = response.data.message;
      setSubcategories(subcategoriesData);

        }catch (error) {
            console.log(error)
            
      }

    }
    
    
    const two = (e: any) => {
        console.log(e.target.value)
        setSubcategory(e.target.value)


    }
    const three = (e: any) => {
        console.log(e.target.value);
        setComplainttype(e.target.value)

    }
    const four = (e: any) => {
        console.log(e.target.value)
        setState(e.target.value)

    }

    const five = (e: any) => {
        setNature(e.target.value)
        console.log(e.target.value)

    }
    const six = (e: any) => {
        setDetails(e.target.value)
        console.log(e.target.value)
    }
    const seven = (e: any) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])

    }
    const onAddHandler = async() => {
        const email=localStorage.getItem('email')
        const fullName = localStorage.getItem("fullName")
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
        const timestamp = Date.now().toString(); // Get the current timestamp as a string
        const randomSuffix = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Generate a random number between 0 and 9999, and pad it with leading zeros if necessary

        const uniqueNumber = timestamp.slice(-5) + randomSuffix;
        if (category && subcategory && complainttype && state && nature && details != "") {

            const formData:any = new FormData();
            formData.append('email', email);
            formData.append('file', file);
            formData.append('category', category);
            formData.append('subcategory', subcategory);
            formData.append('complainttype', complainttype);
            formData.append('state', state);
            formData.append('nature', nature);
            formData.append('details', details);
            formData.append('regdate', formattedDateTime);
            formData.append('finalstatus', "Not Process yet");
            formData.append('complainumber', uniqueNumber);
            formData.append('notprocess', 0);
            formData.append('process', 0);
            formData.append('closed', 0);
            formData.append('updated', "");
            formData.append('fullName',fullName)

            const count = {
                email:email,

            }
          
          
            // let adding = {
               
               
               
               
             
                
            //     process: 0,
            //     closed: 0,
            //     updated: ""
            // }

           
            const response: any =await  axios.post("http://localhost:8000/comp//createComplain", formData);
            const updatedCount = Number(counting) + 1;
            setCounting(updatedCount);
            
            let updated= {
                email:email,
                notprocess:updatedCount
            }
            const newresponse: any = await axios.put("http://localhost:8000/comp/counting", updated);
            const nopro:any= await axios.post('http://localhost:8000/nop/createNoprocess',formData)
           
            
            console.log(response.data)
            toast.error('Document Successfully Created', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            
            router.push('/User/Complaint_History')

            


        }
        else {
            toast.error('All fields are required', {
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
    }
    return (
        <div>
            <UserNav />
            <h3 className={styles.heading}>{'>'} &nbsp;Register Document</h3>
            <div className='d-flex justify-content-center pt-4'>
                <div className="card" style={{ width: "97%" }}>

                    <div className="card-body">
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Cateogory</p></div>
                                    <div className='col-lg-9'>
                                        <select className="form-select" aria-label="Default select example" style={{ height: "36px" }} onChange={one}>
                                            <option value="">Select</option>
                                            {cat.map((state: any, index: number) => (
                                                <option key={index} value={state.value}>{state.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Sub Cateogory</p></div>
                                    <div className='col-lg-9'>
                                        <select className="form-select" aria-label="Default select example" style={{ height: "36px" }} onChange={two}>
                                            <option value="">Select</option>
                                            {subcategories.map((state: any, index: number) => (
                                                <option key={index} value={state.value}>{state.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Document Type</p></div>
                                    <div className='col-lg-9'>
                                        <select className="form-select" aria-label="Default select example" style={{ height: "36px" }} onChange={three}>
                                            <option value="">Select</option>
                                            <option value="Complaint">Complaint</option>
                                            <option value="General Query">General Query</option>

                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>

                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Department</p></div>
                                    <div className='col-lg-9'>
                                        <select className="form-select" aria-label="Default select example" style={{ height: "36px" }} onChange={four}>
                                            <option value="">Select</option>

                                            {states.map((state: any, index: number) => (
                                                <option key={index} value={state.value}>{state.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Nature of Document</p></div>
                                    <div className='col-lg-9'>
                                        <div className="mb-3">

                                            <input type="email" className="form-control" placeholder="Document ...." value={nature} onChange={five} />
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>

                            </div>

                        </div>
                        <hr />

                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Document Details <br /> (max 2000 words)</p></div>
                                    <div className='col-lg-9'>
                                        <div className="mb-3">

                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows={6} onChange={six}></textarea>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>

                            </div>

                        </div>
                        <hr />

                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Document Related Doc(if any) <br /></p></div>
                                    <div className='col-lg-9'>
                                        <div className="mb-3">

                                            <input className="form-control form-control-sm" id="formFileSm" type="file" accept=".pdf,.doc, .docx,image/jpeg,image/png,image/gif" onChange={seven} />
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>

                            </div>

                        </div>
                        <hr style={{ margin: "inherit" }} />
                        <div className='text-center pt-3'>
                            <button type="button" className="btn btn-primary" onClick={onAddHandler}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default Register_Complaint; 