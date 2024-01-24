import { useRouter } from 'next/router';
import { PopUpMenu } from "@/pages/PopUpMenu";
import styles from "@/app/styles/PopUpMenu.module.scss";
import Link from "next/link";
import React from "react";

const ListPage = () => {
    const router = useRouter ()
    const { page } = router.query

    return (
        <div>
            <div className={ styles.contentList }>
                <div>Список элементов:</div>
                <div className={ styles.nav }>
                    <div>Это страница номер: { page } </div>
                    <div>
                        <PopUpMenu page={ page }/>
                    </div>

                    <Link href='/' className={ styles.backBtn }>На главную</Link>
                </div>
            </div>


        </div>
    )
}

export default ListPage;