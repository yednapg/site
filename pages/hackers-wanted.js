import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Flex,
  Heading,
  Image,
  Link,
  Text
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import NextLink from 'next/link'
import Nav from '../components/nav'
import SlideDown from '../components/slide-down'
import FadeIn from '../components/fade-in'
import Icon from '../components/icon'
import Footer from '../components/footer'
import { keyframes } from '@emotion/react'
import Hackers from '../components/hackers-wanted/letter.mdx'
import ForceTheme from '../components/force-theme'
import { useEffect, useState } from 'react'
import anime from 'animejs/lib/anime.es.js'
import Fade from 'react-reveal/Fade'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import { useSession, getSession, signIn, signOut } from 'next-auth/react'
import Draggable from 'react-draggable'

/** @jsxImportSource theme-ui */

// cursor credits to https://linear.app/change

const styled = `
body {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23000' d='M8 5h1v1H8z'/%3E%3Cpath fill='%23fff' d='M8 4h1v1H8z'/%3E%3Cpath fill='%23000' d='M8 6h1v1H8zM8 7h1v1H8zM8 8h1v1H8zM8 9h1v1H8zM8 10h1v1H8zM8 11h1v1H8zM8 12h1v1H8zM8 13h1v1H8zM8 14h1v1H8z'/%3E%3Cpath fill='%23000' d='M8 15h1v1H8z' opacity='.8'/%3E%3Cpath fill='%23fff' d='M8 16h1v1H8zM7 5h1v1H7zM7 4h1v1H7zM7 6h1v1H7zM7 7h1v1H7zM7 8h1v1H7zM7 9h1v1H7zM7 10h1v1H7zM7 11h1v1H7zM7 12h1v1H7zM7 13h1v1H7zM7 14h1v1H7zM7 15h1v1H7zM9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M9 6h1v1H9zM9 7h1v1H9zM9 8h1v1H9zM9 9h1v1H9zM9 10h1v1H9zM9 11h1v1H9zM9 12h1v1H9zM9 13h1v1H9zM9 14h1v1H9z'/%3E%3Cpath fill='%23fff' d='M9 15h1v1H9zM10 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M10 7h1v1h-1zM10 8h1v1h-1zM10 9h1v1h-1zM10 10h1v1h-1zM10 11h1v1h-1zM10 12h1v1h-1zM10 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M10 14h1v1h-1zM11 7h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 8h1v1h-1zM11 9h1v1h-1zM11 10h1v1h-1zM11 11h1v1h-1zM11 12h1v1h-1zM11 13h1v1h-1zM11 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M11 15h1v1h-1zM11 16h1v1h-1zM12 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M12 9h1v1h-1zM12 10h1v1h-1zM12 11h1v1h-1zM12 12h1v1h-1zM12 13h1v1h-1zM12 14h1v1h-1zM12 15h1v1h-1zM12 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 17h1v1h-1zM12 18h1v1h-1zM13 9h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 10h1v1h-1zM13 11h1v1h-1zM13 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 13h1v1h-1zM13 14h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 15h1v1h-1zM13 16h1v1h-1zM13 17h1v1h-1zM13 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 19h1v1h-1zM14 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M14 11h1v1h-1zM14 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M14 13h1v1h-1zM14 15h1v1h-1zM14 16h1v1h-1z'/%3E%3Cpath fill='%23000' d='M14 17h1v1h-1zM14 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M14 19h1v1h-1zM15 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M15 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 13h1v1h-1zM15 17h1v1h-1zM15 18h1v1h-1zM16 12h1v1h-1zM16 13h1v1h-1z'/%3E%3C/svg%3E") 7 4, default;
}
h1 {
  font-family: Terminal_Grotesk;
  font-weight: 400;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23000' d='M8 4h1v1H8zM9 4h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 4h1v1h-1zM12 4h1v1h-1zM13 3h1v1h-1zM14 3h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 4h1v1h-1zM14 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 4h1v1h-1zM8 5h1v1H8zM7 4h1v1H7zM8 3h1v1H8zM9 3h1v1H9zM9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M11 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M12 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 5h1v1h-1zM14 5h1v1h-1zM9 6h1v1H9zM10 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 6h1v1h-1zM13 6h1v1h-1zM10 7h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 7h1v1h-1zM10 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 8h1v1h-1zM10 9h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 9h1v1h-1zM10 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 10h1v1h-1zM10 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 11h1v1h-1zM10 12h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 12h1v1h-1zM10 13h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 13h1v1h-1zM10 14h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 14h1v1h-1zM10 15h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 15h1v1h-1zM10 16h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 16h1v1h-1zM10 17h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 17h1v1h-1zM9 18h1v1H9zM8 18h1v1H8zM7 19h1v1H7z'/%3E%3Cpath fill='%23000' d='M10 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 18h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M12 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 18h1v1h-1zM14 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M8 19h1v1H8zM9 19h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 19h1v1h-1zM11 18h1v1h-1zM12 19h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 19h1v1h-1zM14 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 19h1v1h-1zM9 20h1v1H9zM8 20h1v1H8zM13 20h1v1h-1zM14 20h1v1h-1z'/%3E%3C/svg%3E") 7 3, text;
}

h3 {
  font-family: Space_Grotesk;
  font-weight: 400;
  line-height: 1.3;
}

h4 {
  font-family: Terminal_Grotesk;
  font-weight: 400;
  font-size: 1.5em;
}

button {
  font-family: Terminal_Grotesk;
}

a, p, ol {
  font-family: Space_Grotesk;
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23000' d='M8 4h1v1H8zM9 4h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 4h1v1h-1zM12 4h1v1h-1zM13 3h1v1h-1zM14 3h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 4h1v1h-1zM14 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 4h1v1h-1zM8 5h1v1H8zM7 4h1v1H7zM8 3h1v1H8zM9 3h1v1H9zM9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M11 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M12 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 5h1v1h-1zM14 5h1v1h-1zM9 6h1v1H9zM10 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 6h1v1h-1zM13 6h1v1h-1zM10 7h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 7h1v1h-1zM10 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 8h1v1h-1zM10 9h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 9h1v1h-1zM10 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 10h1v1h-1zM10 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 11h1v1h-1zM10 12h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 12h1v1h-1zM10 13h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 13h1v1h-1zM10 14h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 14h1v1h-1zM10 15h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 15h1v1h-1zM10 16h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 16h1v1h-1zM10 17h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 17h1v1h-1zM9 18h1v1H9zM8 18h1v1H8zM7 19h1v1H7z'/%3E%3Cpath fill='%23000' d='M10 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 18h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M12 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 18h1v1h-1zM14 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M8 19h1v1H8zM9 19h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 19h1v1h-1zM11 18h1v1h-1zM12 19h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 19h1v1h-1zM14 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 19h1v1h-1zM9 20h1v1H9zM8 20h1v1H8zM13 20h1v1h-1zM14 20h1v1h-1z'/%3E%3C/svg%3E") 7 3, text;
  line-height: 1.3;
}

button, a {
  cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M7 4h1v1H7zM8 4h1v1H8zM10 4h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 4h1v1h-1zM12 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 4h1v1h-1zM12 3h1v1h-1zM11 3h1v1h-1zM14 4h1v1h-1zM15 4h1v1h-1zM6 5h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 5h1v1H7zM8 5h1v1H8z'/%3E%3Cpath fill='%23fff' d='M9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 5h1v1h-1zM12 5h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M13 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M16 5h1v1h-1zM5 6h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 6h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 6h1v1H7zM8 6h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M9 6h1v1H9zM10 6h1v1h-1zM13 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M14 6h1v1h-1zM15 6h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 6h1v1h-1zM18 6h1v1h-1zM5 7h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 7h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 7h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M9 7h1v1H9zM10 7h1v1h-1zM13 7h1v1h-1zM16 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 7h1v1h-1zM6 8h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 8h1v1H7z'/%3E%3Cpath fill='%23000' d='M9 8h1v1H9z' opacity='.1'/%3E%3Cpath fill='%23000' d='M10 8h1v1h-1zM13 8h1v1h-1zM16 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M17 8h1v1h-1zM18 8h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M19 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 8h1v1h-1zM18 8h1v1h-1zM17 8h1v1h-1zM18 9h1v1h-1zM17 9h1v1h-1zM18 10h1v1h-1zM17 10h1v1h-1zM18 11h1v1h-1zM17 11h1v1h-1zM17 12h1v1h-1zM17 13h1v1h-1zM17 14h1v1h-1zM6 9h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 9h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 9h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M10 9h1v1h-1zM13 9h1v1h-1zM16 9h1v1h-1zM19 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 9h1v1h-1zM4 10h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 10h1v1H5zM6 10h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 10h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M8 10h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 10h1v1H9zM10 10h1v1h-1zM13 10h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 10h1v1h-1zM19 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M4 11h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 11h1v1H5zM6 11h1v1H6z' opacity='.1'/%3E%3Cpath fill='%23000' d='M7 11h1v1H7zM8 11h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 11h1v1H9zM16 11h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23fff' d='M16 11h1v1h-1zM16 12h1v1h-1zM16 13h1v1h-1zM16 14h1v1h-1zM16 15h1v1h-1zM16 16h1v1h-1zM15 16h1v1h-1zM15 17h1v1h-1zM14 17h1v1h-1zM13 17h1v1h-1zM12 17h1v1h-1zM11 17h1v1h-1zM10 17h1v1h-1zM10 16h1v1h-1zM10 15h1v1h-1zM10 14h1v1h-1zM10 13h1v1h-1zM10 12h1v1h-1zM10 11h1v1h-1zM10 10h1v1h-1zM9 10h1v1H9zM9 11h1v1H9zM9 12h1v1H9zM9 13h1v1H9zM9 14h1v1H9zM9 15h1v1H9zM8 15h1v1H8zM8 14h1v1H8zM7 14h1v1H7zM7 13h1v1H7zM7 12h1v1H7zM6 12h1v1H6zM5 12h1v1H5zM5 11h1v1H5zM6 11h1v1H6zM7 10h1v1H7zM8 9h1v1H8zM8 8h1v1H8zM8 7h1v1H8zM8 6h1v1H8zM7 6h1v1H7zM7 7h1v1H7zM6 13h1v1H6zM8 13h1v1H8zM9 16h1v1H9zM9 9h1v1H9zM9 8h1v1H9zM11 10h1v1h-1zM11 11h1v1h-1zM11 12h1v1h-1zM11 13h1v1h-1zM11 14h1v1h-1zM11 15h1v1h-1zM11 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1zM14 16h1v1h-1zM14 15h1v1h-1zM14 14h1v1h-1zM14 13h1v1h-1zM14 12h1v1h-1zM14 11h1v1h-1zM14 10h1v1h-1zM14 9h1v1h-1zM14 8h1v1h-1zM14 7h1v1h-1zM14 6h1v1h-1zM13 15h1v1h-1zM13 14h1v1h-1zM13 13h1v1h-1zM13 12h1v1h-1zM13 11h1v1h-1zM13 10h1v1h-1zM12 15h1v1h-1zM12 14h1v1h-1zM12 13h1v1h-1zM12 12h1v1h-1zM12 11h1v1h-1zM12 10h1v1h-1zM12 9h1v1h-1zM12 8h1v1h-1zM12 7h1v1h-1zM12 6h1v1h-1zM12 5h1v1h-1zM11 5h1v1h-1zM11 6h1v1h-1zM11 7h1v1h-1zM11 8h1v1h-1zM11 9h1v1h-1zM15 15h1v1h-1zM15 14h1v1h-1zM15 13h1v1h-1zM15 12h1v1h-1zM15 11h1v1h-1zM15 10h1v1h-1zM15 9h1v1h-1zM15 8h1v1h-1zM15 7h1v1h-1zM15 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M19 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M4 12h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 12h1v1H5zM7 12h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M8 12h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 12h1v1H9zM17 12h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 12h1v1h-1zM4 13h1v1H4zM3 12h1v1H3zM3 11h1v1H3z'/%3E%3Cpath fill='%23000' d='M5 13h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 13h1v1H6zM8 13h1v1H8zM17 13h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 13h1v1h-1zM5 14h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 14h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 14h1v1H7zM17 14h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 14h1v1h-1zM6 15h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 15h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 15h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M17 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 15h1v1h-1zM7 16h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 16h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 16h1v1H9zM16 16h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M17 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 16h1v1h-1zM7 17h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 17h1v1H8zM9 17h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 17h1v1h-1zM11 17h1v1h-1zM12 17h1v1h-1zM13 17h1v1h-1zM14 17h1v1h-1zM15 17h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 17h1v1h-1zM17 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 17h1v1h-1zM8 18h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 18h1v1H9zM10 18h1v1h-1zM11 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM14 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 18h1v1h-1zM8 19h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 19h1v1H9zM10 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM13 19h1v1h-1zM14 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 19h1v1h-1zM9 20h1v1H9zM10 20h1v1h-1zM11 20h1v1h-1zM12 20h1v1h-1zM13 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1z'/%3E%3C/svg%3E") 5 4, grab;
}

#modal {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M7 4h1v1H7zM8 4h1v1H8zM10 4h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 4h1v1h-1zM12 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 4h1v1h-1zM12 3h1v1h-1zM11 3h1v1h-1zM14 4h1v1h-1zM15 4h1v1h-1zM6 5h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 5h1v1H7zM8 5h1v1H8z'/%3E%3Cpath fill='%23fff' d='M9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 5h1v1h-1zM12 5h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M13 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M16 5h1v1h-1zM5 6h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 6h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 6h1v1H7zM8 6h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M9 6h1v1H9zM10 6h1v1h-1zM13 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M14 6h1v1h-1zM15 6h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 6h1v1h-1zM18 6h1v1h-1zM5 7h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 7h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 7h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M9 7h1v1H9zM10 7h1v1h-1zM13 7h1v1h-1zM16 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 7h1v1h-1zM6 8h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 8h1v1H7z'/%3E%3Cpath fill='%23000' d='M9 8h1v1H9z' opacity='.1'/%3E%3Cpath fill='%23000' d='M10 8h1v1h-1zM13 8h1v1h-1zM16 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M17 8h1v1h-1zM18 8h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M19 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 8h1v1h-1zM18 8h1v1h-1zM17 8h1v1h-1zM18 9h1v1h-1zM17 9h1v1h-1zM18 10h1v1h-1zM17 10h1v1h-1zM18 11h1v1h-1zM17 11h1v1h-1zM17 12h1v1h-1zM17 13h1v1h-1zM17 14h1v1h-1zM6 9h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 9h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 9h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M10 9h1v1h-1zM13 9h1v1h-1zM16 9h1v1h-1zM19 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 9h1v1h-1zM4 10h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 10h1v1H5zM6 10h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 10h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M8 10h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 10h1v1H9zM10 10h1v1h-1zM13 10h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 10h1v1h-1zM19 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M4 11h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 11h1v1H5zM6 11h1v1H6z' opacity='.1'/%3E%3Cpath fill='%23000' d='M7 11h1v1H7zM8 11h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 11h1v1H9zM16 11h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23fff' d='M16 11h1v1h-1zM16 12h1v1h-1zM16 13h1v1h-1zM16 14h1v1h-1zM16 15h1v1h-1zM16 16h1v1h-1zM15 16h1v1h-1zM15 17h1v1h-1zM14 17h1v1h-1zM13 17h1v1h-1zM12 17h1v1h-1zM11 17h1v1h-1zM10 17h1v1h-1zM10 16h1v1h-1zM10 15h1v1h-1zM10 14h1v1h-1zM10 13h1v1h-1zM10 12h1v1h-1zM10 11h1v1h-1zM10 10h1v1h-1zM9 10h1v1H9zM9 11h1v1H9zM9 12h1v1H9zM9 13h1v1H9zM9 14h1v1H9zM9 15h1v1H9zM8 15h1v1H8zM8 14h1v1H8zM7 14h1v1H7zM7 13h1v1H7zM7 12h1v1H7zM6 12h1v1H6zM5 12h1v1H5zM5 11h1v1H5zM6 11h1v1H6zM7 10h1v1H7zM8 9h1v1H8zM8 8h1v1H8zM8 7h1v1H8zM8 6h1v1H8zM7 6h1v1H7zM7 7h1v1H7zM6 13h1v1H6zM8 13h1v1H8zM9 16h1v1H9zM9 9h1v1H9zM9 8h1v1H9zM11 10h1v1h-1zM11 11h1v1h-1zM11 12h1v1h-1zM11 13h1v1h-1zM11 14h1v1h-1zM11 15h1v1h-1zM11 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1zM14 16h1v1h-1zM14 15h1v1h-1zM14 14h1v1h-1zM14 13h1v1h-1zM14 12h1v1h-1zM14 11h1v1h-1zM14 10h1v1h-1zM14 9h1v1h-1zM14 8h1v1h-1zM14 7h1v1h-1zM14 6h1v1h-1zM13 15h1v1h-1zM13 14h1v1h-1zM13 13h1v1h-1zM13 12h1v1h-1zM13 11h1v1h-1zM13 10h1v1h-1zM12 15h1v1h-1zM12 14h1v1h-1zM12 13h1v1h-1zM12 12h1v1h-1zM12 11h1v1h-1zM12 10h1v1h-1zM12 9h1v1h-1zM12 8h1v1h-1zM12 7h1v1h-1zM12 6h1v1h-1zM12 5h1v1h-1zM11 5h1v1h-1zM11 6h1v1h-1zM11 7h1v1h-1zM11 8h1v1h-1zM11 9h1v1h-1zM15 15h1v1h-1zM15 14h1v1h-1zM15 13h1v1h-1zM15 12h1v1h-1zM15 11h1v1h-1zM15 10h1v1h-1zM15 9h1v1h-1zM15 8h1v1h-1zM15 7h1v1h-1zM15 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M19 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M4 12h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 12h1v1H5zM7 12h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M8 12h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 12h1v1H9zM17 12h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 12h1v1h-1zM4 13h1v1H4zM3 12h1v1H3zM3 11h1v1H3z'/%3E%3Cpath fill='%23000' d='M5 13h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 13h1v1H6zM8 13h1v1H8zM17 13h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 13h1v1h-1zM5 14h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 14h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 14h1v1H7zM17 14h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 14h1v1h-1zM6 15h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 15h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 15h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M17 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 15h1v1h-1zM7 16h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 16h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 16h1v1H9zM16 16h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M17 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 16h1v1h-1zM7 17h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 17h1v1H8zM9 17h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 17h1v1h-1zM11 17h1v1h-1zM12 17h1v1h-1zM13 17h1v1h-1zM14 17h1v1h-1zM15 17h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 17h1v1h-1zM17 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 17h1v1h-1zM8 18h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 18h1v1H9zM10 18h1v1h-1zM11 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM14 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 18h1v1h-1zM8 19h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 19h1v1H9zM10 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM13 19h1v1h-1zM14 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 19h1v1h-1zM9 20h1v1H9zM10 20h1v1h-1zM11 20h1v1h-1zM12 20h1v1h-1zM13 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1z'/%3E%3C/svg%3E") 5 4, grab;
}

input, input::placeholder {
  font-family: Space_Grotesk;
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23000' d='M8 4h1v1H8zM9 4h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 4h1v1h-1zM12 4h1v1h-1zM13 3h1v1h-1zM14 3h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 4h1v1h-1zM14 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 4h1v1h-1zM8 5h1v1H8zM7 4h1v1H7zM8 3h1v1H8zM9 3h1v1H9zM9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M11 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M12 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 5h1v1h-1zM14 5h1v1h-1zM9 6h1v1H9zM10 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 6h1v1h-1zM13 6h1v1h-1zM10 7h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 7h1v1h-1zM10 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 8h1v1h-1zM10 9h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 9h1v1h-1zM10 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 10h1v1h-1zM10 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 11h1v1h-1zM10 12h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 12h1v1h-1zM10 13h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 13h1v1h-1zM10 14h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 14h1v1h-1zM10 15h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 15h1v1h-1zM10 16h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 16h1v1h-1zM10 17h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 17h1v1h-1zM9 18h1v1H9zM8 18h1v1H8zM7 19h1v1H7z'/%3E%3Cpath fill='%23000' d='M10 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 18h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M12 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 18h1v1h-1zM14 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M8 19h1v1H8zM9 19h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 19h1v1h-1zM11 18h1v1h-1zM12 19h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 19h1v1h-1zM14 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 19h1v1h-1zM9 20h1v1H9zM8 20h1v1H8zM13 20h1v1h-1zM14 20h1v1h-1z'/%3E%3C/svg%3E") 7 3, text;
}

// ::-webkit-scrollbar {
//   background-color: #000;
//   width: 22px;
// }
// ::-webkit-scrollbar-track {
//   background: linear-gradient(
//       45deg,
//       #fff 25%,
//       transparent 0,
//       transparent 75%,
//       #fff 0,
//       #fff
//     ),
//     linear-gradient(
//       45deg,
//       #fff 25%,
//       transparent 0,
//       transparent 75%,
//       #fff 0,
//       #fff
//     );
//   background-color: #000;
//   background-position: 0 0, 2px 2px;
//   background-size: 4px 4px;
//   border-left: 3px solid #fff;
//   width: 10px;
// }
// ::-webkit-scrollbar-thumb {
//   background-color: #000;
//   border: 2px solid #fff;
//   border-right: none;
//   box-sizing: content-box;
//   width: 20px;
// }

// ::-webkit-scrollbar-button:vertical:end:increment,
// ::-webkit-scrollbar-button:vertical:start:decrement {
//   display: block;
// }
// ::-webkit-scrollbar-button:vertical:start {
//   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='22' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' stroke='%23fff' d='M.5.5h21v22.375H.5z'/%3E%3Cpath fill='%23fff' d='M1 23h20v-2H1zM1.375 12.375h5.5V11h-5.5zM6.875 17.875h6.875V16.5H6.875zM6.875 17.875v-5.5H5.5v5.5zM9.625 5.5V4.125H8.25V5.5zM11 4.125V2.75H9.625v1.375zM19.25 12.375V11h-1.375v1.375zM17.875 11V9.625H16.5V11zM16.5 9.625V8.25h-1.375v1.375zM15.125 8.25V6.875H13.75V8.25zM13.75 6.875V5.5h-1.375v1.375zM12.375 5.5V4.125H11V5.5zM8.25 6.875V5.5H6.875v1.375zM6.875 8.25V6.875H5.5V8.25zM5.5 9.625V8.25H4.125v1.375zM4.125 11V9.625H2.75V11z'/%3E%3Cpath fill='%23fff' d='M2.75 12.375V11H1.375v1.375zM15.125 17.875v-5.5H13.75v5.5zM13.75 12.375h5.5V11h-5.5z'/%3E%3C/svg%3E");
//   background-repeat: no-repeat;
//   height: 23.38px;
// }
// ::-webkit-scrollbar-button:vertical:start:active {
//   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='22' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' stroke='%23fff' d='M.5.5h21v22.38H.5z'/%3E%3Cpath fill='%23fff' d='M1 23.005h20v-2H1zM1.375 12.378h5.5v-1.375h-5.5zM6.875 17.879h6.875V6.877H6.875zM6.875 17.879v-5.501H5.5v5.5zM9.625 5.501V4.126H8.25v1.375zM11 4.126V2.75H9.625v1.375zM19.25 12.378v-1.375h-1.375v1.375zM17.875 11.002V9.627H13.75v1.375zM16.5 9.627V8.252h-2.75v1.375zM15.125 8.252V6.877H13.75v1.375zM13.75 6.876V5.501h-1.375v1.375zM12.375 5.501V4.126h-2.75v1.375zM12.375 6.876V5.501h-5.5v1.375zM6.875 8.252V6.877H5.5v1.375zM6.875 9.627V8.252h-2.75v1.375zM6.875 11.002V9.627H2.75v1.375z'/%3E%3Cpath fill='%23fff' d='M2.75 12.378v-1.375H1.375v1.375zM15.125 17.879v-5.501H13.75v5.5zM13.75 12.378h5.5v-1.375h-5.5z'/%3E%3C/svg%3E");
//   background-repeat: no-repeat;
//   height: 23.38px;
// }
// ::-webkit-scrollbar-button:vertical:end {
//   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='22' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' stroke='%23fff' d='M.5 22.875h21V.5H.5z'/%3E%3Cpath fill='%23fff' d='M1 .375h20v2H1zM1.375 11h5.5v1.375h-5.5zM6.875 5.5h6.875v1.375H6.875zM6.875 5.5V11H5.5V5.5zM9.625 17.875v1.375H8.25v-1.375zM11 19.25v1.375H9.625V19.25zM19.25 11v1.375h-1.375V11zM17.875 12.375v1.375H16.5v-1.375zM16.5 13.75v1.375h-1.375V13.75zM15.125 15.125V16.5H13.75v-1.375zM13.75 16.5v1.375h-1.375V16.5zM12.375 17.875v1.375H11v-1.375zM8.25 16.5v1.375H6.875V16.5zM6.875 15.125V16.5H5.5v-1.375zM5.5 13.75v1.375H4.125V13.75zM4.125 12.375v1.375H2.75v-1.375z'/%3E%3Cpath fill='%23fff' d='M2.75 11v1.375H1.375V11zM15.125 5.5V11H13.75V5.5zM13.75 11h5.5v1.375h-5.5z'/%3E%3C/svg%3E");
//   height: 23.38px;
// }
// ::-webkit-scrollbar-button:vertical:end:active {
//   background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='22' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23000' stroke='%23fff' d='M.5 22.88h21V.5H.5z'/%3E%3Cpath fill='%23fff' d='M1 .375h20v2H1zM1.375 11.002h5.5v1.375h-5.5zM6.875 5.501h6.875v11.002H6.875zM6.875 5.501v5.501H5.5v-5.5zM9.625 17.879v1.375H8.25v-1.375zM11 19.254v1.375H9.625v-1.375zM19.25 11.002v1.375h-1.375v-1.375zM17.875 12.378v1.375H13.75v-1.375zM16.5 13.753v1.375h-2.75v-1.375zM15.125 15.128v1.375H13.75v-1.375zM13.75 16.503v1.375h-1.375v-1.375zM12.375 17.879v1.375h-2.75v-1.375zM12.375 16.503v1.375h-5.5v-1.375zM6.875 15.128v1.375H5.5v-1.375zM6.875 13.753v1.375h-2.75v-1.375zM6.875 12.378v1.375H2.75v-1.375z'/%3E%3Cpath fill='%23fff' d='M2.75 11.002v1.375H1.375v-1.375zM15.125 5.501v5.501H13.75v-5.5zM13.75 11.002h5.5v1.375h-5.5z'/%3E%3C/svg%3E");
//   background-repeat: no-repeat;
//   height: 23.38px;
// }
`

