import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PutniNalogTable from './components/PutniNalogTable/PutniNalogTable'
import DodajPutniNalog from './components/DodajPutniNalog/DodajPutniNalog'
import PregledPutniNalog from './components/PregledPutniNalog/PregledPutniNalog'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<PutniNalogTable/>}/>
      <Route path='/dodaj' element={<DodajPutniNalog/>}/>
      <Route path='/nalog/:id' element={<PregledPutniNalog/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
