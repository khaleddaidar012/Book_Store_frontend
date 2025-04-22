import React, { useState ,useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom'
import axios from 'axios'


const ShowBook = () => {
  const {id} = useParams();
  const [book,setBook]  = useState({})
  const [loading,setloading]  = useState(false);
  useEffect(() =>{
    setloading(true);
    axios.put(`http://localhost:5555/books/${id}`).then((res) => {
      setBook(res.data.data);
      setloading(false)
    })
  }, [])
  return ( 

    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'> Show Book</h1>
      {loading ? < Spinner /> :(<div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
        <div className='my-4'>
          {console.log(book._id)}
          <span className='text-xl mr-4 text-gray-500'>Id</span>
          <span>{book._id}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Tittle</span>
          <span>{book.title}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>author</span>
          <span>{book.author}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
          <span>{book.publishYear}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Create Time</span>
          <span>{new Date(book.createdAt).toString()}</span>
        </div>
        <div className='my-4'>
          <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
          <span>{new Date(book.updatedAt).toString()}</span>
        </div>
      </div>) }

    </div>

  )
}

export default ShowBook