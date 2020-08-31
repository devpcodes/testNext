import { useEffect, useRef, useLayoutEffect  } from 'react';
import Head from 'next/head'
import Layout from '../components/layouts/layout';
import dynamic from 'next/dynamic'
import Login from '../components/includes/sinotradeLogin/login';
import inOutAnimation from '../components/hoc/inOutAnimation';

const NewLogin = inOutAnimation(Login);

const Chart = dynamic(
    () => import("../components/includes/chart"),
    { ssr: false }
);

const Home = function(){
	let deferredPrompt;
	useEffect(() => {
		window.addEventListener('beforeinstallprompt', function(e) {
			console.log('beforeinstallprompt Event fired');
			e.preventDefault();
			deferredPrompt = e;
			return false;
		});
	}, []);

	function clickHandler () {
		if(deferredPrompt != null){
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then(function(choiceResult) {
				// console.log(choiceResult.outcome);
				if(choiceResult.outcome == 'dismissed') {
					console.log('User cancelled home screen install');
				}
				else {
					console.log('User added to home screen');
				}
				deferredPrompt = null;
			});
		}
	}
	
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NewLogin isPC={true} onClose={() => {
				console.log('close')
			}}/>
			<Layout>
				<main>
					<h1 onClick={clickHandler}>
						Next.JS PWA CLICK!
					</h1>
					<Chart />
					<h2>環境: {process.env.NODE_ENV} 路徑：{process.env.NEXT_PUBLIC_SUBPATH}</h2>
				</main>
			</Layout>
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