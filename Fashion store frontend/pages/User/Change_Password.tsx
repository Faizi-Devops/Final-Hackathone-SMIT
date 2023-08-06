import UserNav from '@/components/UserNav';
import styles from '../../styles/Change_Password.module.css';
import { useState } from 'react';
import { toast } from "react-toastify"
import axios from 'axios';
const Change_Password = () => {
    const [current,setCurrent] = useState<string>("");
    const [newing,setNewing]=useState<string>("")
    const [confirm,setConfirm]=useState<string>("")
    const [statusing,setStatusing]=useState()
    const alpha = (e:any) =>{
        setCurrent(e.target.value)

    }
    const beta = (e:any) =>{
        setNewing(e.target.value)


    }
    const gema = (e:any) =>{
        setConfirm(e.target.value)

    }
    const onSubmitHandler = async() =>{
        try {
            
        
        if(current && newing && confirm !=""){
            if(newing===confirm){
                const data = localStorage.getItem('email');
                let adding = {
                    email:data,
                    password:current,
                    newPassword:newing
                }

                const response =await axios.put("http://localhost:8000/sub/Changing",adding);
                console.log("response",response.status)
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
                    setConfirm("");
                    setNewing("");
                    setCurrent("")

            }
            else{
                toast('password and confirm password is not match', {
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

        }
        else{
            toast('Please fill all the fields', {
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
    } catch (error) {
        console.log(error)
            
    }
    }
    return (
        <div>
            <UserNav />
            <h3 className={styles.heading }>{'>'} &nbsp;Change Password</h3>
            <div className='d-flex justify-content-center pt-3'>
                <div className="card" style={{width: "97%"}}>
                    
                        <div className="card-body ">
                        <h5 className={styles.heading2}>{'>'} &nbsp;Change Password</h5>
                        <div className='row'>
                            <div className='col-lg-2'> <p className={styles.two}>Current password</p></div>
                            <div className='col-lg-10'><input type="password" className="form-control" id="exampleFormControlInput1" value={current} onChange={alpha} /></div>

                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-lg-2'> <p className={styles.two}>New Password</p></div>
                            <div className='col-lg-10'><input type="password" className="form-control" id="exampleFormControlInput1" value={newing} onChange={beta}/></div>

                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-lg-2'> <p className={styles.two}>Confirm Password</p></div>
                            <div className='col-lg-10'><input type="password" className="form-control" id="exampleFormControlInput1" value={confirm} onChange={gema}/></div>

                        </div>
                        <div className='text-center pt-3'>
                        <button type="button" className="btn btn-primary" onClick={onSubmitHandler}>Submit</button>

                        </div>
                            
                        </div>
                </div>

            </div>

        </div>
    )
}
export default Change_Password;