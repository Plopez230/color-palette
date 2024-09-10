import './App.css';
import Pallette from './Pallette/Pallette';

function Navbar()
{
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid mt-1">
          <div>
            <a className="github-button" href="https://github.com/plopez230" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" aria-label="Follow @plopez230 on GitHub">Follow @plopez230</a>
            &nbsp;&nbsp;
            <a className="github-button" href="https://github.com/plopez230/color-pallette" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" aria-label="Star plopez230/color-pallette on GitHub">Star</a>
          </div>
        </div>
      </nav>
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="col m-4">
          <div className="row px-4">
            <Pallette />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
