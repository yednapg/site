import CardModel from './card-model'
import { Box, Flex, Grid, Image, Link, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

const styled = `
h3 {
    font-family: Terminal_Grotesk;
}
`

export default function HackersWanted() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#17171d',
        backgroundRepeat: 'repeat',
        background: 'radial-gradient(#fff 1px,transparent 1px)',
        backgroundSize: '24px 24px'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#ffffff"
    >
      <Text as="h3" sx={{ fontSize: '0.9em' }}>
        Hackers Wanted
      </Text>
      <Grid columns={[1, '1fr 0.4fr']}>
        <Box>
          <Text
            as="p"
            variant="subtitle"
            sx={{ zIndex: 2, position: 'relative' }}
          >
            An 8 minute expression of what it means to be a "hacker".
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
            hackers. This is our love letter to them, on behalf of a society
            that’s long failed them.
          </Text>
        </Box>
        <Box>
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
              primary="#484137"
              id="48"
            >
              Read more...
            </Buttons>
          </Flex>
        </Box>
      </Grid>
      <style>{styled}</style>
    </CardModel>
  )
}
