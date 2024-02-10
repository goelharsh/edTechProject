import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from  "react-icons/fa"
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'

import Footer from '../components/common/Footer'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
const Home = () => {
  return (
    <div>


        {/* SECTION 1  */}
        <div className='relative mx-auto w-11/12 max-w-maxContent flex flex-col items-center text-white justify-between'>

            <Link to={"/signup"} >
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>

                    <div className='flex flex-row  items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>

                </div>
            </Link>


            <div className='text-center text-4xl  font-semibold mt-7'>
                Empower your Future with 
                <HighlightText text={" Coding Skills"}/>
            </div>

            <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300 '>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            <div className='flex gap-7 mt-8 '>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn more
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>


            <div className='shadow-blue-200  mx-3 my-12'>
                <video autoPlay muted loop>
                    <source src={Banner} type='video/mp4'/>
                </video>
            </div>


            {/* CODE SECTION 1 */}
            <div >
                <CodeBlocks 
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold '>
                            Unlock your
                            <HighlightText text={" coding potential "}/>
                            with our online courses
                        </div>
                    }
                    subHeading={
                        <div>
                            Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                        </div>
                    }
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                />
            </div>
            {/* CODE SECTION 2  */}
            <div >
                <CodeBlocks 
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='text-4xl font-semibold '>
                            Unlock your
                            <HighlightText text={" coding potential "}/>
                            with our online courses
                        </div>
                    }
                    subHeading={
                        <div>
                            Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                        </div>
                    }
                    ctabtn1={
                        {
                            btnText:"Try it yourself",
                            linkto:"/signup",
                            active:true
                        }
                    }
                    ctabtn2={
                        {
                            btnText:"Learn More",
                            linkto:"/login",
                            active:false
                        }
                    }

                    codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
                    codeColor={"text-yellow-25"}
                />
            </div>
        </div>


        {/* SECTION 2  */}
        <div className='bg-pure-greys-5 text-richblack-700'>
            <div className='homepage_bg h-[310px]'>
                <div className='w-11/12 max-w-maxContent flex items-center flex-col gap-5 mx-auto justify-between'>
                <div className='h-[150px]'></div>
                    <div className='flex flex-row gap-7 text-white'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                    Learn More
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                </div>
            </div>

            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between'>
                <div className='flex flex-row gap-5 mb-10 mt-[95px]'>

                    <div className='text-4xl font-semibold w-[45%]'>
                    Get the skills you need for a 
                    <HighlightText text={" job that is in demand."}/>
                    </div>


                    <div className='w-[40%] flex flex-col gap-10 items-start'>
                    <div className='text-richblack-700  text-[16px]'>The modern StudyGhost is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    </div>
                </div>

                <TimelineSection/>
            <LearningLanguageSection/>
            </div>

           
        </div>

        {/* SECTION 3  */}

        {/* FOOTER  */}
        <Footer/>

    </div>
  )
}

export default Home