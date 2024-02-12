import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI'
import { useLocation } from 'react-router-dom'
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from 'react-router-dom'

const UpdatePassword = () => {

    const {loading} = useSelector((state)=>state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [formData, setFormData] = useState({password:"", confirmPassword:""})
    const dispatch = useDispatch()
    const location = useLocation()
    const {password, confirmPassword} = formData;


    function handleOnChange(e){
        setFormData((prev)=>(
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    function handleOnSubmit(e){
        e.preventDefault();
        const token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password, confirmPassword, token))
    }
  return (
    <div>
        {
            loading ? (<></>) : (
                <div>
                <h1>Choose new Password</h1>
                <p>Almost done. Enter your new password and you are all set.</p>

                <form onSubmit={handleOnSubmit}>

                    <label>
                        <p>New Password<sup>*</sup></p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            className='w-full p-6 text-white'
                        />
                    <span onClick={()=> setShowPassword((prev)=> !prev)}>
                        {
                            showPassword ? <AiFillEyeInvisible fontSize={24} />  : <AiFillEye fontSize={24}/>
                        }
                    </span>

                    </label>


                    <label>
                        <p>Confirm New Password<sup>*</sup></p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                            className='w-full p-6 text-white'
                        />
                        <span onClick={()=>  setShowConfirmPassword((prev)=> !prev)}>
                        {
                            showConfirmPassword ? <AiFillEyeInvisible fontSize={24} />  : <AiFillEye fontSize={24}/>
                        }
                    </span>

                    </label>
                    
                    <button type='submit'
                    >
                        Reset Password
                    </button>
                </form>
                <div>
                        <Link to="/login">
                            <p>Back to login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword