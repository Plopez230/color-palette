import './App.css';
import Pallette from './Pallette/Pallette';

function Navbar()
{
  return (
    <header>
      <nav class="navbar navbar-expand-lg bg-white">
        <div class="container-fluid mt-1">
          <div>
            <a class="github-button" href="https://github.com/plopez230" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" aria-label="Follow @plopez230 on GitHub">Follow @plopez230</a>
            &nbsp;&nbsp;
            <a class="github-button" href="https://github.com/plopez230/color-pallette" data-color-scheme="no-preference: light; light: light; dark: dark;" data-size="large" aria-label="Star plopez230/color-pallette on GitHub">Star</a>
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
