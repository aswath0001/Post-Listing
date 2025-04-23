import React from 'react'
import HomePage from './pages/HomePage/HomePage'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import DetailsPage from './pages/DetailsPage/DetailsPage'


const App = () => {
    return (
        <>
        <BrowserRouter>
        <Routes>
           <Route path='/'element={<HomePage/>}/>
           <Route path = '/posts/:id' element={<DetailsPage/>}/>
        </Routes>
         </BrowserRouter>
        </>
    )
}
export default App

