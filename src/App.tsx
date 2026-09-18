
import { Route, Routes } from 'react-router'
import './App.css'
import Header from './Layout/Header'
import Recipes from './Pages/Recipes'
import Footer from './Layout/Footer'
import Recipefavs from './Pages/Recipefavs'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
    <Header/>
    <Routes>
            <Route path='/' element={<Recipes/>}></Route>
                        <Route path='/favories' element={<Recipefavs/>}></Route>
    </Routes>
    <Footer/>
      <ToastContainer
      hideProgressBar={true}
      theme="dark"
      />
    </>
  )
}

export default App
