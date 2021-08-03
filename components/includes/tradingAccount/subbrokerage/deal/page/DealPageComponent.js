import ControlBar from '../element/ControlBar';
import DealTable from '../element/DealTable';

const DealPageComponent = () => {
    const reFreshHandler = () => {};
    return (
        <>
            <ControlBar reFreshHandler={reFreshHandler} />
            <DealTable />
        </>
    );
};

export default DealPageComponent;
