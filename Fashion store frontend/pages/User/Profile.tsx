import UserNav from '@/components/UserNav';
import styles from '../../styles/Register_Complaint.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const Profile = () => {
    const [data, setData] = useState<any>({})
    const [contact, setContact] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState("")
    const [states, setStates] = useState<any>([])
    const [state, setState] = useState<string>("")
    const [country, setCountry] = useState<string>("")
    const [pin, setPin] = useState<string>("")
    const [selectedImage, setSelectedImage] = useState<any>(null);


    console.log(contact)
    useEffect(() => {
        getSignInuserData()
        getAllStates()
        const interval = setInterval(() => {
            // getSignInuserData()
            getAllStates()
        }, 3000);
        return () => clearInterval(interval);

    }, [])
    const getAllStates = async () => {
        try {
            const response = await axios.get('http://localhost:8000/new/getStates');


            setStates(response.data.states)



            const data = response.data;
        } catch (error) {
            console.error('Error fetching states:', error);

        }
    }


    const getSignInuserData = async () => {
        try {
            const userEmail = localStorage.getItem('email');
            const response = await axios.get(`http://localhost:8000/api/userData?email=${userEmail}`)


            setData(response.data)

            console.log("User data", response.data)
            setContact(response.data.contactNumber)
            setName(response.data.fullName)


            setAddress(response.data.address)
            setState(response.data.state)
            setCountry(response.data.country)
            setPin(response.data.pincode)

        } catch (error) {

        }


    }
    const onNumberchange = (e: any) => {
        setContact(e.target.value)
        console.log(e.target.value)
    }
    const onNamechange = (e: any) => {
        setName(e.target.value)
        console.log(e.target.value)
    }
    const onAddress = (e: any) => {
        setAddress(e.target.value)
        console.log(e.target.value)
    }
    const onstatechange = (e: any) => {
        setState(e.target.value)
        console.log(e.target.value)


    }
    const onCountryHandler = (e: any) => {
        setCountry(e.target.value)
        console.log(e.target.value)
    }
    const onPinningHandler = (e: any) => {
        setPin(e.target.value)
        console.log(e.target.value)

    }
    const onAddHandler = async () => {
        if (name && contact && address && state && country && pin != "") {
            const currentDate = new Date();

            // Get the components of the date and time
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');

            // Format the date and time string
            const updatedAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

            


            const userEmail: any = localStorage.getItem('email');
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('email', userEmail)
            formData.append('fullName', name)
            formData.append('contactNumber', contact)
            formData.append('address', address)
            formData.append('state', state)
            formData.append('country', country)
            formData.append('pincode', pin)
            formData.append('updatedAt', updatedAt)


            console.log(formData)
            // let adding = {
            //     email: userEmail,
            //     fullName: name,

            //     contactNumber: contact,
            //     address: address,
            //     state: state,
            //     country: country,

            //     pincode: pin



            // }
            try {
                const response = await axios.put("http://localhost:8000/api/updateData", formData)
                console.log(response.data)

                setAddress("")
                setState("")
                setCountry("")
                setPin("")
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

            } catch (error) {
                console.log(error)

            }
        } else {
            toast.success("All fields are required", {
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

    const onPictureHandler = (e: any) => {
        setSelectedImage(e.target.files[0])
        console.log(e.target.files[0])


    }



    return (
        <div>
            <UserNav />
            <h3 className={styles.heading}>{'>'} &nbsp;Profile Info</h3>
            <div className='d-flex justify-content-center pt-4'>
                <div className="card" style={{ width: "97%" }}>

                    <div className="card-body">
                        <p><i className="fa-solid fa-user"></i>&nbsp; {data.fullName}'s Profile</p>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Full Name</p></div>
                                    <div className='col-lg-9'>
                                        <input type="text" className="form-control" value={name} onChange={onNamechange} />
                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>User Email</p></div>
                                    <div className='col-lg-9'>
                                        <input type="email" className="form-control" placeholder={data.email} style={{ backgroundColor: '#EEEEEE' }} readOnly />
                                    </div>

                                </div>
                            </div>

                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Contact</p></div>
                                    <div className='col-lg-9'>
                                        <input type="number" className="form-control" value={contact} onChange={onNumberchange} />
                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>

                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Address</p></div>
                                    <div className='col-lg-9'>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={2} value={address} onChange={onAddress}></textarea>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>State</p></div>
                                    <div className='col-lg-9'>
                                        <select className="form-select" aria-label="Default select example" style={{ height: "36px" }} value={state} onChange={onstatechange}>
                                            <option value="">Open this select menu</option>
                                            {states.map((state: any, index: number) => (
                                                <option key={index} value={state.value}>{state.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>

                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Country</p></div>
                                    <div className='col-lg-9'>
                                        <input type="email" className="form-control" value={country} id="exampleFormControlInput1" placeholder="" onChange={onCountryHandler} />
                                    </div>

                                </div>


                            </div>


                        </div>

                        <hr />
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Pincode</p></div>
                                    <div className='col-lg-9'>
                                        <input type="number" className="form-control" value={pin} onChange={onPinningHandler} />
                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>

                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Reg Date</p></div>
                                    <div className='col-lg-9'>
                                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={data.regdate} style={{ backgroundColor: "#EEEEEE" }} readOnly></input>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Complaint Details <br /> (max 2000 words)</p></div>
                                    <div className='col-lg-9'>
                                        <div className="mb-3">

                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={6}></textarea>
                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className='col-lg-6'>

                            </div>

                        </div> */}
                        <hr />

                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>User Photo</p></div>
                                    <div className='col-lg-9'>
                                        <div className="mb-3">

                                            <input className="form-control form-control-sm" accept="image/*" id="formFileSm" type="file" placeholder='Change Photo' onChange={onPictureHandler} />
                                        </div>

                                    </div>

                                </div>

                            </div>
                            <div className='col-lg-6'>

                                <div className='row'>
                                    <div className='col-lg-3'><p className={styles.two}>Updated Date</p></div>
                                    <div className='col-lg-9'>
                                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder={data.updatedAt} style={{ backgroundColor: "#EEEEEE" }} readOnly></input>
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
export default Profile; 