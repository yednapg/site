import CardModel from './card-model'
import { Box, Flex, Grid, Image, Link, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

const styled = `
h9 {
    font-family: Terminal_Grotesk;
}
`

export default function HackersWanted() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: '#17171d',
        backgroundRepeat: 'repeat',
        background: '#000',
        backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)',
        backgroundSize: '24px 24px !important'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#ffffff"
    >
      <Text as="h9" sx={{ fontSize: ['36px', '32px', '42px', '48px'] }}>
        Hackers Wanted
      </Text>
      <Grid columns={[1, '1fr 0.4fr']}>
        <Box>
          <Text
            as="p"
            variant="subtitle"
            sx={{ zIndex: 2, position: 'relative' }}
          >
            What does it mean to be a hacker? An expression of our philosophy.
          </Text>
          <Text
            as="p"
            variant="subtitle"
            sx={{ zIndex: 2, position: 'relative' }}
          >
            Some people are allergic to unthinking rules and outdated systems.
            They want the world to be better, more magical, more free. Some also
            have the creative energy to do something about it—without the need
            for instructions, and without needing to be asked. These people are
            hackers...
          </Text>
        </Box>
        <Box sx={{ alignItems: 'end' }}>
          <Flex
            sx={{
              flexDirection: 'column',
              mt: [3, 3, 4],
              alignItems: 'end',
              justifyContent: 'flex-end'
            }}
          >
            <Buttons
              icon="view"
              href="/hackers-wanted"
              target="_blank"
              rel="noopener"
              primary="#fff"
              id="48"
              sx={{ color: '#000' }}
            >
              Read more
            </Buttons>
          </Flex>
        </Box>
      </Grid>
      <style>{styled}</style>
    </CardModel>
  )
}
