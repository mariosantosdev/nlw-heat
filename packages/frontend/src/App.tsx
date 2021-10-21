import styles from './styles/App.module.scss';

import LoginBox from './components/LoginBox';
import MessageList from './components/MessageList';

function App() {
    return (
        <main className={styles.contentWrapper}>
            <MessageList />
            <LoginBox />
        </main>
    )
}

export default App
