import { useRouter } from 'next/router';
import React , { useEffect , useMemo , useState } from "react";
import axios , { AxiosHeaders } from "axios";
import styles from "@/app/styles/PopUpMenu.module.scss";
import Link from "next/link";
import { PopUpMenu } from "@/pages/PopUpMenu";
import { set } from "immutable";

interface axiosRes {
    data: any;
    status: number;
    statusText: string;
    headers: AxiosHeaders;
    config: string;
    request?: XMLHttpRequest;
}

interface Item {
    name: string,
    text: string
}

const ItemPage = () => {
    const router = useRouter ()
    const { id } = router.query

    const [item , setItem] = useState<Item> ()

    useMemo(() => {
        if (id) {
            const ItemsRes = async () => {
                try {
                    const res:axiosRes = await axios.get (`https://taxivoshod.ru/testapi/?w=item&id=${ id }`)
                    setItem (res.data)
                    console.log (res)
                } catch (e) {
                    console.log (e)
                }
            }
            ItemsRes ()
        }
    } , [id])


    return (
        item &&
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
                    <div>{ item.text }</div>
                    <div>{ item.name }</div>
                </div>
                <Link href={ `/` } className={ styles.btn }>На главную</Link>
            </button>
        </Link>
    )
}

export default ItemPage