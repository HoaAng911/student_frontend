import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home"; 
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import StudentPage from './pages/StudentPage'
import StudentDetail from "./components/student/StudentDetail";

function App() {
  return <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/students/:id" element={<StudentDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}

export default App;