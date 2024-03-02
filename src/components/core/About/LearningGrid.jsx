import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from "../../core/HomePage/Button"
const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ];

const LearningGrid = () => {
  return (
    <div className='grid mx-aut grid-cols-1 lg:grid-cols-4 mb-10'>
        {
            LearningGridArray.map((card,index)=>(
                <div
                className={
                            `
                            ${index === 0 && "lg:col-span-2 lg:h-[250px]"}
                            ${
                                card.order % 2 ===1 ? " bg-richblack-600 lg:h-[250px]" 
                                :" bg-richblack-800" 
                            }
                            ${
                                card.order === 3 && "lg:col-start-2"
                            }
                            `
                          }
                key={index}
                >
                    {
                        card.order < 0 
                        ? (<div className='lg-w-[90%] flex flex-col pb-5 gap-3'>
                            <div className='text-4xl font-semibold '>
                                {card.heading}
                                <HighlightText text={card.highlightText} />
                            </div>
                            <p className='font-medium '>
                                {card.description}
                            </p>
                            <div className='w-fit'>
                                <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                            </div>
                        </div>)
                        : (<div>
                            <h1>{card.heading}</h1>
                            <p>{card.description}</p>
                        </div>)
                    }
                </div>
            ))
        }
    </div>
  )
}

export default LearningGrid