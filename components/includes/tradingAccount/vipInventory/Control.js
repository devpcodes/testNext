import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useCheckMobile } from '../../../../hooks/useCheckMobile';
import { AccountDropdown } from '../../personalArea/accountDropdown/AccountDropdown';
import IconBtn from './IconBtn';

const Control = ({ style, text, columns, dataSource, fileName, onClick }) => {
    const isMobile = useCheckMobile();

    const downloadHandler = useCallback(async () => {
        const { Excel } = await import('antd-table-saveas-excel');
        const excel = new Excel();
        excelStyleHandler(excel);
        const newColumns = excelDataHandler(columns);
        excel.addSheet(fileName).addColumns(newColumns).addDataSource(dataSource).saveAs(`${fileName}.xlsx`);
    }, [columns, dataSource]);

    const excelStyleHandler = excel => {
        excel.setTHeadStyle({
            background: 'FFFFFF',
            fontSize: 12,
            bold: false,
            h: 'center',
            fontName: '微軟正黑體',
        });
        excel.setTBodyStyle({
            fontName: '微軟正黑體',
        });
    };

    const excelDataHandler = tableColumns => {
        const newColumns = tableColumns.map(item => {
            const { title, dataIndex } = item;
            const obj = { title, dataIndex };
            return obj;
        });
        return newColumns;
    };

    const getWidth = () => {
        if (isMobile) {
            if (fileName == null) {
                return 'calc( 100% - 40px - 12px)';
            } else {
                return '80%';
            }
        } else {
            return '';
        }
    };

    return (
        <>
            <div className="control__container" style={style}>
                <span className="text">{text}</span>
                <AccountDropdown type={'S'} personalAreaVisible={false} tradingLayout={true} width={getWidth()} />
                <IconBtn
                    onClick={onClick}
                    type={'refresh'}
                    style={{ verticalAlign: 'top', marginRight: isMobile ? 0 : fileName ? '12px' : 0 }}
                />
                {fileName && (
                    <IconBtn
                        type={'download'}
                        style={{ verticalAlign: 'top', display: isMobile ? 'none' : 'inline-block' }}
                        onClick={downloadHandler}
                    />
                )}
            </div>
            <style jsx>{`
                .control__container {
                    margin-bottom: 21px;
                    position: absolute;
                    top: 0;
                    right: 0;
                }
                .text {
                    color: #6c7b94;
                    letter-spacing: 0.35px;
                    font-size: 1.4rem;
                    margin-right: 20px;
                }
                @media (max-width: 780px) {
                    .control__container {
                        margin-bottom: 21px;
                        position: static;
                    }
                    .text {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

Control.propTypes = {
    style: PropTypes.object,
    text: PropTypes.string,
    columns: PropTypes.array,
    dataSource: PropTypes.array,
    fileName: PropTypes.string,
};
export default Control;
