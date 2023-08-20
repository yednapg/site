import { Box } from "theme-ui"
const Button = ({ children, link, ...props }) => {
  return (
    <Box
      as={link ? 'a' : ''}
      href={link || ''}
      sx={{
        background: '#fff',
        // borderImage:
        //   'url(https://sakofchit.github.io/system.css/button.svg) 30 stretch',
        borderStyle: 'solid',
        fontFamily: 'Chicago_12',
        borderWidth: '5px',
        minWidth: '100px',
        textAlign: 'center',
        color: '#000',
        lineHeight: '0.9em',
        textDecoration: 'none',
        px: 4,
        py: 1,
        borderRadius: '0',
        borderTopColor: '#90908e',
        borderLeftColor: '#90908e',
        borderBottomColor: '#434343',
        borderRightColor: '#434343',
        mt: 3,
        boxShadow: '3px 3px #434343',
        zIndex: 2005,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '&:active': {
          borderTopColor: '#434343',
          borderLeftColor: '#434343',
          borderBottomColor: '#90908e',
          borderRightColor: '#90908e',
          transform: 'translateX(2px) translateY(2px)',
          boxShadow: 'none'
        },
        '&:hover': {
          cursor: 'pointer'
        }
      }}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Button
