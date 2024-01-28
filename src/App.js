import './App.css';
import LoginPage from "./pages/login";
import Cuisines from "./pages/cuisines";
import Signup from "./pages/signup";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/cuisines" element={<Cuisines/>}/>
                <Route path="/signup" element={<Signup/>}/>
            </Routes>
        </div>
    );
}

export default App;
