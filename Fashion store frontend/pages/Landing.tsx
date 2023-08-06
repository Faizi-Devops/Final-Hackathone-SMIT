import Navbar from "@/components/Navbar";
import Slide from "@/components/Slide";
import Image from 'next/image'
import styles from '../styles/Landing.module.css';
import Link from 'next/link';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";



const Landing = () => {
  const [data, setData] = useState<any[]>([])
  const router = useRouter();

  useEffect(() => {
    onFetchCategory();
    const fetchInterval = setInterval(() => {
      onFetchCategory();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(fetchInterval);
    // const fetchInterval = setInterval(() => {
    //     onFetchCategory();
    // }, 1000); // 1000 milliseconds = 1 second



  }, [])

  const onFetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/comp/complaintsgetting");
      setData(response.data);

      console.log(response.data)

    } catch (error) {
      console.log(error)

    }


  }

  console.log(data)
  const onAddHandler = () =>{

    const storedEmail = localStorage.getItem("email");
    if(!storedEmail){
      router.push("/User"); 

    }
  }
  return (
    <div>
      <Navbar />
      <div className={styles.imagecontainer}>


        <Image className={styles.responsiveImage}
          src="/store.png"
          alt="Example Image"
          width={400}
          height={400}

        />


      </div>
      <div className="container-fluid">
        <p style={{ fontSize: "30px" }} className="pt-3 text-center">Online Fashion Store</p>

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
              data.map((value,index)=>{
                return(
                  <tr>
              <th scope="row">{index+1}</th>
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
              <button type="button" className="btn btn-primary" onClick={onAddHandler}>Add to Cart</button>
              </td>
            </tr>

                )

              })
            }
            
           
          </tbody>
        </table>

        {/* <div className="row">
          {
            data.map((value, index) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="card" style={{ width: "18rem" }}>
                    <Image

                      src={`http://localhost:8000/complaints//${value.file}`}
                      alt="Picture of the author"
                      width={285}
                      height={300}



                    />

                    <div className="card-body">
                      <h5 className="card-title">{value.name}</h5>
                      <p className="card-text"></p>
                      <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
                </div>

              )
            })
          }

          <div className="col-lg-4 ol-lg-4 col-md-6 col-sm-12"></div>
          <div className="col-lg-4 ol-lg-4 col-md-6 col-sm-12"></div>

        </div> */}
      </div>
      <div className="container">
        <hr />
      </div>
      <p className="text-center">Copyright © <Link href="https://github.com/Faizi-Devops" style={{ textDecoration: "none" }}>Faizan Ali</Link> | Online Fashion Store 2023</p>




    </div>
  )
}
export default Landing;

