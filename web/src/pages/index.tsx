import { Button } from '@mui/material'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Button
      color="primary"
      variant="contained" 
      fullWidth 
      type="submit"
    >
        Submit
    </Button>
  )
}

export default Home
