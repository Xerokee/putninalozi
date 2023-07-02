import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

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
              <Link className="nav-link" to={"/"}>Početna</Link>
              <Link className="nav-link" to={"/dodaj"}>Dodaj</Link>
              <Link className="nav-link" to={"/zaposlenici"}>Zaposlenici</Link>
              <Link className="nav-link" to={"/dodajzaposlenika"}>Dodaj Zaposlenika</Link>
            </div>
          </div>
        </nav>
            </div>
            )
}