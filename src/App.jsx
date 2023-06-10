import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PutniNalogTable from './components/PutniNalogTable/PutniNalogTable'
import DodajPutniNalog from './components/DodajPutniNalog/DodajPutniNalog'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<PutniNalogTable/>}/>
      <Route path='/dodaj' element={<DodajPutniNalog/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
