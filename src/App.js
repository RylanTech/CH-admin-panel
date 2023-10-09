import { BrowserRouter, Route, Routes } from "react-router-dom"
import Homepage from './pages/Homepage';
import Userspage from "./pages/Users";
import Eventspage from "./pages/Events";
import Churchespage from "./pages/Churches";
import EditChurch from "./pages/EditChurch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/users" element={<Userspage/>}/>
        <Route path="/events" element={<Eventspage/>}/>
        <Route path="/churches" element={<Churchespage/>}/>
        <Route path="/church/:id" element={<EditChurch/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