const CTA = ({ image, text, link, click, ...props }) => {
  return (
    <Box
      sx={{
        width: '140px',
        height: '50px',
        background: 'dark',
        borderImage:
          'url("https://cloud-hu95ojn44-hack-club-bot.vercel.app/0button_1.svg") 20',
        borderWidth: '10px',
        borderStyle: 'solid',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        position: 'relative',
        color: 'white',
        transitionDuration: '300ms',
        boxShadow: '0px 3px white',
        fontSize: '70%',
        opacity: 0,
        gap: 2,
        textDecoration: 'none',
        '&:active': {
          transform: 'translateY(4px)',
          boxShadow: 'none'
        },
        '&:hover:not(:active)': {
          transform: 'scale(1.05)'
        }
        // '&:active::before': {
        //   content: 'none'
        // }
      }}
      as={link ? 'a' : 'button'}
      href={link || ''}
      target="_blank"
      {...props}
    >
      <img src={image} sx={{ width: '25px' }} />
      <Text as="h4" sx={{textAlign: 'left'}}>{text}</Text>
    </Box>
  )
}

const Hack = ({ children, delay, ...props }) => {
  return (
    <Fade sx={{ margin: 0 }} delay={delay}>
      <Box
        as="a"
        href={`https://github.com/${children}`}
        sx={{ px: 1, margin: 0, textDecoration: 'none', color: 'inherit' }}
        {...props}
      >
        @{children}
      </Box>
    </Fade>
  )
}

