import { useMemo , useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ButtonOpenMenu } from "@/pages/ButtonOpenMenu";
import styles from '@/app/styles/PopUpMenu.module.scss'


interface PageInterface {
    page: number,
    pages: number,
    items: []
}

interface ItemInterface {
    text: string,
    name: string
}


const Pages = ( props ) => {

    const router = useRouter ()

    const [items , setItems] = useState ([])
    const [pages , TotalPages] = useState<number> (2)
    const [page , SelectPage] = useState<number> (1)

    useMemo (() => {

        const PageRes = async () => {
            try {
                const { data } = await axios.get<PageInterface> (`https://taxivoshod.ru/testapi/?w=list&page=${ page }`)
                TotalPages (data.pages)
                SelectPage (data.page)
                setItems (data.items)
            } catch (e) {
                return null
            }
        }

        PageRes ()

    } , [page])


    const NextPage = () => {
        if (page < pages) {
            SelectPage (page + 1)
            router.push (`/page/${ page + 1 }`)
        } else {
            SelectPage (1)
            router.push (`/page/${ page - 1 }`)

        }
    }


    return (
        <div className={styles.Content}>
            <div className={ styles.contentList }>

                <div className={styles.totalPage}>
                    <div>Всего страниц: { pages }</div>
                    <div>Данная страница: { page }</div>
                </div>

                <ul className={ styles.itemsMap }>
                    { items.map (( { id , name } ) => (
                        <li key={ id }>
                            <ButtonOpenMenu idx={ id }>{ name }</ButtonOpenMenu>
                        </li>
                    )) }
                </ul>

                <button onClick={ NextPage } className={styles.nextPage}>Следующая страница</button>
            </div>
        </div>
    )
}

export default Pages