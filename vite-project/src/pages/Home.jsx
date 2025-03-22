import React from 'react'
import Hero from "../components/Hero"
import HomeCard from "../components/HomeCard"
import JobListings from "../components/JobListings"
import ViewAll from "../components/ViewAll"

const Home = () => {
  return (
    <div>
      <Hero />  
      <HomeCard />
      <JobListings isHome={true}/>
      <ViewAll />
    </div>
  )
}

export default Home