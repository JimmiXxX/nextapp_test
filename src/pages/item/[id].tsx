import { useMemo , useState } from "react";
import axios from "axios";
import styles from '@/app/styles/itemMenu.module.scss'

import { useRouter } from "next/router";

interface PageInterface {
    page: number,
    pages: number,
    items: []
}

interface MapInterface {
    name: string,
    id: number
}

interface ItemInterface {
    text: string
    name: string
}


const ModalPage = ( props ) => {

    const [items , setItems] = useState ([])
    const [pages , TotalPages] = useState<number> (2)
    const [page , SelectPage] = useState<number> (1)


    const [hidden , setHidden] = useState<boolean> (true)
    const [item , setItem] = useState<ItemInterface> ()


    const router = useRouter ()
    const { id } = router.query

    useMemo (() => {

        const PageRes = async () => {
            try {
                const { data } = await axios.get<PageInterface> (`https://taxivoshod.ru/testapi/?w=list&page=1`)
                TotalPages (data.pages)
                SelectPage (data.page)
                setItems (data.items)
            } catch (e) {
                return null
            }
        }

        PageRes ()

    } , [page])


    useMemo (() => {

        const ItemsRes = async () => {
            try {
                const { data } = await axios.get<ItemInterface> (`https://taxivoshod.ru/testapi/?w=item&id=${ id }`)
                setItem (data)

            } catch (e) {
                return null
            }
        }

        ItemsRes ()

    } , [id])

    const onClose = () => {
        router.push ('/page/1')
    }


    return (
        <>
            <div className={ styles.ContentItem }>
                <div className={ styles.contentListItem }>

                    <div className={ styles.totalPageItem }>
                        <div>Всего страниц: { pages }</div>
                        <div>Данная страница: { page }</div>
                    </div>

                    <ul className={ styles.itemsMapItem }>
                        { items.map (( { id , name }: MapInterface ) => (
                            <li key={ id }>
                                <button className={ styles.btnLiItem }>{ name }</button>
                            </li>
                        )) }
                    </ul>

                    <button className={ styles.nextPageItem }>Следующая страница</button>
                </div>
            </div>


            <div className={ `${ !hidden ? '' : styles.showItem }` }>


                <div className={ styles.hiddenTextItem }>
                    <div>
                        <div>{ item?.text }</div>
                        <div>{ item?.name }</div>
                    </div>
                    <button onClick={ onClose } className={ styles.closedMenuItem }>Закрыть</button>
                </div>
            </div>
        </>

    )

}

export default ModalPage