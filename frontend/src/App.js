import Create from './components/Create';
import Update from './components/Update'
import Read from './components/Read'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Read />} />
          <Route exact path='/create' element={<Create />} />
          <Route exact path='/update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
