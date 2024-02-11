import React from 'react'
import HighlightText from './HighlightText'
import Image1 from "../../../assets/Images/Know_your_progress.png"
import Image2 from "../../../assets/Images/Compare_with_others.png"
import Image3 from "../../../assets/Images/Know_your_progress.png"
import CTAButton from "../HomePage/Button"


const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
      
        <div className='flex flex-col gap-5 items-center'>

          <p className='text-4xl font-semibold text-center'>
            Your swiss knife for 
            <HighlightText 
              text={" learning any language"}
            />
          </p>

          <p className='mx-auto text-center text-richblack-600 text-base font-medium w-[70%]'>
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
          </p>

          <div className='flex flex-row items-center mt-5'>
            <img src={Image1} alt='firstImage' className='object-contain -mr-32'/>
            <img src={Image2} alt='secondImage' className='object-contain'/>
            <img src={Image3} alt='firstImage' className='object-contain -ml-36'/>
          </div>

          <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
              Learn More
            </CTAButton>
          </div>
        </div>

    </div>
  )
}

export default LearningLanguageSection