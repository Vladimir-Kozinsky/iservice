import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { clearErrorMessage } from '../store/reducers/aircraftReducer/aircraftReducer';
import ErrorMess from '../common/messages/ErrorMess/ErrorMess';
import { clearLegErrorMessage } from '../store/reducers/legReducer/legReducer';
import { clearStoreErrorMessage } from '../store/reducers/storeReducer/storeReducer';
import { clearRequestErrorMessage } from '../store/reducers/requestReducer/requestReducer';

const withErrorMessage = (Component: React.FC) => ({ ...props }) => {
    const aircraftErrorMessage = useSelector((state: RootState) => state.aircraft.errorMessage);
    const legErrorMessage = useSelector((state: RootState) => state.leg.errorMessage);
    const storeErrorMessage = useSelector((state: RootState) => state.store.errorMessage);
    const requestErrorMessage = useSelector((state: RootState) => state.request.errorMessage);
    const NewComponent = () => {
        return (
            <>
                {aircraftErrorMessage && <ErrorMess handler={clearErrorMessage} message={aircraftErrorMessage} />}
                {legErrorMessage && <ErrorMess handler={clearLegErrorMessage} message={legErrorMessage} />}
                {storeErrorMessage && <ErrorMess handler={clearStoreErrorMessage} message={storeErrorMessage} />}
                {requestErrorMessage && <ErrorMess handler={clearRequestErrorMessage} message={requestErrorMessage} />}
                <Component {...props} />
            </>)
    }
    return <NewComponent />;
}

export default withErrorMessage;