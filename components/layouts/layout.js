import Header from '../includes/header';

const Layout = (props) => {
    console.log('Layout')
    return (
        <>
            <Header/>
            {props.children}
        </>
    )
}

export default Layout;