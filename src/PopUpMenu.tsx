import styles from "./app/styles/PopUpMenu.module.scss"
import React , { useMemo , useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button } from "@/Button";


export const PopUpMenu = ( { page } ) => {

    const [item , setItem] = useState ([])

    useMemo (() => {

        if (page == 1) {
            const pageResOne = async () => {
                try {
                    const res = await axios.get (`https://taxivoshod.ru/testapi/?w=list&page=1`)
                    setItem (res.data.items)
                } catch (e) {
                    console.log (e)
                }
            }

            pageResOne ()
        } else {
            const pageResOne = async () => {
                try {
                    const res = await axios.get (`https://taxivoshod.ru/testapi/?w=list&page=2`)
                    setItem (res.data.items)
                } catch (e) {
                    console.log (e)
                }
            }

            pageResOne ()
        }
    } , [page])


    return (
        <div>
            <ul className={ styles.ListMap }>
                { item.map (( { id , name } ) => (
                    <li key={ id }>
                        <Button id={id} page={page}>{name}</Button>
                    </li>
                )) }
            </ul>
        </div>
    )
}