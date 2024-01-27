import { useEffect , useMemo , useState } from "react";
import axios from "axios";
import styles from '@/app/styles/Button.module.scss'

import { useRouter } from "next/router";

interface PageInterface {
    page: number,
    pages: number,
    items: []
}

interface ItemInterface {
    text: string,
    name: string
}


const ModalPage = (props) => {

    const [items , setItems] = useState ([])
    const [pages , TotalPages] = useState<number> (2)
    const [page , SelectPage] = useState<number> (1)


    const [hidden , setHidden] = useState (true)
    const [item , setItem] = useState<ItemInterface> ()


    const router = useRouter()

    const {id} = router.query

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

                const { data } = await axios.get<ItemInterface> (`https://taxivoshod.ru/testapi/?w=item&id=${id}`)
                setItem (data)

            } catch (e) {
                console.log (e)
            }
        }

        ItemsRes ()

    } , [id])


    const openMenu = () => {

    }
    const onClose = () => {
        router.push('/page/1')
    }



    return (
        <>



            <div className={ `${ styles.HiddenMenu } ${ !hidden ? '' : styles.shows }`}>
                <div className={styles.Content}>
                    <div className={ styles.contentList }>

                        <div className={styles.totalPage}>
                            <div>Всего страниц: { pages }</div>
                            <div>Данная страница: { page }</div>
                        </div>
                    </div>

            <ul>
                { items.map (( { id , name } ) => (
                    <li key={ id }>
                        <button onClick={ openMenu }>{ name }</button>
                    </li>
                )) }
            </ul>

            <button>Следующая страница</button>

            </div>
            </div>


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

export default ModalPage