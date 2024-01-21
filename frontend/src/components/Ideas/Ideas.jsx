import React from 'react'
import data from '../../utils/data'
import IdeaCard from '../IdeaCard/IdeaCard'
import './Ideas.css'
const Ideas = () => {
  return (
    <div className='notes-container'>
    {
        data.map((note)=>(
            <IdeaCard note={note}/>
        ))
    }
    </div>
  )
}

export default Ideas