import { useEffect , useState } from "react";
import axios , { AxiosHeaders } from "axios";
import styles from '@/app/styles/Button.module.scss'

interface axiosRes {
    data: any;
    status: number;
    statusText: string;
    headers: AxiosHeaders;
    config: string;
    request?: XMLHttpRequest;
}

interface Item {
    text: string,
    name: string
}

export const Button = ( {id, children, page} ) => {


    const [items , setItems] = useState<Item> ()
    const [hidden, setHidden] = useState(false)


    useEffect(()=>{
        const ItemsRes = async () => {
            try {
                const res:axiosRes = await axios.get (`https://taxivoshod.ru/testapi/?w=item&id=${id}`)
                setItems (res.data)
                console.log (res)
            } catch (e) {
                console.log (e)
            }
        }
        ItemsRes ()
    }, [])

    const openMenu = () =>  {

        setHidden(!hidden)
        window.history.pushState(hidden, '', `${page}/item/${id}`)
    }

    const onClose = () => {
        window.history.back()
        setHidden(!hidden)
    }

    return (
        <>
            <button onClick={openMenu} className={styles.contentMenu}>{children}</button>
            <div className={`${styles.HiddenMenu} ${!hidden ? '' : styles.show}`}>
                <div className={styles.hiddenText}>
                    <div>
                        <div>{items?.text}</div>
                        <div>{items?.name}</div>
                    </div>
                    <button onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </>

    )
}