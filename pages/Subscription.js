import { wrapper } from '../store/store';
import { setNavItems } from '../actions/components/layouts/action';
export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
    await store.dispatch(setNavItems());
});
function Subscription(props) {
	return (
		<>
			<h1>申購</h1>
			<style jsx>{`
				h1 {
					color: black;
					font-size: 2rem;
					text-align: center;
					margin-bottom: 10px;
				}
			`}</style>
		</>
	)
}


export default Subscription;