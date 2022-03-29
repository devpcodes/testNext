import React from 'react';
import { wrapper } from '../../../store/store';
import { setNavItems } from '../../../store/components/layouts/action';
import QuestionListComponent from '../../../components/includes/customerSupport/questionList/page/QuestionListComponent';
import {
    getCommonQuestionCategories,
    getCommonQuestions,
} from '../../../services/components/customerSupport/customerSupportService';

export const getStaticProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
    const categories = await getCommonQuestionCategories();
    const params = {
        page: 1,
        pageSize: 15,
        categoryId: categories[0].id,
    };
    const questionList = await getCommonQuestions(params);
    return {
        props: { categories, questionList },
    };
});

const Question = function ({ categories, questionList }) {
    return (
        <div>
            <QuestionListComponent resCategories={categories} resQuestionList={questionList} />
        </div>
    );
};

export default Question;
