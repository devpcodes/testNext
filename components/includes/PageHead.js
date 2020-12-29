import Head from 'next/head';
import PropTypes from 'prop-types';

export const PageHead = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
        </Head>
    );
};

PageHead.propTypes = {
    title: PropTypes.string.isRequired,
};
