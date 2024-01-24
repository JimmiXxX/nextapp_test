import styles from "@/app/styles/MainPage.module.scss";
import Link from "next/link";


const HomePage = () => {
    return (
        <div className={ styles.contentBlock }>
            <div className={ styles.navBar }>
                <Link href='/List/1' className={ styles.link }>Первая страница</Link>
                <Link href='/List/2' className={ styles.link }>Вторая страница</Link>
                <Link href='/List/3' className={ styles.link }>3 страница</Link>
            </div>
        </div>
    )
}

export default HomePage