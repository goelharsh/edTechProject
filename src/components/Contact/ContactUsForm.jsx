import React, { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { apiConnector } from '../../services/apiconnector'
import CountryCode from "../../data/countrycode.json"
const ContactUsForm = () => {


  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitSuccessful} 
  } = useForm() 


  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstName:"",
        lastName:"",
        message:"",
        phoneNo:""
      })
    }
  },[reset, isSubmitSuccessful, ])


  const submiteContactForm = async(data)=>{
    console.log("Logging Data", data);
    try {
      // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
      const response = {status:"ok"}
      console.log("Logging response", response)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(submiteContactForm)}>

      <div className='flex flex-col gap-14'>
      <div className='flex gap-5'>
        {/* firstName  */} 
        <div className='flex flex-col'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name='firstName'
            id='firstName'
            placeholder='Enter First Name'
            {...register("firstName", {required:true})}
          />
          {
            errors.firstName && (
              <span>
                Please Enter Your Name
              </span>
            )
          }
        </div>

        {/* lastname  */}
        <div className='flex flex-col'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name='lastName'
            id='lastName'
            placeholder='Enter Last Name'
            {...register("lastName", {required:true})}
          />
        </div>

      </div>

        {/* email  */}
        <div className='flex flex-col'>
          <label htmlFor='email'>Email Address</label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter Email Address'
            {...register("email", {require:true})}
          />
          {
            errors.email && (
              <span>
                Please Enter Your Email Address
              </span>
            )
          }
        </div>

        {/* phone no  */}
        <div className='flex flex-col gap-2'>
          <label htmlFor='phonenumber'>Phone Number</label>
          <div className='flex flex-row gap-5'>
              {/* DROPDOWN */}
              <div className='flex w-[]'>
              <select name='dropdown' id='dropdown' className='bg-richblack-700'
              {...register("countrycode", {required:true})}>
                {
                  CountryCode.map((element, index)=>(
                    <option key={index} value={element.code}>
                      {element.code} - {element.country}
                    </option>
                  ))
                }
              </select>
              </div>

              <div>
                <input
                  type='number'
                  name='phonenumber'
                  id='phonenumber'
                  placeholder='12345 67890'
                  className=''
                  {...register("phoneNo", 
                  {
                    required:{value:true,message:"Please Enter Phone no"},
                    maxLength: {value:10, message:"Invalid Phone No"},
                    minLength:{value:10, message:"Invalid Phone No"}
                  },
                  )}
                />
                {
                  errors.phoneNo && (
                    <span>
                      {errors.phoneNo.message}
                    </span>
                  )

                }
              </div>
          </div>
        </div>


        {/* message box  */}
        <div className='flex flex-col'>
          <label htmlFor='message'>Message</label>
          <textarea
            name="message"
            id='message'
            cols="30"
            rows="7"
            placeholder='Enter Your Message here'
            {...register("message", {required:true})}
          />
          {errors.message && (
            <span>
              Please Enter your message
            </span>
          )}
            

        </div>

        {/* submit button  */}
        <button type='message'
              className='rounded-md bg-yellow-50 text-centr px-6 py-4 text-[16px] text-black font-bold'
      >
            Send Message
        </button>
      </div>

    </form>
  )
}

export default ContactUsForm 