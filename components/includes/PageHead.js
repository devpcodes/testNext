import Head from 'next/head';
import PropTypes from 'prop-types';

export const PageHead = ({ title }) => {
    return (
        <Head>
            <title>{title}</title>
            <link rel="icon" href={`${process.env.NEXT_PUBLIC_SUBPATH}favicon.ico`} />
        </Head>
    );
};

PageHead.propTypes = {
    title: PropTypes.string.isRequired,
};
