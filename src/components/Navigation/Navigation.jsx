import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavigationJSX(){
        return(
            <div className='mm'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-center align-content-center">
          <a className="navbar-brand" href="#">VUV putni nalozi</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-link" href="http://localhost:5173/">Home</a>
              <a className="nav-link" href="./dodaj">Dodaj</a>
              <a className="nav-link" href="./zaposelnici">Zaposelnici</a>
            </div>
          </div>
        </nav>
            </div>
            )
}