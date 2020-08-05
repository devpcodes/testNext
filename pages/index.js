import Head from 'next/head'
import Layout from '../components/layouts/layout'
export default function Home() {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<main>
					<h1>
						Next.js!
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
