import Link from "next/link";
import styles from './MainPage.module.scss'

export const MainPage = () => {

    return (
        <div className={ styles.contentBlock }>
            <div className={ styles.navBar }>
                <Link href='/List/1' className={ styles.link }>Первая страница</Link>
                <Link href='/List/2' className={ styles.link }>Вторая страница</Link>
            </div>
        </div>
    )
}