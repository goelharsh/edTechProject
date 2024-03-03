import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';

const EnrolledCourses = () => {


    const {token} = useSelector((state)=>state.auth);

    const [enrolledCoures, setEnrolledCoures] = useState(null);


    const getEnrolledCourses = async()=>{
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCoures(response);
            console.log("Courses are fetchd",response);
            
        } catch (error) {
            console.log("Unable to fetch enrolled courses");
        }
    }
    useEffect(()=>{
        getEnrolledCourses();
    },[]);


  return (
    <div>
        <h1>Enrolled Courses</h1>
        {
            !enrolledCoures ? (<div>Loading...</div>)
            : !enrolledCoures.length ? (<p>You have not enrolled in any course yet</p>) 
            : (
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>
                    {
                        enrolledCoures.map((course,index)=>(
                            <div>
                                <div>
                                    <img src={course.thumbnail} />
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course?.totalDuration}
                                </div>

                                <div>
                                    <p>Progress: {course.progressPercentage || 0}%</p>
                                    <ProgressBar
                                        completed={course.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }

    </div>
  )
}

export default EnrolledCourses