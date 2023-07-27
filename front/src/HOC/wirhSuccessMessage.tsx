import { useSelector } from 'react-redux';
import SuccessMessage from '../common/messages/SuccessMessage/SuccessMessage';
import { RootState } from '../store/store';
import { clearSuccessMessage } from '../store/reducers/aircraftReducer/aircraftReducer';

const withSuccessMessage = (Component: React.FC) => ({ ...props }) => {
    const aircraftSuccessMessage = useSelector((state: RootState) => state.aircraft.successMessage);
    const NewComponent = () => {
        return (
            <>
                {aircraftSuccessMessage && <SuccessMessage handler={clearSuccessMessage} message={aircraftSuccessMessage} />}
                <Component {...props} />
            </>)

    }
    return <NewComponent />;
}

export default withSuccessMessage;