import React from 'react'
import data from '../../utils/data'
import NoteCard from '../NoteCard/NoteCard'
import './Notes.css'
const Notes = () => {
  return (
    <div className='notes-container'>
    {
        data.map((note)=>(
            <NoteCard note={note}/>
        ))
    }
    </div>
  )
}

export default Notes