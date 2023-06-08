import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from './components/Todo/Todo';
import SignUp from './components/SignUp/SignUp';
import Error from './components/Error/Error';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/error' element={<Error />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
