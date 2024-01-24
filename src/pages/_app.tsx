import '@/app/styles/_global.scss'
import '@/app/styles/_reset.scss'
import '@/app/styles/_vars.scss'


export default function App( { Component , pageProps } ) {
    return <Component { ...pageProps } />
}