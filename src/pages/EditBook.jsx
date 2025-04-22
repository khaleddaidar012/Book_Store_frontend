import React, { useState , useEffect } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate , useParams } from 'react-router-dom'
import {  useSnackbar } from 'notistack'



const EditBook = () => {

  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishYear,setpublishYear] = useState('');
  const [loading,setloading] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();
  const {enqueueSnackbar} = useSnackbar();
  
  useEffect(() => {
    setloading(true);
    axios.get(`http://localhost:5555/books/edit/${id}`).then((res) => {
      setAuthor(res.data.author);
      setpublishYear(res.data.publishYear);
      setTitle(res.data.title);
      setloading(false);
      enqueueSnackbar('Book Edited successfully', { variant: 'success' });
    }).catch((err) => {
      console.log(err)
      setloading(false);

    })
  },[])

  const handleEditBook =() =>{
    const data ={
      title,
      author,
      publishYear
                }
      setloading(true);
      navigate('/')
      axios.put(`http://localhost:5555/books/${id}` , data).then(() => {
        setloading(false);
        navigate('/');
      }).catch((err) => {
        setloading(false);
        alert("an Error happend Place Check the console")
        console.log(err)
      })
  };
  return (
    
    <div>  
      <BackButton /> 
      <h1 className='text-3xl my-4 text-center'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto' >
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'> publishYear</label>
          <input type="text" value={publishYear} onChange={(e) => setpublishYear(e.target.value)} className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8 ' onClick={handleEditBook}>Save</button>
      </div>
      
</div>
  )
}

export default EditBook