import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#33ab9f',
            main: '#009688',
            dark: '#00695f'
        },
        secondary: {
        light: '#ffde33',
        main: '#ffd600',
        dark: '#ffab00'
        },
    },
    typography: { 
        useNextVariants: true
    }
})

export default theme
