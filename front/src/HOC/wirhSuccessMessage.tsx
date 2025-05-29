import { useDispatch, useSelector } from 'react-redux';
import SuccessMessage from '../common/messages/SuccessMessage/SuccessMessage';
import { RootState } from '../store/store';
import { clearSuccessMessage } from '../store/reducers/aircraftReducer/aircraftReducer';
import { clearLegSuccessMessage } from '../store/reducers/legReducer/legReducer';
import { clearEngineSuccessMessage } from '../store/reducers/engineReducer/engineReducer';
import { clearApuSuccessMessage } from '../store/reducers/apuReducer/apuReducer';
import { clearStoreSuccessMessage } from '../store/reducers/storeReducer/storeReducer';
import { clearToolSuccessMessage } from '../store/reducers/toolReducer/toolReducer';
import { clearRequestSuccessMessage } from '../store/reducers/requestReducer/requestReducer';

const withSuccessMessage = (Component: React.FC<any>) => ({ ...props }) => {
    const aircraftSuccessMessage = useSelector((state: RootState) => state.aircraft.successMessage);
    const legSuccessMessage = useSelector((state: RootState) => state.leg.successMessage);
    const engineSuccessMessage = useSelector((state: RootState) => state.engine.successMessage);
    const apuSuccessMessage = useSelector((state: RootState) => state.apu.successMessage);
    const storeSuccessMessage = useSelector((state: RootState) => state.store.successMessage);
    const toolSuccessMessage = useSelector((state: RootState) => state.tool.successMessage);
    const requestSuccessMessage = useSelector((state: RootState) => state.request.successMessage);

    const NewComponent = () => {
        return (
            <>
                {aircraftSuccessMessage && <SuccessMessage handler={clearSuccessMessage} message={aircraftSuccessMessage} />}
                {legSuccessMessage && <SuccessMessage handler={clearLegSuccessMessage} message={legSuccessMessage} />}
                {engineSuccessMessage && <SuccessMessage handler={clearEngineSuccessMessage} message={engineSuccessMessage} />}
                {apuSuccessMessage && <SuccessMessage handler={clearApuSuccessMessage} message={apuSuccessMessage} />}
                {storeSuccessMessage && <SuccessMessage handler={clearStoreSuccessMessage} message={storeSuccessMessage} />}
                {toolSuccessMessage && <SuccessMessage handler={clearToolSuccessMessage} message={toolSuccessMessage} />}
                {requestSuccessMessage && <SuccessMessage handler={clearRequestSuccessMessage} message={requestSuccessMessage} />}
                <Component {...props} />
            </>)

    }
    return <NewComponent />;
}

export default withSuccessMessage;