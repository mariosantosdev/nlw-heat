import styles from './styles.module.scss'

import logo from '../../assets/logo.svg'

export default function MessageList() {
    return (
        <div className={styles.messageListWrapper}>
            <img src={logo} alt="DoWhile 2021" />

            <ul className={styles.messageList}>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Teste mensagem</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/mariosantosdev.png" alt="Mário Santos" />
                        </div>
                        <span>Mário Santos</span>
                    </div>
                </li>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Teste mensagem</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/mariosantosdev.png" alt="Mário Santos" />
                        </div>
                        <span>Mário Santos</span>
                    </div>
                </li>
                <li className={styles.message}>
                    <p className={styles.messageContent}>Teste mensagem</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/mariosantosdev.png" alt="Mário Santos" />
                        </div>
                        <span>Mário Santos</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}