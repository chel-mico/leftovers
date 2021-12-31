import type { NextPage } from 'next'
import Fridge from '../components/Fridge'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <>
      <Fridge />
      <NavBar />
    </>
  )
}

export default Home
