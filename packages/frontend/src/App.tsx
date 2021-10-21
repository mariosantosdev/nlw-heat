import styles from './styles/App.module.scss';
import { useUserContext } from './contexts/UserContext';

import LoginBox from './components/LoginBox';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';

function App() {
    const { user } = useUserContext();
    return (
        <main className={styles.contentWrapper}>
            <MessageList />
            {user ? <SendMessageForm /> : <LoginBox />}
        </main>
    )
}

export default App
