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

function Announcement() {
    return (
        <>
        <Provider store={itemStore}>
            <PageHead title={'最新公告'} />
            <div className="bg_f9fbff">
                <AnnounceComp/>
                <style jsx>{`
                .bg_f9fbff{background-color: #f9fbff;}
                `}</style>
            </div>
        </Provider>
        </>
    );
}

export default Announcement;
