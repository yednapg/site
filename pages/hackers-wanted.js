import { Box, Image, Button, Flex, Text } from 'theme-ui'
// import styles from '@sakun/system.css'
import ForceTheme from '../components/force-theme'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Hackers from '../components/hackers-wanted.mdx'
import React, { useEffect, useState } from 'react'
import { useSession, getSession, signIn, signOut } from 'next-auth/react'
import Github from 'next-auth/providers/github'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import { Fade } from 'react-reveal'

/** @jsxImportSource theme-ui */

const styled = `
::-webkit-scrollbar {
  background-color: #fff;
  width: 22px;
}
::-webkit-scrollbar-track {
  background: linear-gradient(
      45deg,
      #000 25%,
      transparent 0,
      transparent 75%,
      #000 0,
      #000
    ),
    linear-gradient(
      45deg,
      #000 25%,
      transparent 0,
      transparent 75%,
      #000 0,
      #000
    );
  background-color: #fff;
  background-position: 0 0, 2px 2px;
  background-size: 4px 4px;
  border-left: 3px solid #000;
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background-color: #fff;
  border: 2px solid #000;
  border-right: none;
  box-sizing: content-box;
  width: 20px;
}
::-webkit-scrollbar-button:horizontal:end:increment,
::-webkit-scrollbar-button:horizontal:start:decrement,
::-webkit-scrollbar-button:vertical:end:increment,
::-webkit-scrollbar-button:vertical:start:decrement {
  display: block;
}
::-webkit-scrollbar-button:vertical:start {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='22' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' stroke='%23000' d='M.5.5h21v22.375H.5z'/%3E%3Cpath fill='%23000' d='M1 23h20v-2H1zM1.375 12.375h5.5V11h-5.5zM6.875 17.875h6.875V16.5H6.875zM6.875 17.875v-5.5H5.5v5.5zM9.625 5.5V4.125H8.25V5.5zM11 4.125V2.75H9.625v1.375zM19.25 12.375V11h-1.375v1.375zM17.875 11V9.625H16.5V11zM16.5 9.625V8.25h-1.375v1.375zM15.125 8.25V6.875H13.75V8.25zM13.75 6.875V5.5h-1.375v1.375zM12.375 5.5V4.125H11V5.5zM8.25 6.875V5.5H6.875v1.375zM6.875 8.25V6.875H5.5V8.25zM5.5 9.625V8.25H4.125v1.375zM4.125 11V9.625H2.75V11z'/%3E%3Cpath fill='%23000' d='M2.75 12.375V11H1.375v1.375zM15.125 17.875v-5.5H13.75v5.5zM13.75 12.375h5.5V11h-5.5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  height: 23.38px;
}
::-webkit-scrollbar-button:vertical:start:active {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='22' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' stroke='%23000' d='M.5.5h21v22.38H.5z'/%3E%3Cpath fill='%23000' d='M1 23.005h20v-2H1zM1.375 12.378h5.5v-1.375h-5.5zM6.875 17.879h6.875V6.877H6.875zM6.875 17.879v-5.501H5.5v5.5zM9.625 5.501V4.126H8.25v1.375zM11 4.126V2.75H9.625v1.375zM19.25 12.378v-1.375h-1.375v1.375zM17.875 11.002V9.627H13.75v1.375zM16.5 9.627V8.252h-2.75v1.375zM15.125 8.252V6.877H13.75v1.375zM13.75 6.876V5.501h-1.375v1.375zM12.375 5.501V4.126h-2.75v1.375zM12.375 6.876V5.501h-5.5v1.375zM6.875 8.252V6.877H5.5v1.375zM6.875 9.627V8.252h-2.75v1.375zM6.875 11.002V9.627H2.75v1.375z'/%3E%3Cpath fill='%23000' d='M2.75 12.378v-1.375H1.375v1.375zM15.125 17.879v-5.501H13.75v5.5zM13.75 12.378h5.5v-1.375h-5.5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  height: 23.38px;
}
::-webkit-scrollbar-button:vertical:end {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='22' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' stroke='%23000' d='M.5 22.875h21V.5H.5z'/%3E%3Cpath fill='%23000' d='M1 .375h20v2H1zM1.375 11h5.5v1.375h-5.5zM6.875 5.5h6.875v1.375H6.875zM6.875 5.5V11H5.5V5.5zM9.625 17.875v1.375H8.25v-1.375zM11 19.25v1.375H9.625V19.25zM19.25 11v1.375h-1.375V11zM17.875 12.375v1.375H16.5v-1.375zM16.5 13.75v1.375h-1.375V13.75zM15.125 15.125V16.5H13.75v-1.375zM13.75 16.5v1.375h-1.375V16.5zM12.375 17.875v1.375H11v-1.375zM8.25 16.5v1.375H6.875V16.5zM6.875 15.125V16.5H5.5v-1.375zM5.5 13.75v1.375H4.125V13.75zM4.125 12.375v1.375H2.75v-1.375z'/%3E%3Cpath fill='%23000' d='M2.75 11v1.375H1.375V11zM15.125 5.5V11H13.75V5.5zM13.75 11h5.5v1.375h-5.5z'/%3E%3C/svg%3E");
  height: 23.38px;
}
::-webkit-scrollbar-button:vertical:end:active {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='22' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' stroke='%23000' d='M.5 22.88h21V.5H.5z'/%3E%3Cpath fill='%23000' d='M1 .375h20v2H1zM1.375 11.002h5.5v1.375h-5.5zM6.875 5.501h6.875v11.002H6.875zM6.875 5.501v5.501H5.5v-5.5zM9.625 17.879v1.375H8.25v-1.375zM11 19.254v1.375H9.625v-1.375zM19.25 11.002v1.375h-1.375v-1.375zM17.875 12.378v1.375H13.75v-1.375zM16.5 13.753v1.375h-2.75v-1.375zM15.125 15.128v1.375H13.75v-1.375zM13.75 16.503v1.375h-1.375v-1.375zM12.375 17.879v1.375h-2.75v-1.375zM12.375 16.503v1.375h-5.5v-1.375zM6.875 15.128v1.375H5.5v-1.375zM6.875 13.753v1.375h-2.75v-1.375zM6.875 12.378v1.375H2.75v-1.375z'/%3E%3Cpath fill='%23000' d='M2.75 11.002v1.375H1.375v-1.375zM15.125 5.501v5.501H13.75v-5.5zM13.75 11.002h5.5v1.375h-5.5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  height: 23.38px;
}
::-webkit-scrollbar-button:horizontal:start {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' stroke='%23000' d='M.813 22.187v-21h22.375v21z'/%3E%3Cpath fill='%23000' d='M23.313 21.688v-20h-2v20zM12.688 21.313v-5.5h-1.376v5.5zM18.188 15.813V8.936h-1.375v6.876z'/%3E%3Cpath fill='%23000' d='M18.188 15.813h-5.5v1.374h5.5zM5.813 13.063H4.438v1.374h1.375zM4.438 11.688H3.063v1.374h1.374zM12.688 3.438h-1.376v1.374h1.376zM11.313 4.813H9.937v1.375h1.376zM9.938 6.188H8.562v1.375h1.376zM8.563 7.563H7.187v1.375h1.375zM7.188 8.938H5.813v1.374h1.375zM5.813 10.313H4.438v1.374h1.375zM7.188 14.438H5.813v1.374h1.375zM8.563 15.813H7.187v1.374h1.375zM9.938 17.188H8.562v1.375h1.376zM11.313 18.563H9.937v1.375h1.376zM12.688 19.938h-1.376v1.375h1.376zM18.188 7.563h-5.5v1.375h5.5z'/%3E%3Cpath fill='%23000' d='M12.688 8.938v-5.5h-1.376v5.5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  height: 23.38px;
}
::-webkit-scrollbar-button:horizontal:start:active {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' stroke='%23000' d='M.81 22.19v-21h22.38v21z'/%3E%3Cpath fill='%23000' d='M23.315 21.69v-20h-2v20zM12.688 21.315v-5.5h-1.375v5.5zM18.189 15.815V8.94H7.187v6.875z'/%3E%3Cpath fill='%23000' d='M18.189 15.815h-5.501v1.375h5.5zM5.811 13.065H4.436v1.375h1.375zM4.436 11.69H3.06v1.375h1.375zM12.688 3.44h-1.375v1.375h1.375zM11.312 4.815H9.937V8.94h1.375zM9.937 6.19H8.562v2.75h1.375z'/%3E%3Cpath fill='%23000' d='M8.562 7.565H7.187V8.94h1.375zM7.186 8.94H5.811v1.375h1.375zM5.811 10.315H4.436v2.75h1.375zM7.186 10.315H5.811v5.5h1.375zM8.562 15.815H7.187v1.375h1.375z'/%3E%3Cpath fill='%23000' d='M9.937 15.815H8.562v2.75h1.375zM11.312 15.815H9.937v4.125h1.375zM12.688 19.94h-1.375v1.375h1.375zM18.189 7.565h-5.501V8.94h5.5z'/%3E%3Cpath fill='%23000' d='M12.688 8.94v-5.5h-1.375v5.5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  height: 23.38px;
}
::-webkit-scrollbar-button:horizontal:end {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' stroke='%23000' d='M23.188 22.188v-21H.813v21z'/%3E%3Cpath fill='%23000' d='M.688 21.687v-20h2v20zM11.313 21.312v-5.5h1.375v5.5zM5.813 15.812V8.937h1.375v6.875zM5.813 15.813h5.5v1.375h-5.5zM18.188 13.063h1.375v1.375h-1.375zM19.563 11.688h1.375v1.375h-1.375zM11.313 3.438h1.375v1.375h-1.375zM12.688 4.813h1.375v1.375h-1.375zM14.063 6.188h1.375v1.375h-1.375zM15.438 7.563h1.375v1.375h-1.375zM16.813 8.938h1.375v1.375h-1.375zM18.188 10.313h1.375v1.375h-1.375zM16.813 14.438h1.375v1.375h-1.375zM15.438 15.813h1.375v1.375h-1.375zM14.063 17.188h1.375v1.375h-1.375zM12.688 18.563h1.375v1.375h-1.375z'/%3E%3Cpath fill='%23000' d='M11.313 19.938h1.375v1.375h-1.375zM5.813 7.563h5.5v1.375h-5.5zM11.313 8.937v-5.5h1.375v5.5z'/%3E%3C/svg%3E");
  height: 23.38px;
}
::-webkit-scrollbar-button:horizontal:end:active {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='24' height='23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23fff' stroke='%23000' d='M23.19 22.19v-21H.81v21z'/%3E%3Cpath fill='%23000' d='M.685 21.69v-20h2v20zM11.312 21.315v-5.5h1.375v5.5zM5.811 15.815V8.94h11.002v6.875z'/%3E%3Cpath fill='%23000' d='M5.811 15.815h5.501v1.375H5.811zM18.189 13.065h1.375v1.375h-1.375zM19.564 11.69h1.375v1.375h-1.375zM11.312 3.44h1.375v1.375h-1.375zM12.688 4.815h1.375V8.94h-1.375zM14.063 6.19h1.375v2.75h-1.375zM15.438 7.565h1.375V8.94h-1.375zM16.814 8.94h1.375v1.375h-1.375zM18.189 10.315h1.375v2.75h-1.375zM16.814 10.315h1.375v5.5h-1.375zM15.438 15.815h1.375v1.375h-1.375zM14.063 15.815h1.375v2.75h-1.375zM12.688 15.815h1.375v4.125h-1.375zM11.312 19.94h1.375v1.375h-1.375zM5.811 7.565h5.501V8.94H5.811z'/%3E%3Cpath fill='%23000' d='M11.312 8.94v-5.5h1.375v5.5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  height: 23.38px;
}

body {
  background: linear-gradient(90deg, #fff 21px, transparent 1%) 50%,
    linear-gradient(#fff 21px, transparent 1%) 50%, #000;
  background-attachment: fixed;
  background-size: 22px 22px;
  min-height: 100vh;
  min-width: 100vw;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
a {
  color: #000;
  text-decoration: underline;
}
hr {
  border-top: 0.15em solid #000;
}
.heading,
h1 {
  font-size: 1em;
}
.heading,
h1,
h2 {
  font-family: Chicago;
}
h2 {
  font-size: 2em;
}
p, ol {
  font-family: Geneva;
}

di h1 {
  color: #0000 !important;
  background:
    linear-gradient(-90deg,#000 5px,#0000 0) 10px 0,
    linear-gradient(#000 0 0) 0 0;
  background-size:calc(20*1ch) 200%;
  -webkit-background-clip: text;
  background-clip: text;
  background-repeat:no-repeat;
  animation:
   t 3s steps(14) forwards;
}

di p, ol {
  color: #0000 !important;
  background:
    linear-gradient(-90deg,#000 5px,#0000 0) 5px 0,
    linear-gradient(#000 0 0) 0 0;
  background-size:calc(300*1ch) 200%;
  -webkit-background-clip: text;
  background-clip: text;
  background-repeat:no-repeat;
  animation:
   t calc(300*.04s) steps(300) forwards;
}

@keyframes t{
  0% {background-size:0 200%;}
  12% {background-size:0 200%;}
}
`

