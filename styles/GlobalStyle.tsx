import { createGlobalStyle } from "styled-components"; 

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
    // CSS RESET END

    body {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        color: ${props => props.theme.color.beta};
        background-color: ${props => props.theme.color.eta};
        
    }

    button {
        cursor: pointer;
    }

    .red { color: ${props => props.theme.color.psi} }
    .green { color: ${props => props.theme.color.omega} }
    .red-bg { background-color: ${props => props.theme.color.psi} }
    .green-bg { background-color: ${props => props.theme.color.omega} }
`

export default GlobalStyle;