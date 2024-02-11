import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButtton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='mt-16'>


        <div className='flex flex-row gap-20 items-center'>

            {/* left div  */}
            <div className='w-[50%]'>
                <img src={Instructor} alt='instructorImage' 
                className='shadow-white'
                />
                
            </div>

            {/* right div  */}
            <div className='w-[50%] flex flex-col gap-10'>

                <div className='text-4xl font-semibold w-[50%]'>
                    Become an
                    <HighlightText text={" Instructor"} />
                </div>

                <p className='font-medium text-[16px] w-[90%] text-richblack-300'>
                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>

                <div className='w-fit'>
                    <CTAButtton active={true} linkto={"/signup"}>
                        <div className='flex flex-row gap-2'>
                            Start Learning Today
                            <FaArrowRight/>
                        </div>
                    </CTAButtton>
                </div>

            </div>

        </div>


    </div>
  )
}

export default InstructorSection