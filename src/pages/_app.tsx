import '@/app/global_styles/_global.scss'
import '@/app/global_styles/_reset.scss'
import '@/app/global_styles/_vars.scss'


export default function App( { Component , pageProps } ) {
    return <Component { ...pageProps } />
}