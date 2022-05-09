import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css' 
import Home from './home.jsx'
import Profile from './profile' 
import Login from './login'

export default function Socialmedia() {
  return (
    // <div className='w-full h-screen bg-purple-600'>Socialmedia</div> 
    <Login/>
  )
}
