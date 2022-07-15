import { PageHead } from '../components/includes/PageHead';
import AssetMain from '../components/includes/asset/assetMain';

function Asset() {
    return (
        <>
            <PageHead title={'資產總覽'} />
            <div>
                <AssetMain />
            </div>
        </>
    );
}

export default Asset;
