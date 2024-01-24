import styles from "../app/styles/PopUpMenu.module.scss"
import React , { useEffect , useMemo , useState } from "react";
import axios from "axios";
import Link from "next/link";

export const PopUpMenu = ( { page } ) => {

    const [items , setItems] = useState ([])

    useMemo(() => {
        const PageRes = async () => {
            try {
                const res = await axios.get (`https://taxivoshod.ru/testapi/?w=list&page=${ page }`)
                if(res.data.page <= res.data.pages){
                    setItems (res.data.items)
                }
            } catch (e) {
                console.log (e)
            }
        }
        PageRes ()
    } , [page])


    return (
        items &&
        <div>
            <ul className={ styles.ListMap }>
                { items.map (( { id , name } ) => (
                    <li key={ id }>
                        <Link href={ `/item/${ id }` } className={ styles.LiComponent }>{ name }</Link>
                    </li>
                )) }
            </ul>
        </div>
    )
}