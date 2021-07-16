import { useReducer, createContext } from 'react';
import { wrapper } from '../store/store';
import { setNavItems } from '../store/components/layouts/action';
import { PageHead } from '../components/includes/PageHead';
import AnnounceComp from '../components/includes/announcement/announce_main/AnnounceComp';
import { Provider } from "react-redux";
import { itemStore } from '../store/announcement/store';
// export const ReducerContext = createContext();
// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//     await store.dispatch(setNavItems());
// });

function Annoucement() {
    return (
        <>
        <Provider store={itemStore}>
            <PageHead title={'最新公告'} />
            <div>
                <AnnounceComp/>
            </div>
        </Provider>
        </>
    );
}

export default Annoucement;
