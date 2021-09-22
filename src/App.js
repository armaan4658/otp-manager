import './App.css';
import {Switch, Route} from 'react-router-dom';
import {NavComponent} from './components/nav.js';
import {Link} from 'react-router-dom';
import {HospitalOtp} from './components/hopitalOtp.js';
import {UrlOtp} from './components/urlOtp.js';
import {GdriveOtp} from './components/gdriveOtp';
function App() {
  return (
    <div className="App">
      <div style={{
        background:'maroon',
        height:'12vh',
        display:'grid',
        alignItems:'center'
        }}>
        <h1 className="logo"><Link to='/'>Otp manager</Link></h1>
      </div>
        <Switch>
            <Route exact path='/'>
              <NavComponent/>
            </Route>
            <Route path='/hospitalappotp'>
              <HospitalOtp/>
            </Route>
            <Route path='/urlappotp'>
              <UrlOtp/>
            </Route>
            <Route path='/gdriveappotp'>
              <GdriveOtp/>
            </Route>
        </Switch>
    </div>
  );
}

export default App;
