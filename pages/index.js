import { useEffect } from 'react';
import Head from 'next/head'
import Layout from '../components/layouts/layout';

const Home = () => {
	let deferredPrompt;

	useEffect(() => {
		window.addEventListener('beforeinstallprompt', function(e) {
			console.log('beforeinstallprompt Event fired');
			e.preventDefault();
		  
			// Stash the event so it can be triggered later.
			deferredPrompt = e;
		  
			return false;
		});
	}, []);
	function clickHandler () {
		if(deferredPrompt != null){
			deferredPrompt.prompt();
			deferredPrompt.userChoice.then(function(choiceResult) {
				console.log(choiceResult.outcome);
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
			<Layout>
				<main>
					<h1 onClick={clickHandler}>
						NEXT.JS CLICK!
					</h1>
				</main>
			</Layout>
			<style jsx>{`
				h1 {
					color: black;
					font-size: 100px;
				}
			`}</style>
		</div>
	)
	
}
export default Home;