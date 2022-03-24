// Sizing guide is based on greek alphabet
// From largest unit to smallest:
// alpha
// beta
// gamma
// delta
// epsilon
// zeta
// eta
// theta
// iota

// omega = different from others
// psi = different from others

const theme = {
    font: {
        size: {
            alpha: '1.5em',     // 24px
            beta: '1.25em',    // 18px
            gamma: '1em',   // 14px
            delta: '0.75em',    // 12px
            epsilon: '0.625em', // 10px
        },
        weight: {
            alpha: '600',
            beta: '400'
        },
        family: 'Montserrat, sans-serif',
    },
    color: {
        // color order is from darkest to lightest
        alpha: '#2E2623',
        beta: '#50433D',
        gamma: '#7F6F68',
        delta: '#A49792',
        epsilon: '#D1C9C7',
        zeta: '#EBE7E5',
        eta: '#F3F2F1',
        theta: '#FAFAFA',
        omega: '#16C784',   // green
        psi: '#EA3943'      // red
    },
    space: {
        alpha: '5em',
        beta: '3em',
        gamma: '2em',
        delta: '1.5em',
        epsilon: '1em',
        zeta: '0.75em',
        eta: '0.5em',
        theta: '0.25em',
        iota: '0.125em'
    },
    breakpoint: {
        alpha: '1920px',
        beta: '1440px',
        gamma: '1200px',
        delta: '1024px',
        epsilon: '768px ',
        zeta: '600px',
        eta: '480px',
        theta: '320px'
    },
    max_width: '1200px'
}



declare module 'styled-components' {
    type Theme = typeof theme;
    export interface DefaultTheme extends Theme {}
}

export default theme;
