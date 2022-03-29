import React from 'react';
import moment from 'moment';
import ForthSection from './ForthSection';
import preview from '../../../../resources/images/pages/homepage/forth_section/preview.png';

const forthSectionData = {
    title: '投資路上的不敗法則',
    subtitle: '永豐投顧的選股寶典，投資路上的神隊友',
    cardsData: [
        {
            title: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
            image: `${preview}`,
            time: '2021.10.31',
            writer: '寰球經濟',
        },
        {
            title: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
            image: `${preview}`,
            time: '2021.10.31',
            writer: '寰球經濟',
        },
        {
            title: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
            image: `${preview}`,
            time: '2021.10.31',
            writer: '寰球經濟',
        },
        {
            title: '美股連三黑，VIX指數節節攀升，重挫之後該.....超過兩行...',
            image: `${preview}`,
            time: '2021.10.31',
            writer: '寰球經濟',
        },
    ],
    readMoreTitle: '更多豐雲學堂文章',
    readMorePath: 'https://www.sinotrade.com.tw/richclub/',
};
const RichClub = ({ richClubNews }) => {
    if (richClubNews?.length >= 0) {
        forthSectionData.cardsData = richClubNews.map(item => {
            return {
                title: item.title,
                image: item.image || `${preview}`,
                writer: item.channel?.name?.CN || '',
                time: moment(Number(item.createdAt)).format('YYYY-MM-DD'),
                _id: item._id,
                url: item.originUrl,
            };
        });
    }
    return <ForthSection data={forthSectionData} />;
};

export default RichClub;
