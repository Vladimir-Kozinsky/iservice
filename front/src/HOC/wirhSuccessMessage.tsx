import { useDispatch, useSelector } from 'react-redux';
import SuccessMessage from '../common/messages/SuccessMessage/SuccessMessage';
import { RootState } from '../store/store';
import { clearSuccessMessage } from '../store/reducers/aircraftReducer/aircraftReducer';
import { clearLegSuccessMessage } from '../store/reducers/legReducer/legReducer';

const withSuccessMessage = (Component: React.FC) => ({ ...props }) => {
    const aircraftSuccessMessage = useSelector((state: RootState) => state.aircraft.successMessage);
    const legSuccessMessage = useSelector((state: RootState) => state.leg.successMessage);

    const NewComponent = () => {
        return (
            <>
                {aircraftSuccessMessage && <SuccessMessage handler={clearSuccessMessage} message={aircraftSuccessMessage} />}
                {legSuccessMessage && <SuccessMessage handler={clearLegSuccessMessage} message={legSuccessMessage} />}
                <Component {...props} />
            </>)

    }
    return <NewComponent />;
}

export default withSuccessMessage;