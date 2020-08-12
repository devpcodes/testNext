import { DatePicker } from 'antd';
import Layout from '../components/layouts/layout';
import { connect } from 'react-redux'
import { add } from '../actions/goOrder';
function GoOrder(props) {
	console.log(props);
	return (
		<Layout>
            <DatePicker />
			<h1 onClick={props.add}>新下單盒：我可以點擊測異步Redux{props.count}</h1>
			<style jsx>{`
				h1 {
					color: black;
					font-size: 2rem;
					text-align: center;
					margin-bottom: 10px;
				}
			`}</style>
		</Layout>
	)
}

function mapStateToProps(state) {
	console.log(state);
	const { count } = state.goOrder
	return {
	  	count,
	}
}

export default connect(
	mapStateToProps,
	{ add }
)(GoOrder)
