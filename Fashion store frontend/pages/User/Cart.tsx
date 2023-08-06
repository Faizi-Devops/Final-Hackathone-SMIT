import UserNav from "@/components/UserNav";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = () => {
    const jsonData = localStorage.getItem("productData");
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      setData(parsedData);
      calculateTotal(parsedData); // Calculate total on initial data load
    }
  };

  const calculateTotal = (cartItems: any[]) => {
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    setTotal(totalAmount);
  };

  const onDeleteHandler = (index: number) => {
    const filteredData = data.filter((_, i) => i !== index);
    setData(filteredData);
    toast.success("Deleted Successfully");

    // Update the localStorage with the filtered data
    const jsonData = JSON.stringify(filteredData);
    localStorage.setItem("productData", jsonData);

    // Recalculate total after deleting an item
    calculateTotal(filteredData);
  };
  const onProcessHandler = async () => {
    try {
      setData([]);
      setTotal(0);
      localStorage.removeItem("productData");
      toast.success("All items deleted from the cart");
      const email = localStorage.getItem("email");
      const currentDate = new Date();
  
      // Get the individual components of the date and time
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
  
      // Format the date and time as a string
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
      let a = {
        email: email,
        price: total,
        addres: "110 A block Kashmir Road",
        quantity: data.quantity,
        status: "Not process",
        createdAt: formattedDateTime,
      };
  
      const response = await axios.post("http://localhost:8000/cart/createCart", a);
      setData(response.data);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error occurred:", error);
      toast.error("Error occurred while processing the cart.");
    }
  };
  

  return (
    <div>
      <UserNav />
      <div className="text-center pt-3">
        <h3>Add to Cart Page</h3>
        {data.length === 0 ? "The cart is empty" : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Quantity</th>
                <th scope="col">Amount</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => {
                return (
                  <tr key={index}>
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
                    <td>{value.price}</td>
                    <td>{value.category}</td>
                    <td>{value.quantity}</td>
                    <td>{value.price * value.quantity}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => onDeleteHandler(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {data.length > 0 && (
          <div>
            <h4>Total Amount: {total}</h4>
          </div>
        )}
      </div>
      <div className="text-center">
      <button type="button" className="btn btn-primary" onClick={onProcessHandler}>Process to check out</button>

      </div>
      
    </div>
  );
};

export default Cart;
