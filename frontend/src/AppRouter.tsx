import { Routes, Route } from 'react-router-dom';
import './App.css';

// components
import CreateNote from './pages/CreateNote';
import AllNotes from './pages/AllNotes';
import EditNote from './pages/EditNote';


function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/create-note" element={<CreateNote />} />
                <Route path="/edit-note/:id" element={<EditNote />} />
                <Route path="/" element={<AllNotes />} />
            </Routes>
        </>

    );
}

export default AppRouter;
