import type { NextPage } from 'next'
import FridgeBar from '../components/FridgeBar'
import NavBar from '../components/NavBar'

const Home: NextPage = () => {
  return (
    <>
      <FridgeBar />
      <NavBar />
    </>
  )
}

export default Home
