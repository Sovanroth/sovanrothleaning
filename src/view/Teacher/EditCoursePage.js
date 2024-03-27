import React from 'react'
import TeacherNavBar from '../../components/TeacherNavBar'
import EditCourse from '../../components/EditCourse'
import Footer from '../../components/Footer'
import { Helmet } from 'react-helmet'

const EditCoursePage = () => {
  return (
    <div>
      <Helmet>
        <title>
          Suku | Edit Course
        </title>
      </Helmet>
      <TeacherNavBar/>
      <EditCourse/>
      <Footer/>
    </div>
  )
}

export default EditCoursePage