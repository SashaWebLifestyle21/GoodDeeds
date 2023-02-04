import Register from "@/components/containers/Register";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useState} from "react";
import Login from "@/components/containers/Login";


export default function Home() {
    const [isDisplayLog, setIsDisplayLog] = useState(false)
  return (
    <>
        <div className='container mt-[50px]'>
            {isDisplayLog ? <Register handleRegister={setIsDisplayLog} /> : <Login handleLogin={setIsDisplayLog} />}
            <ToastContainer position='bottom-right'/>
        </div>
    </>
  )
}
