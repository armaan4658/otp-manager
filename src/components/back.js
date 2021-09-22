import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from 'react-router';
export const Back = () => {
    const history = useHistory();
    return(
        <div>
            <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon/>}
            onClick={()=>history.goBack()}
            >Back</Button>
        </div>
    )
}