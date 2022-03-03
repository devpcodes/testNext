import React from 'react';
// import { wrapper } from '../../store/store';
// import { setNavItems } from '../../store/components/layouts/action';
import QuestionArticleComponent from '../../../components/includes/customerSupport/questionArticle/page/QuestionArticleComponent';

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//     await store.dispatch(setNavItems());
// });

const QuestionArticle = () => {
    return (
        <>
            <QuestionArticleComponent />
        </>
    );
};

export default QuestionArticle;
