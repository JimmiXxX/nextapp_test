import { useEffect , useState } from "react";
import axios from "axios";
import styles from "@/app/styles/Button.module.scss";
import { useRouter } from "next/router";


interface ItemInterface {
    text: string,
    name: string
}


export const ButtonOpenMenu = ( {
                                    idx ,
                                    children
                                } ) => {


    const router = useRouter ()
    const { page } = router.query

    const [hidden , setHidden] = useState (false)
    // const [openMenu , setOpenMenu] = useState (true)
    const [item , setItem] = useState<ItemInterface> ()
    useEffect (() => {

        const ItemsRes = async () => {
            try {
                const { data } = await axios.get<ItemInterface> (`https://taxivoshod.ru/testapi/?w=item&id=${ idx }`)
                setItem (data)

            } catch (e) {
                console.log (e)

            }
        }

        ItemsRes ()

    } , [])


    const openMenu = () => {
        setHidden (!hidden)
        window.history.pushState (hidden , '' , `/item/${ idx }`)
    }

    const onClose = () => {
        window.history.pushState (hidden , '' , `/page/${ page }`)
        setHidden (!hidden)
    }


    return (
        <>
            <button onClick={ openMenu } className={styles.btnLi}>{ children }</button>

            <div className={ `${ styles.HiddenMenu } ${ !hidden ? '' : styles.show }` }>


                <div className={styles.hiddenText}>
                    <div>
                        <div>{ item?.text }</div>
                        <div>{ item?.name }</div>
                    </div>
                    <button onClick={ onClose }>Закрыть</button>
                </div>
            </div>

        </>

    )
}