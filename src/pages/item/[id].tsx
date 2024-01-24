import { useRouter } from 'next/router';
import React , { useEffect , useState } from "react";
import axios from "axios";
import styles from "@/widgets/PopUpMenu/PopUpMenu.module.scss";
import Link from "next/link";
import { PopUpMenu } from "@/widgets/PopUpMenu/PopUpMenu";

const ItemPage = () => {
    const router = useRouter ()
    const { id } = router.query

    const [item , setItem] = useState<null> (null)
    useEffect (() => {
        if (id) {
            const ItemsRes = async () => {
                try {
                    const res = await axios.get (`https://taxivoshod.ru/testapi/?w=item&id=${ id }`)
                    setItem (res.data)
                } catch (e) {
                    console.error (e)
                }
            }
            ItemsRes ()
        }
    } , [id])
    if (!item) return null
    const { text , name } = item

    return (
        <Link href={ `/` } className={ styles.content }>

            <div className={ styles.contentList }>
                <div>Список элементов:</div>
                <div className={ styles.nav }>
                    <div>Это элемент номер: { id } </div>
                    <div className={ styles.components }>
                        <PopUpMenu page={ id }/>
                    </div>
                </div>
            </div>
            <button disabled={ true } className={ styles.PopUp }>

                <div>
                    <div>{ text }</div>
                    <div>{ name }</div>
                </div>
                <Link href={ `/` } className={ styles.btn }>На главную</Link>
            </button>
        </Link>
    )
}

export default ItemPage