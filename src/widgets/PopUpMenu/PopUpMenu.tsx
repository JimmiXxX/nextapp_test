import styles from "./PopUpMenu.module.scss"
import React , { useEffect , useState } from "react";
import axios from "axios";
import Link from "next/link";

export const PopUpMenu = ( { page } ) => {

    const [items , setItems] = useState ([])

    useEffect (() => {
        const PageRes = async () => {
            try {
                const res = await axios.get (`https://taxivoshod.ru/testapi/?w=list&page=${ page }`)
                setItems (res.data.items)
            } catch (e) {
                console.error (e)
            }
        }
        PageRes ()
    } , [])


    return (
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