const Page = () => {
  const [scrolled, setScrolled] = useState(false)

  const { data: hackers } = useSWR(
    'https://airbridge.hackclub.com/v0.1/Hackers%20Wanted/hackers',
    fetcher,
    { refreshInterval: 1000 }
  )

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

  useEffect(() => {
    const onScroll = () => {
      const newState = window.scrollY >= 16
      setScrolled(newState)
      console.log(scrolled)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (scrolled) {
      anime.timeline().add({
        targets: '#nav',
        duration: 8000,
        opacity: 0
      })
      anime
        .timeline()
        .add({
          targets: '#cta1',
          duration: 500,
          opacity: 1
        })
        .add({
          targets: '#cta2',
          duration: 500,
          opacity: 1
        })
        .add({
          targets: '#cta3',
          duration: 500,
          opacity: 1
        })
        .add({
          targets: '#cta4',
          duration: 500,
          opacity: 1
        })
    } else {
      anime.timeline().add({
        targets: '#nav',
        duration: 8000,
        opacity: 1
      })
    }
  }, [scrolled])

  function displayModal() {
    document.getElementById('modal').style.display = 'flex'
  }

  function closeModal() {
    document.getElementById('modal').style.display = 'none'
  }

  return (
    <>
      <Meta
        as={Head}
        title="Hackers Wanted"
        description="TO FILL"
        image="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/52020-07-25_52g0nw40p2b00dh39mt93xq5ubku6yaj.jpeg"
      />
      <Nav
        color="white"
        sx={{
          // fontFamily: 'Terminal_Grotesk !important',
          backgroundColor: 'transparent !important',
          opacity: 0.5,
          zIndex: '4 !important',
          borderBottom: 'none',
          backdropFilter: 'none !important',
          '& .css-77r3sa': {
            backgroundImage:
              'url("https://cloud-7fhx9zewb-hack-club-bot.vercel.app/0new_piskel-3.png.png")',
            animation: 'none'
          }
        }}
        dark="dark"
        id="nav"
      />
      <ForceTheme theme="dark" />
      <Box as="main" sx={{ position: 'relative' }}>
        <Box
        id="bottomFade"
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            zIndex: 3,
            width: '100vw',
            '&::before': {
              background: 'linear-gradient(transparent, #17171d)',
              content: '" "',
              width: '100%',
              height: '70px',
              display: 'block'
            }
          }}
        >
        </Box>
        <Box
          sx={{
            backgroundRepeat: 'repeat',
            width: '100vw',
            textAlign: 'center',
            height: '45vh',
            background: 'radial-gradient(#fff 1px,transparent 1px)',
            backgroundSize: '24px 24px',
            position: 'sticky',
            top: '-44vh',
            mb: 4,
            zIndex: 3,
            '&::before': {
              background: 'linear-gradient(#17171d, transparent)',
              content: '" "',
              width: '100%',
              height: '30%',
              display: 'block'
            },
            '&::after': {
              background: 'linear-gradient(transparent, #17171d, transparent)',
              content: '" "',
              width: '100%',
              height: '40%',
              display: 'block',
              transform: 'translateY(-135%)'
              // backdropFilter: 'blur(2px)'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              // flexDirection: 'column',
              // justifyContent: 'center',
              alignItems: 'center',
              width: '90vw',
              maxWidth: [null, 'layout'],
              margin: 'auto',
              height: '100%',
              transform: 'translateY(-15vh)'
            }}
          >
            <Box
              sx={{
                textAlign: 'left',
                borderRadius: '100%',
                background: '#17171d',
                boxShadow: '0 0 50vw 10vh #17171d'
              }}
            >
              <Fade delay={100}>
                <Text
                  as="h1"
                  sx={{ fontSize: '5em', display: 'block', lineHeight: '1' }}
                >
                  Hackers Wanted
                </Text>
              </Fade>
              <Fade delay={200}>
                <Text as="h3" sx={{ display: 'block' }}>
                  An expression of the Hack Club Philosophy
                </Text>
              </Fade>
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'relative' }}>
          
          <Draggable>
            <Box
              id="modal"
              sx={{
                display: 'none',
                flexDirection: 'column',
                maxWidth: '500px',
                width: '90vw',
                margin: 'auto',
                position: 'absolute',
                p: 4,
                background: '#000',
                color: 'white',
                zIndex: 100,
                borderImage:
                  'url("https://cloud-hu95ojn44-hack-club-bot.vercel.app/0button_1.svg") 20',
                borderWidth: '15px',
                borderStyle: 'solid'
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <h4 sx={{ my: 0 }}>Get a physical copy of this letter:</h4>
                <Box
                  sx={{
                    fontFamily: 'Terminal_Grotesk',
                    border: '2px solid white',
                    width: 'fit-content',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '-25px',
                    right: '-25px',
                    background: 'transparent',
                    color: 'white',
                    fontSize: '1em',
                    p: '0'
                  }}
                  onClick={closeModal}
                >
                  x
                </Box>
                <form
                  action="https://airtable-forms-proxy.hackclub.dev/api/appdPydXlWO2ZAhhV/address?redirect=https://site-git-hw.hackclub.dev/hackers-wanted"
                  id="form"
                  method="POST"
                >
                  <Box sx={{ my: 2 }}>
                    <label>Name:</label>
                    <input
                      type="text"
                      id="Name"
                      name="Name"
                      placeholder="Fiona Hackworth"
                      sx={{ ml: 2 }}
                      required
                    />
                  </Box>
                  <Box sx={{ my: 2 }}>
                    <label>Address (Line 1):</label>
                    <input
                      type="text"
                      id="Address1"
                      name="Address1"
                      placeholder="15 Hacks Rd"
                      sx={{ ml: 2 }}
                      required
                    />
                  </Box>
                  <Box sx={{ my: 2 }}>
                    <label>Address (Line 2):</label>
                    <input
                      type="text"
                      id="Address2"
                      name="Address2"
                      placeholder="-"
                      sx={{ ml: 2 }}
                    />
                  </Box>
                  <Flex sx={{ my: 2, gap: 2 }}>
                    <Flex sx={{ flexDirection: 'column' }}>
                      <label>City:</label>
                      <input
                        type="text"
                        id="City"
                        name="City"
                        placeholder="Makertown"
                        required
                      />
                    </Flex>
                    <Flex sx={{ flexDirection: 'column' }}>
                      <label>State:</label>
                      <input
                        type="text"
                        id="State"
                        name="State"
                        placeholder="Makertown"
                        required
                      />
                    </Flex>
                  </Flex>
                  <Flex sx={{ my: 2, gap: 2 }}>
                    <Flex sx={{ flexDirection: 'column' }}>
                      <label>Postal Code:</label>
                      <input
                        type="text"
                        id="Postal"
                        name="Postal"
                        placeholder="4225"
                        required
                      />
                    </Flex>
                    <Flex sx={{ flexDirection: 'column' }}>
                      <label>Country:</label>
                      <input
                        type="text"
                        id="Country"
                        name="Country"
                        placeholder="United States"
                        required
                      />
                    </Flex>
                  </Flex>
                  <button
                    sx={{
                      border: 'white 2.5px solid',
                      background: '#000',
                      color: 'white',
                      fontSize: '1.2em',
                      px: 2,
                      py: 1,
                      mt: 2,
                      '&:hover': {
                        color: '#000',
                        background: 'white'
                      }
                    }}
                  >
                    ship it to me
                  </button>
                </form>
              </Box>
            </Box>
          </Draggable>

          <Box
            sx={{
              width: '90vw',
              maxWidth: [null, 'layout'],
              margin: 'auto'
            }}
          >
            <Box
              id="letter"
              sx={{
                maxWidth: '700px',
                width: '100%',
                position: 'relative',
                pb: 5,
                '& p, li': {
                  my: 3
                }
              }}
            >
              <Fade bottom delay={60}>
                <Box as="p">
                  Some people are allergic to unthinking rules and outdated
                  systems. They want the world to be better, more magical, more
                  free. Some also have the creative energy to do something about
                  it—without the need for instructions, and without needing to
                  be asked. These people are hackers. This is our love letter to
                  them, on behalf of a society that’s long failed them.
                </Box>
              </Fade>
              <Fade bottom delay={90}>
                <Box as="p">
                  Some of us have always been overlooked, misunderstood,
                  underappreciated; looked at with wariness instead of wonder;
                  set aside instead of embraced.{' '}
                </Box>
              </Fade>
              <Fade bottom delay={120}>
                <Box as="p">
                  Throughout most of history, this has been the fate of the
                  hacker. Though no society has ever suffered from having too
                  many—and indeed many have failed their potential by nurturing
                  too few—we’ve been slow to free hackers to do great things.{' '}
                </Box>
              </Fade>
              <Fade bottom delay={150}>
                <Box as="p">
                  Hackers are doers. That’s their glory, and their stigma. While
                  there are no people more important to where we’re going, we’re
                  still in desperate need of more—far, far more.{' '}
                </Box>
              </Fade>
              <Fade bottom delay={180}>
                <Box as="p">
                  But for all their qualities—their drive, their ingenuity,
                  their stubborn persistence—hackers have a branding problem.
                  One that has more to do with us than them.
                </Box>
              </Fade>
              <Fade bottom delay={210}>
                <Box as="h4">Hackers aren’t the enemy. We are.</Box>
              </Fade>
              <Fade bottom delay={240}>
                <Box as="p">
                  Hollywood and headlines have long been unkind to hackers. The
                  popular image is of shadowy misfits who break into sensitive
                  networks to steal things or hold them hostage—or just to prove
                  that they can.
                </Box>
              </Fade>
              <Fade bottom delay={255}>
                <img
                  src="https://cloud-bn2bhadx4-hack-club-bot.vercel.app/0dither_it_screenshot_2023-04-26_at_5.43.45_pm.png"
                  sx={{ width: '100%' }}
                />
              </Fade>
              <Fade bottom delay={270}>
                <Box as="p">
                  It’s not that hackers don’t do those things, or that those who
                  do should have a different name. But when we distinguish
                  between good and bad hackers as “white hats” or “black hats”
                  we’re missing the more basic point: the bad ones are just
                  young people we failed, mostly by never asking them to do
                  something great.{' '}
                </Box>
              </Fade>
              <Fade bottom delay={300}>
                <Box as="p">
                  Hackers need challenges equal to their gifts, and
                  opportunities equal to their ambitions. Else they’ll grow
                  frustrated and find themselves throwing their talents at
                  whatever or whomever offers the most money or status—which can
                  lead them to dark and tragic places.{' '}
                </Box>
              </Fade>
              <Fade bottom delay={330}>
                <Box as="p">
                  But this is our problem as much as theirs. More, really.
                  Hackers are a precious natural resource, the lifeblood of our
                  best futures. While we can’t create or micromanage them, we
                  can—and must—support them in healthy directions.
                </Box>
              </Fade>
              <Fade bottom delay={380}>
                <Box as="h4">Why?</Box>
              </Fade>
              <Fade bottom delay={390}>
                <Box as="p">
                  Hackers run towards our hardest problems, with special energy
                  and creativity, without needing to be asked.
                </Box>
              </Fade>
              <Fade bottom delay={420}>
                <Box as="p">
                  Hackers, and really the hacker spirit, have long defied a
                  single definition—which we can see reflected in our language.
                  A project can be hacked together. An account can be hacked
                  into. One might hack away at a solution. And that solution, if
                  clever, might one day be called a hack. But different as these
                  things seem, there’s a common thread: a sense that there was
                  once something in the way—perhaps friction, or bureaucracy, or
                  groupthink—and now, thanks to the hacker’s work, that obstacle
                  is no longer there.
                </Box>
              </Fade>
              <Fade bottom delay={475}>
                <Box as="p">
                  Hackers are reimaginers, with an incurable bias towards what’s
                  simpler, faster, and better.
                </Box>
              </Fade>
              <Fade bottom delay={480}>
                <Box as="p">
                  The result can be beautiful or ugly, good or bad,
                  sophisticated or crude. To have the signature of a hacker it
                  merely has to make other clever people say “ah yes of course”.
                  Hacking is the magical ability to find the straightest line
                  between two points—in spite of all the obstacles in the way,
                  in spite of all the maps that say the best route is to go
                  around.
                </Box>
              </Fade>
              <Fade bottom delay={510}>
                <Box as="h4">A hacker has three essential qualities:</Box>
                <Box as="ol">
                  <Fade delay={515}>
                    <li>
                      They’re never quite an employee. They can be managed, but
                      rarely directed. They follow their own curiosity their own
                      way—always honestly, often infuriatingly—along with their
                      sense of taste for which problems are interesting and
                      which aren’t.
                    </li>
                  </Fade>
                  <Fade delay={520}>
                    <li>
                      Code is their employee. It does exactly what’s asked of
                      it, brilliantly, if also roughly at first. Elegance tends
                      to come after execution. The hacker’s great pleasure is to
                      look upon their creation like the god of the Old Testament
                      and say “behold, it works”.
                    </li>
                  </Fade>
                  <Fade delay={525}>
                    <li>
                      They’re bloodhounds for finding the better way to get
                      something done, driven by a creativity that astounds—and
                      often worries—those around them.{' '}
                    </li>
                  </Fade>
                </Box>
              </Fade>
              <Fade bottom delay={540}>
                <Box as="p">
                  A hacker is a romantic, a rebel with a most excellent cause:
                  making this world a little less closed off, a little less
                  boring, a little less designed by committee.
                </Box>
              </Fade>
              <Fade bottom delay={570}>
                <Box as="p">
                  A hacker believes in good mischief, in being a little loose
                  with the rules that don’t matter so as to improve the outcomes
                  that do.
                </Box>
              </Fade>
              <Fade bottom delay={600}>
                <Box as="p">
                  Indeed, a hacker prides themselves on being a bit unruly.
                  Because there is such a thing as ruly-ness, as being a slave
                  to How Things Are Done. Hackers hate this. Sometimes it comes
                  out in their appearance. Always it comes out in how they
                  attack problems.
                </Box>
              </Fade>
              <Fade bottom delay={630}>
                <Box as="p">
                  Hackers find unsolved challenges irresistible, which they hack
                  away at by repeatedly asking the smart questions—the hows, the
                  what ifs, the I wonders, the why nots—until they come up with
                  scrappy, ingenious, totally unexpected solutions that the
                  prematurely old among us lacked the energy and freedom to see
                  or throw ourselves at.
                </Box>
              </Fade>
              <Fade bottom delay={705}>
                <Box as="p">We need that. Badly. As we always have.</Box>
              </Fade>
              <Fade bottom delay={710}>
                <Box as="h4">Hackers belong to a proud lineage.</Box>
              </Fade>
              <Fade bottom delay={720}>
                <Box as="p">
                  There’s an unbroken chain of hackers stretching back to the
                  first tools. While hackers today mostly use code, in days past
                  they used hammers and lenses and slide rules—employing them in
                  novel combinations and ways that others just didn’t see.
                </Box>
              </Fade>
              <Fade bottom delay={750}>
                <Box as="p">
                  Gutenberg didn’t invent many—perhaps any—individual
                  component(s) of the printing press. The Catholic Church had
                  offered him salvation from bankruptcy, if only he could
                  produce paper indulgences some cheaper way. Soon enough he’d
                  reimagined how movable type and the pressure of a screw press
                  could be combined to outdo the work of a thousand monks.
                </Box>
              </Fade>
              <Fade bottom delay={780}>
                <Box as="p">
                  Sometimes it’s about using existing tools in novel ways; other
                  times it’s about making new ones, or just rethinking a bigger
                  picture that we wrongly assumed was fixed in place. The
                  internet—and Silicon Valley around it—was built by hackers who
                  used all those methods in turn. A few figured out the silicon
                  wafer, then a few more in a nearby garage figured out how to
                  pack more transistors. Then someone figured out a better way
                  to make a wafer company.
                </Box>
              </Fade>
              <Fade bottom delay={810}>
                <Box as="p">
                  Hackers can take many forms. All are programmers in some
                  right. But some want to build the next unicorn, some want to
                  just make some small corner of the world better, and some want
                  to use code to set something free. What unites them all is a
                  sense that a better future isn’t just possible; it’s possible
                  through them.
                </Box>
              </Fade>
              <Fade bottom delay={840}>
                <Box as="h4">If we don’t support hackers, we don’t grow.</Box>
              </Fade>
              <Fade bottom delay={870}>
                <Box as="p">
                  Coding is an actual superpower. It turns people from consumers
                  to creators; from those who engage with the world as it is to
                  those who reshape the world to something better.
                </Box>
              </Fade>
              <Fade bottom delay={900}>
                <Box as="p">
                  We’re in a creation drought as a society, and have been for a
                  while. Our young people are mostly building followings and
                  personas, not things.
                </Box>
              </Fade>
              <Fade bottom delay={930}>
                <Box as="p">
                  Building things is hard. Try to do something new—or to do an
                  old thing a new way—and you’ll get a quick education in That’s
                  Not How Things Are Done: the gravity well of committees and
                  process manuals and best practices that confuse caution for
                  wisdom.
                </Box>
              </Fade>
              <Fade bottom delay={960}>
                <Box as="p">
                  One of history’s great thinkers told a famous story about a
                  fence blocking a path, and how one type of reformer would just
                  destroy it while a wiser type would first ask why it was
                  built.
                </Box>
              </Fade>
              <Fade bottom delay={990}>
                <Box as="p">
                  The hacker would ask too. But the hacker would be less
                  persuaded by bad answers.
                </Box>
              </Fade>
              <Fade bottom delay={1020}>
                <Box as="h4">
                  We need to be willing to get out of their way.
                </Box>
              </Fade>
              <Fade bottom delay={1050}>
                <Box as="p">
                  Hackers don’t want, or need, to be guided much. They’ll
                  naturally experiment, explore, and tinker; always by working
                  backwards from big questions and first principles, not
                  forwards from second-hand maps that reflect yesterday’s
                  conditions and compromises.
                </Box>
              </Fade>
              <Fade bottom delay={1080}>
                <Box as="p">
                  Sometimes we struggle to allow them to, which is to our own
                  disadvantage. Even if we think their approaches won’t work,
                  we’re much better off for letting them try. At worst, they
                  discover something new about the problem. At best, they
                  actually go and solve them.
                </Box>
              </Fade>
              <Fade bottom delay={1110}>
                <Box as="p">
                  We should praise their spirit and offer them playgrounds for
                  it—that are non-hierarchical, merit-based, and permissionless.
                </Box>
              </Fade>
              <Fade bottom delay={1140}>
                <Box as="p">
                  But we don’t. And this starts very early on, thanks in part to
                  a school system designed to produce factory workers for a
                  bygone age. Most schools have become a bad simulation of real
                  life in the modern economy. They’re about performing success,
                  not actually wrestling the bits and atoms of the world into a
                  more sane and productive order.
                </Box>
              </Fade>
              <Fade bottom delay={1170}>
                <Box as="p">
                  This doesn’t need to be how you spend your teenage years.
                  There’s another path you can take, and another type of person
                  you can be.
                </Box>
              </Fade>
              <Fade bottom delay={1180}>
                <img
                  src="https://cloud-perha612p-hack-club-bot.vercel.app/0dither_it_img_5673.jpg"
                  sx={{ width: '100%' }}
                />
              </Fade>
              <Fade bottom delay={1200}>
                <Box as="p">
                  What colleges fear to admit is that they can’t identify top
                  talent from essays, scores, or interviews alone. If you want
                  to prove yourself—not just to them, but to the companies doing
                  the most interesting work in the world—you need to build. It
                  doesn’t matter what. It doesn’t matter when you start. It
                  matters that you start. And it’s easier in the company of
                  peers—who get you, who want to feed and feed off your energy,
                  who want to shine just as badly.
                </Box>
              </Fade>
              <Fade bottom delay={1250}>
                <Box as="p">
                  You can be a lone wolf sometimes. But you’ll go further in a
                  pack.
                </Box>
              </Fade>
              <Fade bottom delay={1270}>
                <Box as="p">
                  The young have much to learn together, and much to teach us.
                </Box>
              </Fade>
              <Fade bottom delay={1290}>
                <Box as="p">
                  Hackers can’t be taught really. They take ownership over their
                  own education. When they find an interesting problem, they
                  figure out what they need to learn and they pursue it with an
                  enthusiasm that we mostly know now only from long memory. We
                  can ensure that the available curriculum is good; we can’t
                  make them read it, nor determine how they’ll read it.
                </Box>
              </Fade>
              <Fade bottom delay={1320}>
                <Box as="p">
                  But this isn’t to say they aren’t teachable, at least in the
                  sense of taking direction and feedback. They just see the
                  world differently. As we should hope they do.
                </Box>
              </Fade>
              <Fade bottom delay={1350}>
                <Box as="p">
                  The great challenges of our times were shaped in part by our
                  past responses to them. If we truly want to solve them, we
                  need to be willing to turn them over to those who perceive
                  them differently, who can approach them from new angles, with
                  more energy and less baggage.
                </Box>
              </Fade>
              <Fade bottom delay={1380}>
                <Box as="p">Put another way, we need to let hackers hack.</Box>
              </Fade>
              <Fade bottom delay={1400}>
                <Box as="h4">
                  So consider this a giant sign in the window: Hackers Wanted.
                </Box>
              </Fade>
              <Fade bottom delay={1410}>
                <Box as="p">
                  We see you, whether you’re in a Bay Area garage or a rural
                  village that the rest of the world can’t find on the map. We
                  value you. We want to stand alongside you as you build
                  things—crazy, useful, beautiful things; things we may not even
                  understand until you teach us.
                </Box>
              </Fade>
              <Fade bottom delay={1440}>
                <Box as="p">The door is open.</Box>
              </Fade>
              <Fade bottom delay={1470}>
                <Box as="p">With love,</Box>
              </Fade>
              {/* <Fade bottom delay={1500}> */}
              <Flex sx={{ flexWrap: 'wrap', ml: -1 }}>
                {hackers &&
                  hackers.map((e, index) => (
                    <Hack
                      delay={300 + index * 50}
                      sx={{ opacity: `${index == 0 ? 1 : 5 / index}` }}
                    >
                      {e.fields.username}
                    </Hack>
                  ))}
              </Flex>
              <Flex
            sx={{
              flexDirection: 'column',
              position: 'sticky',
              gap: 2,
              width: 'fit-content',
              textAlign: 'right',
              top: '10px',
              right: 0
            }}
          >
            <CTA
              image="https://cloud-e59dqvwx6-hack-club-bot.vercel.app/0new_piskel-2.png__1_.png"
              text="sign "
              onClick={() => {
                signIn('github')
                sign()
              }}
              id="cta1"
            />
            <CTA
              image="https://cloud-178z6geau-hack-club-bot.vercel.app/0new_piskel-3.png__1_.png"
              text="ship a copy"
              id="cta2"
              onClick={() => displayModal()}
            />
            <CTA
              image="https://cloud-gbwqdsj6z-hack-club-bot.vercel.app/0new_piskel-4.png.png"
              text="meet other hackers"
              id="cta3"
            />
            <CTA
              image="https://cloud-h1dl2nqn7-hack-club-bot.vercel.app/0new_piskel-5.png.png"
              text="open source"
              id="cta4"
              link="https://github.com/hackclub"
            />
          </Flex>
              {/* </Fade> */}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer dark />
      <style>{styled}</style>
    </>
  )
}

