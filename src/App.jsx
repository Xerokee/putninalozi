import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PutniNalogTable from './components/PutniNalogTable/PutniNalogTable'
import DodajPutniNalog from './components/DodajPutniNalog/DodajPutniNalog'
import PregledPutniNalog from './components/PregledPutniNalog/PregledPutniNalog'
import DodajZaposlenika from './components/DodajZaposlenika/DodajZaposlenika'
import { ZaposleniciTable } from './components/ZaposleniciTable/ZaposleniciTable'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<PutniNalogTable/>}/>
      <Route path='/dodaj' element={<DodajPutniNalog/>}/>
      <Route path='/zaposlenici' element={<ZaposleniciTable/>}/>
      <Route path='/dodajzaposlenika' element={<DodajZaposlenika/>}/>
      <Route path='/nalog/:id' element={<PregledPutniNalog/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