const Hack = ({ children }) => {
  return (
    <Fade>
      <Box
        as="a"
        href={`https://github.com/${children}`}
        sx={{ padding: '0px 8px', margin: 0, textDecoration: 'none' }}
      >
        @{children}
      </Box>
    </Fade>
  )
}

const Page = () => {
  const { data: hackers } = useSWR(
    'https://airbridge.hackclub.com/v0.1/Hackers%20Wanted/hackers',
    fetcher,
    { refreshInterval: 1000 }
  )

  console.log(hackers)

  const { data: session, status } = useSession()

  async function sign() {
    if (status == 'authenticated') {
      await fetch('/api/hackers-wanted', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Username: session.user.name,
          Email: session.user.email
        })
      })
    }
  }

  return (
    <>
      <ForceTheme theme="light" />
      <Meta
        as={Head}
        title="Hackers Wanted"
        description="The Hack Club community regularly gathers on Slack Huddles and Zoom calls to show off what we’re working on & hang out."
        image="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/52020-07-25_52g0nw40p2b00dh39mt93xq5ubku6yaj.jpeg"
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}
      >
        <Box
          className={styles.window}
          sx={{
            position: 'sticky',
            top: '18px',
            left: '18px',
            height: 'calc(100vh - 36px)',
            display: 'flex',
            minWidth: '200px',
            maxWidth: '250px'
            // overflow: 'scroll'
          }}
        >
          <Text className={styles.titlebar}>
            <Text className={styles.title} as="h1">
              <Image
                src="https://cloud-prhr6mr92-hack-club-bot.vercel.app/0dither_it_flag-standalone-bw__5___1_.png"
                layout="responsive"
                width={50}
                sx={{ textAlign: 'center' }}
              />
            </Text>
          </Text>
          <Box className={styles.separator}>
            <Box className={styles.windowpane} sx={{ minWidth: '200px' }}>
              {/* {session ? (
              //   <button
              //   className={styles.btn}
              //   onClick={() => {
              //     signOut()
              //   }}
              // >
              //   Sign out
              // </button>
              " "
              ) : ( */}
              {/* )} */}
              <Text as="p" className={styles.hackers}>
                <button
                  className={styles.btn}
                  onClick={() => {
                    signIn('github')
                    sign()
                  }}
                  sx={{
                    my: 2
                  }}
                >
                  Sign
                </button>
                <Text sx={{fontSize: '1.1em', fontFamily: 'Chicago', display: 'block'}}>With love,</Text>
                <Flex sx={{ flexWrap: 'wrap' }}>
                  {hackers &&
                    hackers.map(e => <Hack>{e.fields.username}</Hack>)}
                </Flex>
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          className={styles.standarddialog}
          sx={{
            marginTop: '18px',
            marginBottom: '18px',
            marginRight: '20px',
            flex: 1
          }}
        >
          <Box as="di">
            <Hackers />
          </Box>
        </Box>
      </Box>
      <style>{styled}</style>
    </>
  )
}

export default Page
