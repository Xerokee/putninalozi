import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import vuv_logo from '../Navigation/vuv_logo.png';

export default function NavigationJSX(){
        return(
            <div className='mm'>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-center align-content-center">
                <a className="navbar-brand" href="#">
                  <img src={vuv_logo} alt="VUV putni nalozi" width="50" height="30" /> VUV putni nalozi
                </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link className="nav-link" to={"/"} style={{ fontSize: 17 }}>Početna</Link>
              <Link className="nav-link" to={"/dodaj"} style={{ fontSize: 17 }} >Dodaj Nalog</Link>
              <Link className="nav-link" to={"/zaposlenici"} style={{ fontSize: 17 }}>Zaposlenici</Link>
              <Link className="nav-link" to={"/dodajzaposlenika"} style={{ fontSize: 17 }}>Dodaj Zaposlenika</Link>
            </div>  
          </div>
        </nav>
            </div>
            )
}