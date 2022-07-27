import { PageHead } from '../components/includes/PageHead';
import AssetDetailMain from '../components/includes/asset/assetDetailMain';

function Asset() {
    return (
        <>
            <PageHead title={'資產總覽'} />
            <div>
                <AssetDetailMain />
            </div>
        </>
    );
}

export default Asset;
