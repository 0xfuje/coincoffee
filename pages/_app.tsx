import type { AppProps } from 'next/app'
import GlobalStyle from '../styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'
import { Provider } from 'react-redux'
import store from '../app/store'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
            </ThemeProvider>
        </Provider>
    )
}

export default MyApp
