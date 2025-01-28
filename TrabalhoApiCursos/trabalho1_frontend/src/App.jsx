import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import AddCurso from './pages/addCurso/AddCurso';
import UpdateCurso from './pages/updateCurso/UpdateCurso';
import ListCursos from './pages/listCursos/ListCurso';
import ViewCurso from './pages/viewCurso/ViewCurso';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<ListCursos />} />
          <Route path="/add-curso" element={<AddCurso />} />
          <Route path="/edit-curso/:id" element={<UpdateCurso />} />
          <Route path="/view-curso/:id" element={<ViewCurso />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
