import React from 'react'
import { useSelector } from 'react-redux'
import {FaCheck} from "react-icons/fa"
import CourseInformationForm from './CourseInformation/CourseInformationForm'
const RenderSteps = () => {

    const steps = [
        {
            id:1,
            title:"Course Informaion"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        },
    ]


    const {step} = useSelector((state)=> state.course);

  return (
    <>
        <div>
            {
                steps.map((item)=>(
                    <>
                       <div>
                            <div className={`${step === item.id ? "bg-yellow-50 border-yellow-50 text-yellow-50"  : "border-richblack-700 bg-richblack-800 text-richblack-300" }`}>
                            {
                                step> item.id  ? (<FaCheck/>) : (item.id)
                            }
                            </div>
                       </div>
                        {/* TODO: ADD CODE FOR DASHES  */}
                       {/* {
                        item.id!== steps?.length 
                       } */}

                    </>
                ))
            }
        </div>
        <div>
            {
                steps.map((item)=>(
                    <>
                        <div>
                            <p>{item.title}</p>
                        </div>
                    </>
                ))
            }
        </div>

        { step === 1 && <CourseInformationForm/> }
        {/* { step === 2 && <CourseBuilderForm/> } */}
        {/* { step === 3 && <PublishCourse/> } */}
    </>
  )
}

export default RenderSteps