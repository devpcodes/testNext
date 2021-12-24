import React from 'react';
import { wrapper } from '../../../store/store';
import { setNavItems } from '../../../store/components/layouts/action';
import QuestionListComponent from '../../../components/includes/customerSupport/questionList/page/QuestionListComponent';

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});

const Question = function () {
    return (
        <div>
            <QuestionListComponent />
        </div>
    );
};

export default Question;
