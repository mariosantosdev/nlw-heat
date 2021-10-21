import { VscGithubInverted } from 'react-icons/vsc';
import { useUserContext } from '../../contexts/UserContext';

import styles from './styles.module.scss';

export default function LoginBox() {
    const { signInUrl, user } = useUserContext();
    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGithub}>
                <VscGithubInverted scale='24' />
                Entrar com GitHub
            </a>
        </div>
    )
}