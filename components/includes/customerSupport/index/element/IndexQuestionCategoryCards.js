import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'antd';
import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import layers from '../../../../../resources/images/pages/customer_support/ic_layers_alt.svg';

const IndexQuestionCategoryCards = ({
    firstCategoryAndQuestion,
    hoverCategoryId,
    toggleSetCategoryHover,
    setNoneCategoryHover,
}) => {
    const [currentHoverCategoryId, setCurrentHoverCategoryId] = useState(hoverCategoryId);

    const changeHoverCategoryId = id => {
        toggleSetCategoryHover(id);
    };

    const changeNoneCategoryHover = () => {
        setNoneCategoryHover();
    };

    useEffect(() => {
        setCurrentHoverCategoryId(hoverCategoryId);
    }, [hoverCategoryId]);

    return (
        <Row gutter={[16, 16]} className="qaBlock">
            {firstCategoryAndQuestion.map((item, index) => (
                <Col key={index} className="gutter-row" xs={24} sm={8} lg={8}>
                    <div
                        className="categoryNameGroup"
                        onMouseEnter={() => {
                            changeHoverCategoryId(item.id);
                        }}
                        onMouseLeave={changeNoneCategoryHover}
                    >
                        <div className="categoryNameGroupLeft">
                            <img className="layerIcon" alt="layers" src={layers} />
                            <Link href={`/customer-support/question?key=${item.id}`}>
                                <span className="categoryName">{item.categoryName}</span>
                            </Link>
                        </div>
                        {currentHoverCategoryId === item.id ? <RightOutlined className="rightIcon" /> : ''}
                    </div>
                    <Card className="QAcard">
                        {item.questions?.map((i, idx) => (
                            <Link href={`/customer-support/question/${i.uuid}`} key={idx}>
                                <a className="questionTitle">{i.title}</a>
                            </Link>
                        ))}
                    </Card>
                </Col>
            ))}
            <style jsx>
                {`
                    .questionTitle {
                        display: -webkit-box;
                        line-height: 3.5rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                    }

                    .categoryNameGroup {
                        display: flex;
                        justify-content: space-between;
                        cursor: pointer;
                    }

                    .layerIcon {
                        width: 23px;
                        margin-right: 9px;
                        padding: 0 0 5px 3px;
                    }

                    .categoryName {
                        font-size: 20px;
                    }

                    @media screen and (max-width: 768px) {
                        .categoryName {
                            font-size: 16px;
                        }
                    }
                `}
            </style>

            <style jsx global>
                {`
                    .qaBlock {
                        align-items: flex-start;
                        margin-top: 16px;
                        margin-bottom: 165px !important;
                    }

                    .QAcard {
                        display: flex;
                        justify-content: flex-start;
                        min-height: 140px;
                        margin-top: 1rem;
                        border: 1px solid #d7e0ef;
                    }

                    .ant-card-body .questionTitle:hover {
                        color: #daa360;
                    }

                    .rightIcon {
                        padding-top: 10px;
                        font-size: 10px;
                    }

                    .categoryNameGroup:hover > .categoryNameGroupLeft > .categoryName,
                    .categoryNameGroup:hover > .rightIcon {
                        color: #daa360;
                    }

                    /* this svg icon can't just use 'fill' to change color.....so..this way works */
                    .categoryNameGroup:hover > .categoryNameGroupLeft > .layerIcon {
                        filter: invert(75%) sepia(15%) saturate(1298%) hue-rotate(350deg) brightness(89%) contrast(91%);
                    }
                `}
            </style>
        </Row>
    );
};

export default IndexQuestionCategoryCards;

IndexQuestionCategoryCards.propTypes = {
    firstCategoryAndQuestion: PropTypes.array,
    hoverCategoryId: PropTypes.number,
    toggleSetCategoryHover: PropTypes.func,
    setNoneCategoryHover: PropTypes.func,
};
