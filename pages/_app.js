import '../styles/globals.css';
import withRedux from '../components/hoc/withReduxApp';
import { Provider } from 'react-redux';
import 'antd/dist/antd.min.css';

MyApp.getInitialProps = async (ctx) => {
    const { Component } = ctx
    let pageProps = {}

    // 拿到Component上定义的getInitialProps
    if (Component.getInitialProps) {
      	// 执行拿到返回结果`
      	pageProps = await Component.getInitialProps(ctx)
    }

    // 返回给组件
    return {
      	pageProps,
    }
}


function MyApp({ Component, pageProps, reduxStore }) {
	return (
		<Provider store={reduxStore}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default withRedux(MyApp)
