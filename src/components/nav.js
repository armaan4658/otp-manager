import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
export const NavComponent = () => {
    return(
        <div className="nav">
            <Paper elevation={5}>
                <h4><Link to='/hospitalappotp'>Hospital App Otp</Link></h4>
            </Paper>
            <Paper elevation={5}>
                <h4><Link to='/urlappotp'>Url Shortner App Otp</Link></h4>
            </Paper>
            <Paper elevation={5}>
                <h4><Link to='/gdriveappotp'>Google Drive Otp</Link></h4>
            </Paper>
        </div>
    )
}