// const asyncTimeout = (ms) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('resolved')
//     }, ms);
//   });
// };

// let i = 0;

// async function getThings() {
//   for (let i = 0; i < text.length; i++) {
//     para = document.createElement('p')
//     let e = text[i].innerHTML

//     function typeWriter() {
//       if (a < e.length) {
//         para.innerHTML += e.charAt(a)
//         console.log('typing...')
//         setTimeout(typeWriter, speed)
//         a++
//       }
//     }
//     typeWriter()
//     await asyncTimeout(text.length * speed)
//     group.appendChild(para)
//   }
// }

// getThings()

// console.log(text)

// console.log(text.length)

// console.log(text[1].innerHTML)

// let e = text[1].innerHTML

// function typeWriter() {
//   console.log(e.length)
//   if (a < e.length) {
//     para.innerHTML += e.charAt(a)
//     console.log('typing...')
//     setTimeout(typeWriter, speed)
//     a++
//   }
// }

// typeWriter()
// promise set timeout with the length

//   }

// useEffect(() => {
//   var speed = 5
//   let a = 0

//   let para
//   let text
//   let group

//   if (typeof window !== 'undefined') {
//     text = document.querySelectorAll('.css-l11det')
//     group = document.getElementById('text')
//     para = document.createElement('p')
//   }

//   function asyncTimeout(ms) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve('yay')
//       }, ms)
//     })
//   }

//   function typeWriter(e) {
//     console.log('it lives!')
//     if (a < e.length) {
//       para.innerHTML += e.charAt(a)
//       console.log('hi')
//       setTimeout(typeWriter, speed, e)
//       a++
//     }
//   }

//   async function things() {
//     for (let i = 0; i < text.length; i++) {
//       console.log(i)
//       para = document.createElement('p')
//       let e = text[i].innerHTML
//       a = 0
//       typeWriter(e)
//       console.log('hi')
//       group.appendChild(para)
//       await asyncTimeout(e.length * speed * 1.6)
//     }
//   }

//   things()
// }, [])

// useEffect(() => {
//   function resolveAfter2Seconds(x) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(x);
//       }, 2000);
//     });
//   }

//   async function f1() {
//     console.log('hii');
//     await resolveAfter2Seconds(10);
//     console.log('hi'); // 10
//   }

//   f1();
// })

export default Page
