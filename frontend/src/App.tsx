import './App.css';
import AppRouter from './AppRouter';
import { BasicMenu } from './components/Menu';

function App() {
    return (

        <div className='App'>
            <header className='App-header'>
                Empower your canvassing!
            </header>
            <main className='Main-content'>
                <BasicMenu></BasicMenu>
                <AppRouter></AppRouter>
            </main>

        </div>
    );
}

export default App;
