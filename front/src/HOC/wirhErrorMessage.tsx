import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { clearErrorMessage } from '../store/reducers/aircraftReducer/aircraftReducer';
import ErrorMess from '../common/messages/ErrorMess/ErrorMess';

const withErrorMessage = (Component: React.FC) => ({ ...props }) => {
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
    const NewComponent = () => {
        return (
            <>
                {aircraftErrorMessage && <ErrorMess handler={clearErrorMessage} message={aircraftErrorMessage} />}
                <Component {...props} />
            </>)

    }
    return <NewComponent />;
}

export default withErrorMessage;