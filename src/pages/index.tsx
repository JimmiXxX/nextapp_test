// import styles from "./index.module.css"
import axios from "axios";
import { useEffect , useMemo , useState } from "react";
import { useRouter } from "next/router";


interface PageInterface {
    page: number | any,
    pages: number | any,
    items: []
}

const MainPage = () => {

    const router = useRouter ()


    useEffect(()=>{
        router.push('/page/1')
    })
    return (
        <>

        </>
    )
}

export default MainPage