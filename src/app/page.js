'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gifImage from '../../public/rick_astley.gif'

function App() {
  const boxRef = useRef(null)
  const [intersectionPercentage, setIntersectionPercentage] = useState(0)

  const inFullView = intersectionPercentage === 100

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      // To achieve a resolution of 1%
      // we create an array [0,0.01,0.02...1.0]
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    }

    // IntersectionCallback is a function that gets called by the Intersection Observer
    // for each target element when its intersection with the viewport changes.
    const interSectionCallback = (entries) => {
      console.log(entries)
      entries.forEach((entry) => {
        console.log(entry)
        // Calculate the percentage of the target element that is currently visible
        // in the viewport.
        const percentage = Math.floor(entry.intersectionRatio * 100)
        // Update the component's state with the calculated percentage.
        setIntersectionPercentage(percentage)
      })
    }

    const observer = new IntersectionObserver(interSectionCallback, options)

    // Check if the box-element exists in the DOM
    if (boxRef.current) {
      observer.observe(boxRef.current)
    }

    // Clean up the observer when the component unmounts
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className='App'
      style={{
        height: '150vh',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontSize: '4rem', margin: '4rem' }}>Scroll Down</h1>
      <div
        className='box'
        ref={boxRef}
        style={{
          width: '320px',
          height: '240px',
          backgroundColor: inFullView ? 'blue' : 'orange',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'start',
          fontSize: '24px',
          margin: '0 0 50px 0',
        }}
      >
        <span>{intersectionPercentage}% Visible</span>
      </div>
    </div>
  )
}

export default App
