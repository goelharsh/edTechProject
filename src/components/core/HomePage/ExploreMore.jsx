import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore'
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'


const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]



const ExploreMore = () => {

    const [currentTab, setCurrenttab] = useState(tabName[0])
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCard = (value)=>{
        setCurrenttab(value)
        const result = HomePageExplore.filter((course)=> course.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }

  return (
    <div>

        <div className='text-4xl font-semibold text-center'>
            Unlock the
            <HighlightText
                text={" Power of Code"}
            />
        </div>

        <p className='text-center text-richblack-300 text-[16px] font-semibold mt-3'>Learn to build anything you can imagine</p>

        <div className='mt-5 flex flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100 px-1 py-1'>
            {
                tabName.map((element, index)=>(
                    <div className={`text-[16px] flex flex-row items-center gap-2  rounded-full transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 
                    ${currentTab === element 
                    ? "bg-richblack-900 text-richblack-5" 
                    : "text-richblack-200 "
                    }
                    `}  
                    key={index}
                    onClick={() => setMyCard(element)} 
                    >
                        {element}
                    </div>
                ))
            }


        </div> 

        <div className='lg:h-[150px]'></div>

        {/* course cards  */}
        <div className='absolute flex flex-row gap-10 justify-between w-full'>
            {
                courses.map((element,index)=>(
                    <CourseCard key={index}
                        cardData={element}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}
                    />
                ))
            }
        </div>



    </div>
  )
}

export default ExploreMore