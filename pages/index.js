import { useEffect, useState } from 'react';
import Head from 'next/head'
import Layout from '../components/layouts/layout';
import dynamic from 'next/dynamic'
import Login from '../components/includes/sinotradeLogin/login';
import inOutAnimation from '../components/hoc/inOutAnimation';
import SinoTradeLogin from '../components/includes/sinotradeLogin/SinoTradeLogin'
const NewLogin = inOutAnimation(Login);

const Chart = dynamic(
    () => import("../components/includes/chart"),
    { ssr: false }
);

const Home = function(){
	const [isVisible, setIsVisible] = useState(true);

	function clickHandler () {
		setIsVisible(true);
	}
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{/* <NewLogin popup={false} isPC={false} onClose={() => {
				console.log('close')
			}}/> */}
			{/* <Layout>
				<main>
					<h1 onClick={clickHandler}>
						login click
					</h1>
					<Chart />
					<h2>環境: {process.env.NODE_ENV} 路徑：{process.env.NEXT_PUBLIC_SUBPATH}</h2>
				</main>
			</Layout> */}
			<main>
				<h1 onClick={clickHandler}>
					login click
				</h1>
				<Chart />
				<h2>環境: {process.env.NODE_ENV} 路徑：{process.env.NEXT_PUBLIC_SUBPATH}</h2>
			</main>
			<style jsx>{`
				h1 {
					color: black;
					font-size: 100px;
					text-align: center;
					margin-bottom: 10px;
				}
				h2 {
					text-align: center;
				}
			`}</style>
		</div>
	)
	
}
export default Home;