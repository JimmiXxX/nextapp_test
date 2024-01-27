import { useEffect } from "react";
import { useRouter } from "next/router";

const MainPage = () => {
    const router = useRouter ()
    useEffect (() => {
        router.push ('/page/1')
    } , [])
}

export default MainPage