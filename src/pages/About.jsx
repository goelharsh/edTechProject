import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div className='mt-[100px] text-white'>

        {/* SECTION 1   */}
        <section>
            <div>

                <header>
                    Driving Innovation in Online Education for a 
                    <HighlightText text={"Brighter Future"} />
                    <p>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </header>


                <div className='flex gap-3 mx-auto'>
                    <img src={BannerImage1} alt="firstImag"/>
                    <img src={BannerImage2} alt="firstImag"/>
                    <img src={BannerImage3} alt="firstImag"
                    />
                </div>
            </div>
        </section>


        {/* SECTION 2  */}
        <section>

            <div>
                <Quote/>
            </div>

        </section>


        {/* SECTION 3  */}
        <section>
            <div className='flex flex-col'>
                {/* FOUNDING STORY DIV */}
                <div className='flex'>
                    {/* lEFT  */}
                    <div>
                        <h1>Our Founding Story</h1>

                        <p>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                        <p>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.                        
                        </p>
                    </div>

                    {/* RIGHT  */}
                    <div>

                        <img src={FoundingStory}  />

                    </div>
                </div>


                {/* MISSION AND VISION DIV  */}
                <div className=''>
                    <div className='flex'>
                        <h1>Our Vision</h1>
                        <p>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.   
                        </p>
                    </div>
                    <div>
                        <h1>Our Mission</h1>
                        <p>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                </div>
                <></>
            </div>
        </section>


        {/* SECTION 4  */}
        <StatsComponent/>


        {/* SECTION 5  */}
        <section className='w-11/12 max-w-maxCon-tent flex flex-col mb-[140px]'>
            <LearningGrid/>
            <ContactFormSection/>
        </section>


        <section>
            <div>
                Reviews from other learners
                {/* <ReviewSlider/> */}
            </div>
        </section>

        <Footer/>
    </div>
  )
}

export default About