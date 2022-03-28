import React from 'react';
import FinancialProductArticleComponent from '../../components/includes/financialProduct/FinancialProductArticle/page/FinancialProductArticleComponent';
import { getAnnouncement } from '../../services/components/financialProduct/financialProductServices';
import { getTradingAppDetail } from '../../services/components/tradingPlatform/tradingPlatformService';

export const getServerSideProps = async context => {
    const serverProducts = await getTradingAppDetail(context.params.code);
    const serverTabsArray = [];
    if (serverProducts?.tabs?.length) {
        serverProducts.tabs.forEach((i, index) => {
            serverTabsArray.push({ categoryName: i.tabName, id: index, articleContent: JSON.parse(i.content) });
        });
    }
    const announcementServerRes = await getAnnouncement(serverProducts?.keywords, 3);
    return {
        props: { serverProducts, serverTabsArray, announcementServerRes },
    };
};
const TradingPlatformArticle = ({ serverProducts, serverTabsArray, announcementServerRes }) => {
    return (
        <>
            <FinancialProductArticleComponent
                isTradingPlatform={true}
                serverProducts={serverProducts}
                serverTabsArray={serverTabsArray}
                announcementServerRes={announcementServerRes}
            />
        </>
    );
};

export default TradingPlatformArticle;
