import { createGlobalStyle, css } from "styled-components"; 

const globalPagePadding = css`
    padding: 0 ${props => props.theme.space.eta};
    @media screen and (min-width: ${props => props.theme.breakpoint.zeta}) {
        padding: 0 ${props => props.theme.space.epsilon};
    }
    @media screen and (min-width: ${props => props.theme.breakpoint.epsilon}) {
        padding: 0 ${props => props.theme.space.delta};
    }
    @media screen and (min-width: ${props => props.theme.breakpoint.delta}) {
        padding: 0 ${props => props.theme.space.gamma};
    }
`

const GlobalStyle = createGlobalStyle`
    // CSS RESET START - credit to elad2412
    *:where(:not(iframe, canvas, img, svg, video):not(svg *, symbol *)) {
        all: unset;
        display: revert;
    }
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    a { cursor: revert; }
    ol, ul, menu { list-style: none; }
    img { max-width: 100%; }
    table { border-collapse: collapse;}
    textarea { white-space: revert; }
    :where([hidden]){ display:none; }
    :where([contenteditable]){
        -moz-user-modify: read-write;
        -webkit-user-modify: read-write;
        overflow-wrap: break-word;
        -webkit-line-break: after-white-space;
        line-break: after-white-space;
    }
    :where([draggable="true"]) { -webkit-user-drag: element; }

    html, body {
        max-width: 100%;
        overflow-x: hidden;
    }

    // CSS RESET END

    body {
        position: relative;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        color: ${props => props.theme.color.beta};
        background-color: ${props => props.theme.color.eta};
    }

    button {
        cursor: pointer;
    }
`

export default GlobalStyle;
export { globalPagePadding }