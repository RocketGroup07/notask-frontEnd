import React from 'react'
import Header from "../components/Header";
import '../styles/global.css';
import Hero from "../components/Hero";
import SectionBen from "../components/SectionBen";
import SectionJunte from '../components/SectionJunte';
function Home() {
  return (
    <div>
        <Header></Header>
        <Hero></Hero>
        <SectionBen></SectionBen>
        <SectionJunte></SectionJunte>
      </div>
  )
}

export default Home