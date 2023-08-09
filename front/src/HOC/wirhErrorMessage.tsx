import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { clearErrorMessage } from '../store/reducers/aircraftReducer/aircraftReducer';
import ErrorMess from '../common/messages/ErrorMess/ErrorMess';
import { clearLegErrorMessage } from '../store/reducers/legReducer/legReducer';

const withErrorMessage = (Component: React.FC) => ({ ...props }) => {
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
    const legErrorMessage = useSelector((state: RootState) => state.leg.errorMessage);
    const NewComponent = () => {
        return (
            <>
                {aircraftErrorMessage && <ErrorMess handler={clearErrorMessage} message={aircraftErrorMessage} />}
                {legErrorMessage && <ErrorMess handler={clearLegErrorMessage} message={legErrorMessage} />}
                <Component {...props} />
            </>)

    }
    return <NewComponent />;
}

export default withErrorMessage;