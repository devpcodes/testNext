import Head from 'next/head'
import dynamic from 'next/dynamic'

const Chart = dynamic(
    () => import("../components/includes/chart"),
    { ssr: false }
);

const Home = function(){
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<h1>
					Next JS
				</h1>
				{/* <Chart /> */}
				<h2>環境: {process.env.NODE_ENV} 路徑：{process.env.NEXT_PUBLIC_SUBPATH}</h2>
			</main>
			<style jsx>{`
				h1 {
					color: black;
					font-size: 100px;
					text-align: center;
					margin-bottom: 10px;
					height: 80vh;
				}
				h2 {
					text-align: center;
				}
			`}</style>
		</div>
	)
	
}
export default Home;