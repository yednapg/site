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
import ForceTheme from '../components/force-theme'
import { useEffect, useState, useRef } from 'react'
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
    background: #17171d;
    color: #ffffff;
  }
  h1 {
    font-family: Terminal_Grotesk;
    font-weight: 400;
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23000' d='M8 4h1v1H8zM9 4h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 4h1v1h-1zM12 4h1v1h-1zM13 3h1v1h-1zM14 3h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 4h1v1h-1zM14 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 4h1v1h-1zM8 5h1v1H8zM7 4h1v1H7zM8 3h1v1H8zM9 3h1v1H9zM9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M11 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M12 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 5h1v1h-1zM14 5h1v1h-1zM9 6h1v1H9zM10 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 6h1v1h-1zM13 6h1v1h-1zM10 7h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 7h1v1h-1zM10 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 8h1v1h-1zM10 9h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 9h1v1h-1zM10 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 10h1v1h-1zM10 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 11h1v1h-1zM10 12h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 12h1v1h-1zM10 13h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 13h1v1h-1zM10 14h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 14h1v1h-1zM10 15h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 15h1v1h-1zM10 16h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 16h1v1h-1zM10 17h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 17h1v1h-1zM9 18h1v1H9zM8 18h1v1H8zM7 19h1v1H7z'/%3E%3Cpath fill='%23000' d='M10 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 18h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M12 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 18h1v1h-1zM14 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M8 19h1v1H8zM9 19h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 19h1v1h-1zM11 18h1v1h-1zM12 19h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 19h1v1h-1zM14 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 19h1v1h-1zM9 20h1v1H9zM8 20h1v1H8zM13 20h1v1h-1zM14 20h1v1h-1z'/%3E%3C/svg%3E") 7 3, text;
  }
  
  h3 {
    font-family: Space_Grotesk;
    font-weight: 400;
    font-size: 1.6em;
    line-height: 1.6;
  }
  
  h4 {
    font-family: Terminal_Grotesk;
    font-weight: 400;
    font-size: 1.6em;
    line-height: 1.6;
  }
  
  button {
    font-family: Terminal_Grotesk;
  }
  
  a, p, ol {
    font-family: Space_Grotesk;
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23000' d='M8 4h1v1H8zM9 4h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 4h1v1h-1zM12 4h1v1h-1zM13 3h1v1h-1zM14 3h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 4h1v1h-1zM14 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 4h1v1h-1zM8 5h1v1H8zM7 4h1v1H7zM8 3h1v1H8zM9 3h1v1H9zM9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M11 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M12 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 5h1v1h-1zM14 5h1v1h-1zM9 6h1v1H9zM10 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 6h1v1h-1zM13 6h1v1h-1zM10 7h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 7h1v1h-1zM10 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 8h1v1h-1zM10 9h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 9h1v1h-1zM10 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 10h1v1h-1zM10 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 11h1v1h-1zM10 12h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 12h1v1h-1zM10 13h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 13h1v1h-1zM10 14h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 14h1v1h-1zM10 15h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 15h1v1h-1zM10 16h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 16h1v1h-1zM10 17h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 17h1v1h-1zM9 18h1v1H9zM8 18h1v1H8zM7 19h1v1H7z'/%3E%3Cpath fill='%23000' d='M10 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 18h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M12 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 18h1v1h-1zM14 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M8 19h1v1H8zM9 19h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 19h1v1h-1zM11 18h1v1h-1zM12 19h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 19h1v1h-1zM14 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 19h1v1h-1zM9 20h1v1H9zM8 20h1v1H8zM13 20h1v1h-1zM14 20h1v1h-1z'/%3E%3C/svg%3E") 7 3, text;
    line-height: 1.4;
    color: inherit;
  }
  
  button, a {
    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M7 4h1v1H7zM8 4h1v1H8zM10 4h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 4h1v1h-1zM12 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 4h1v1h-1zM12 3h1v1h-1zM11 3h1v1h-1zM14 4h1v1h-1zM15 4h1v1h-1zM6 5h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 5h1v1H7zM8 5h1v1H8z'/%3E%3Cpath fill='%23fff' d='M9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 5h1v1h-1zM12 5h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M13 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M16 5h1v1h-1zM5 6h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 6h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 6h1v1H7zM8 6h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M9 6h1v1H9zM10 6h1v1h-1zM13 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M14 6h1v1h-1zM15 6h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 6h1v1h-1zM18 6h1v1h-1zM5 7h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 7h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 7h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M9 7h1v1H9zM10 7h1v1h-1zM13 7h1v1h-1zM16 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 7h1v1h-1zM6 8h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 8h1v1H7z'/%3E%3Cpath fill='%23000' d='M9 8h1v1H9z' opacity='.1'/%3E%3Cpath fill='%23000' d='M10 8h1v1h-1zM13 8h1v1h-1zM16 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M17 8h1v1h-1zM18 8h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M19 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 8h1v1h-1zM18 8h1v1h-1zM17 8h1v1h-1zM18 9h1v1h-1zM17 9h1v1h-1zM18 10h1v1h-1zM17 10h1v1h-1zM18 11h1v1h-1zM17 11h1v1h-1zM17 12h1v1h-1zM17 13h1v1h-1zM17 14h1v1h-1zM6 9h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 9h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 9h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M10 9h1v1h-1zM13 9h1v1h-1zM16 9h1v1h-1zM19 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 9h1v1h-1zM4 10h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 10h1v1H5zM6 10h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 10h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M8 10h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 10h1v1H9zM10 10h1v1h-1zM13 10h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 10h1v1h-1zM19 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M4 11h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 11h1v1H5zM6 11h1v1H6z' opacity='.1'/%3E%3Cpath fill='%23000' d='M7 11h1v1H7zM8 11h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 11h1v1H9zM16 11h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23fff' d='M16 11h1v1h-1zM16 12h1v1h-1zM16 13h1v1h-1zM16 14h1v1h-1zM16 15h1v1h-1zM16 16h1v1h-1zM15 16h1v1h-1zM15 17h1v1h-1zM14 17h1v1h-1zM13 17h1v1h-1zM12 17h1v1h-1zM11 17h1v1h-1zM10 17h1v1h-1zM10 16h1v1h-1zM10 15h1v1h-1zM10 14h1v1h-1zM10 13h1v1h-1zM10 12h1v1h-1zM10 11h1v1h-1zM10 10h1v1h-1zM9 10h1v1H9zM9 11h1v1H9zM9 12h1v1H9zM9 13h1v1H9zM9 14h1v1H9zM9 15h1v1H9zM8 15h1v1H8zM8 14h1v1H8zM7 14h1v1H7zM7 13h1v1H7zM7 12h1v1H7zM6 12h1v1H6zM5 12h1v1H5zM5 11h1v1H5zM6 11h1v1H6zM7 10h1v1H7zM8 9h1v1H8zM8 8h1v1H8zM8 7h1v1H8zM8 6h1v1H8zM7 6h1v1H7zM7 7h1v1H7zM6 13h1v1H6zM8 13h1v1H8zM9 16h1v1H9zM9 9h1v1H9zM9 8h1v1H9zM11 10h1v1h-1zM11 11h1v1h-1zM11 12h1v1h-1zM11 13h1v1h-1zM11 14h1v1h-1zM11 15h1v1h-1zM11 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1zM14 16h1v1h-1zM14 15h1v1h-1zM14 14h1v1h-1zM14 13h1v1h-1zM14 12h1v1h-1zM14 11h1v1h-1zM14 10h1v1h-1zM14 9h1v1h-1zM14 8h1v1h-1zM14 7h1v1h-1zM14 6h1v1h-1zM13 15h1v1h-1zM13 14h1v1h-1zM13 13h1v1h-1zM13 12h1v1h-1zM13 11h1v1h-1zM13 10h1v1h-1zM12 15h1v1h-1zM12 14h1v1h-1zM12 13h1v1h-1zM12 12h1v1h-1zM12 11h1v1h-1zM12 10h1v1h-1zM12 9h1v1h-1zM12 8h1v1h-1zM12 7h1v1h-1zM12 6h1v1h-1zM12 5h1v1h-1zM11 5h1v1h-1zM11 6h1v1h-1zM11 7h1v1h-1zM11 8h1v1h-1zM11 9h1v1h-1zM15 15h1v1h-1zM15 14h1v1h-1zM15 13h1v1h-1zM15 12h1v1h-1zM15 11h1v1h-1zM15 10h1v1h-1zM15 9h1v1h-1zM15 8h1v1h-1zM15 7h1v1h-1zM15 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M19 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M4 12h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 12h1v1H5zM7 12h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M8 12h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 12h1v1H9zM17 12h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 12h1v1h-1zM4 13h1v1H4zM3 12h1v1H3zM3 11h1v1H3z'/%3E%3Cpath fill='%23000' d='M5 13h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 13h1v1H6zM8 13h1v1H8zM17 13h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 13h1v1h-1zM5 14h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 14h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 14h1v1H7zM17 14h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 14h1v1h-1zM6 15h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 15h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 15h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M17 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 15h1v1h-1zM7 16h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 16h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 16h1v1H9zM16 16h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M17 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 16h1v1h-1zM7 17h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 17h1v1H8zM9 17h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 17h1v1h-1zM11 17h1v1h-1zM12 17h1v1h-1zM13 17h1v1h-1zM14 17h1v1h-1zM15 17h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 17h1v1h-1zM17 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 17h1v1h-1zM8 18h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 18h1v1H9zM10 18h1v1h-1zM11 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM14 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 18h1v1h-1zM8 19h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 19h1v1H9zM10 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM13 19h1v1h-1zM14 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 19h1v1h-1zM9 20h1v1H9zM10 20h1v1h-1zM11 20h1v1h-1zM12 20h1v1h-1zM13 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1z'/%3E%3C/svg%3E") 5 4, grab;
  }
  
  #modal, #modal-slack, #modal-github {
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23fff' d='M7 4h1v1H7zM8 4h1v1H8zM10 4h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 4h1v1h-1zM12 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 4h1v1h-1zM12 3h1v1h-1zM11 3h1v1h-1zM14 4h1v1h-1zM15 4h1v1h-1zM6 5h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 5h1v1H7zM8 5h1v1H8z'/%3E%3Cpath fill='%23fff' d='M9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 5h1v1h-1zM12 5h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M13 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M16 5h1v1h-1zM5 6h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 6h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 6h1v1H7zM8 6h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M9 6h1v1H9zM10 6h1v1h-1zM13 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M14 6h1v1h-1zM15 6h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 6h1v1h-1zM18 6h1v1h-1zM5 7h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 7h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 7h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M9 7h1v1H9zM10 7h1v1h-1zM13 7h1v1h-1zM16 7h1v1h-1zM17 7h1v1h-1zM18 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 7h1v1h-1zM6 8h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 8h1v1H7z'/%3E%3Cpath fill='%23000' d='M9 8h1v1H9z' opacity='.1'/%3E%3Cpath fill='%23000' d='M10 8h1v1h-1zM13 8h1v1h-1zM16 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M17 8h1v1h-1zM18 8h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M19 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 8h1v1h-1zM18 8h1v1h-1zM17 8h1v1h-1zM18 9h1v1h-1zM17 9h1v1h-1zM18 10h1v1h-1zM17 10h1v1h-1zM18 11h1v1h-1zM17 11h1v1h-1zM17 12h1v1h-1zM17 13h1v1h-1zM17 14h1v1h-1zM6 9h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 9h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 9h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M10 9h1v1h-1zM13 9h1v1h-1zM16 9h1v1h-1zM19 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 9h1v1h-1zM4 10h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 10h1v1H5zM6 10h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 10h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M8 10h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 10h1v1H9zM10 10h1v1h-1zM13 10h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 10h1v1h-1zM19 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M4 11h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 11h1v1H5zM6 11h1v1H6z' opacity='.1'/%3E%3Cpath fill='%23000' d='M7 11h1v1H7zM8 11h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 11h1v1H9zM16 11h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23fff' d='M16 11h1v1h-1zM16 12h1v1h-1zM16 13h1v1h-1zM16 14h1v1h-1zM16 15h1v1h-1zM16 16h1v1h-1zM15 16h1v1h-1zM15 17h1v1h-1zM14 17h1v1h-1zM13 17h1v1h-1zM12 17h1v1h-1zM11 17h1v1h-1zM10 17h1v1h-1zM10 16h1v1h-1zM10 15h1v1h-1zM10 14h1v1h-1zM10 13h1v1h-1zM10 12h1v1h-1zM10 11h1v1h-1zM10 10h1v1h-1zM9 10h1v1H9zM9 11h1v1H9zM9 12h1v1H9zM9 13h1v1H9zM9 14h1v1H9zM9 15h1v1H9zM8 15h1v1H8zM8 14h1v1H8zM7 14h1v1H7zM7 13h1v1H7zM7 12h1v1H7zM6 12h1v1H6zM5 12h1v1H5zM5 11h1v1H5zM6 11h1v1H6zM7 10h1v1H7zM8 9h1v1H8zM8 8h1v1H8zM8 7h1v1H8zM8 6h1v1H8zM7 6h1v1H7zM7 7h1v1H7zM6 13h1v1H6zM8 13h1v1H8zM9 16h1v1H9zM9 9h1v1H9zM9 8h1v1H9zM11 10h1v1h-1zM11 11h1v1h-1zM11 12h1v1h-1zM11 13h1v1h-1zM11 14h1v1h-1zM11 15h1v1h-1zM11 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1zM14 16h1v1h-1zM14 15h1v1h-1zM14 14h1v1h-1zM14 13h1v1h-1zM14 12h1v1h-1zM14 11h1v1h-1zM14 10h1v1h-1zM14 9h1v1h-1zM14 8h1v1h-1zM14 7h1v1h-1zM14 6h1v1h-1zM13 15h1v1h-1zM13 14h1v1h-1zM13 13h1v1h-1zM13 12h1v1h-1zM13 11h1v1h-1zM13 10h1v1h-1zM12 15h1v1h-1zM12 14h1v1h-1zM12 13h1v1h-1zM12 12h1v1h-1zM12 11h1v1h-1zM12 10h1v1h-1zM12 9h1v1h-1zM12 8h1v1h-1zM12 7h1v1h-1zM12 6h1v1h-1zM12 5h1v1h-1zM11 5h1v1h-1zM11 6h1v1h-1zM11 7h1v1h-1zM11 8h1v1h-1zM11 9h1v1h-1zM15 15h1v1h-1zM15 14h1v1h-1zM15 13h1v1h-1zM15 12h1v1h-1zM15 11h1v1h-1zM15 10h1v1h-1zM15 9h1v1h-1zM15 8h1v1h-1zM15 7h1v1h-1zM15 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M19 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M20 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M4 12h1v1H4z'/%3E%3Cpath fill='%23000' d='M5 12h1v1H5zM7 12h1v1H7z' opacity='.1'/%3E%3Cpath fill='%23000' d='M8 12h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 12h1v1H9zM17 12h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 12h1v1h-1zM4 13h1v1H4zM3 12h1v1H3zM3 11h1v1H3z'/%3E%3Cpath fill='%23000' d='M5 13h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 13h1v1H6zM8 13h1v1H8zM17 13h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 13h1v1h-1zM5 14h1v1H5z'/%3E%3Cpath fill='%23000' d='M6 14h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 14h1v1H7zM17 14h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M18 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M19 14h1v1h-1zM6 15h1v1H6z'/%3E%3Cpath fill='%23000' d='M7 15h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 15h1v1H8z' opacity='.1'/%3E%3Cpath fill='%23000' d='M17 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 15h1v1h-1zM7 16h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 16h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 16h1v1H9zM16 16h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M17 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 16h1v1h-1zM7 17h1v1H7z'/%3E%3Cpath fill='%23000' d='M8 17h1v1H8zM9 17h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 17h1v1h-1zM11 17h1v1h-1zM12 17h1v1h-1zM13 17h1v1h-1zM14 17h1v1h-1zM15 17h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M16 17h1v1h-1zM17 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M18 17h1v1h-1zM8 18h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 18h1v1H9zM10 18h1v1h-1zM11 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM14 18h1v1h-1zM15 18h1v1h-1zM16 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 18h1v1h-1zM8 19h1v1H8z'/%3E%3Cpath fill='%23000' d='M9 19h1v1H9zM10 19h1v1h-1zM11 19h1v1h-1zM12 19h1v1h-1zM13 19h1v1h-1zM14 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M17 19h1v1h-1zM9 20h1v1H9zM10 20h1v1h-1zM11 20h1v1h-1zM12 20h1v1h-1zM13 20h1v1h-1zM14 20h1v1h-1zM15 20h1v1h-1zM16 20h1v1h-1z'/%3E%3C/svg%3E") 5 4, grab;
  }
  
  input, input::placeholder {
    font-family: Space_Grotesk;
      cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none'%3E%3Cpath fill='%23000' d='M8 4h1v1H8zM9 4h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 4h1v1h-1zM12 4h1v1h-1zM13 3h1v1h-1zM14 3h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 4h1v1h-1zM14 4h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 4h1v1h-1zM8 5h1v1H8zM7 4h1v1H7zM8 3h1v1H8zM9 3h1v1H9zM9 5h1v1H9z'/%3E%3Cpath fill='%23000' d='M10 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M11 5h1v1h-1z'/%3E%3Cpath fill='%23000' d='M12 5h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 5h1v1h-1zM14 5h1v1h-1zM9 6h1v1H9zM10 6h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 6h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 6h1v1h-1zM13 6h1v1h-1zM10 7h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 7h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 7h1v1h-1zM10 8h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 8h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 8h1v1h-1zM10 9h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 9h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 9h1v1h-1zM10 10h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 10h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 10h1v1h-1zM10 11h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 11h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 11h1v1h-1zM10 12h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 12h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 12h1v1h-1zM10 13h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 13h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 13h1v1h-1zM10 14h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 14h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 14h1v1h-1zM10 15h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 15h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 15h1v1h-1zM10 16h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 16h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 16h1v1h-1zM10 17h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 17h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M12 17h1v1h-1zM9 18h1v1H9zM8 18h1v1H8zM7 19h1v1H7z'/%3E%3Cpath fill='%23000' d='M10 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M11 18h1v1h-1z' opacity='.1'/%3E%3Cpath fill='%23000' d='M12 18h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M13 18h1v1h-1zM14 18h1v1h-1z'/%3E%3Cpath fill='%23000' d='M8 19h1v1H8zM9 19h1v1H9z'/%3E%3Cpath fill='%23fff' d='M10 19h1v1h-1zM11 18h1v1h-1zM12 19h1v1h-1z'/%3E%3Cpath fill='%23000' d='M13 19h1v1h-1zM14 19h1v1h-1z'/%3E%3Cpath fill='%23fff' d='M15 19h1v1h-1zM9 20h1v1H9zM8 20h1v1H8zM13 20h1v1h-1zM14 20h1v1h-1z'/%3E%3C/svg%3E") 7 3, text;
  }
  
  `

const CTA = ({ image, text, link, click, ...props }) => {
  return (
    <Box
      sx={{
        width: ['45%', '140px', '140px', '140px', '140px'],
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
        opacity: 0,
        gap: 2,
        textDecoration: 'none',
        '&:active': {
          transform: 'translateY(4px)',
          boxShadow: 'none'
        },
        '&:hover:not(:active)': {
          transform: 'scale(1.05)'
        },
        margin: ['5px 0px', '10px 5px', '10px 5px', '10px 5px', '10px 5px']
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
      <Text as="a" sx={{ textAlign: 'left' }}>
        {text}
      </Text>
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
  const [scrolled2, setScrolled2] = useState(false)
  // const [sessionState, setSessionState] = useState(false)

  const { data: hackers } = useSWR(
    'https://airbridge.hackclub.com/v0.1/Hackers%20Wanted/hackers',
    fetcher,
    { refreshInterval: 1000 }
  )

  const { data: session, status } = useSession()

  async function sign() {
    if (status == 'authenticated') {
      await fetch('/api/hackers-wanted/', {
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

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const handleSubmit = async e => {
    e.preventDefault()

    await fetch('/api/address/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name: e.target.Name.value,
        Address1: e.target.Address1.value,
        Address2: e.target.Address2.value,
        City: e.target.City.value,
        State: e.target.State.value,
        Postal: e.target.Postal.value,
        Country: e.target.Country.value
      })
    })

    formRef.current.reset()
    setSubmitted(true)
  }
  useEffect(() => {
    const onScroll = () => {
      const newState = window.scrollY >= 16
      setScrolled(newState)
    }

    const onScroll2 = () => {
      const newState =
        window.innerHeight + Math.ceil(window.pageYOffset) + 400 >=
        document.body.offsetHeight
      setScrolled2(newState)
      console.log('yay' + Math.ceil(window.pageYOffset))
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', onScroll)
      window.addEventListener('scroll', onScroll2)
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

  useEffect(() => {
    if (window.innerWidth > '400') {
      if (scrolled2) {
        anime
          .timeline()
          .add({
            targets: '#cta1',
            duration: 230,
            opacity: 0
          })
          .add({
            targets: '#cta2',
            duration: 230,
            opacity: 0
          })
          .add({
            targets: '#cta3',
            duration: 230,
            opacity: 0
          })
          .add(
            {
              targets: '#b-cta1',
              duration: 210,
              opacity: 1
            },
            '-=400'
          )
          .add({
            targets: '#b-cta2',
            duration: 210,
            opacity: 1
          })
          .add({
            targets: '#b-cta3',
            duration: 210,
            opacity: 1
          })
          .add({
            targets: '#b-cta4',
            duration: 210,
            opacity: 1
          })
      } else {
        anime
          .timeline()
          .add({
            targets: '#b-cta1',
            duration: 210,
            opacity: 0
          })
          .add({
            targets: '#b-cta2',
            duration: 210,
            opacity: 0
          })
          .add({
            targets: '#b-cta3',
            duration: 210,
            opacity: 0
          })
          .add({
            targets: '#b-cta4',
            duration: 210,
            opacity: 0
          })
          .add(
            {
              targets: '#cta1',
              duration: 230,
              opacity: 1
            },
            '-400'
          )
          .add({
            targets: '#cta2',
            duration: 230,
            opacity: 1
          })
          .add({
            targets: '#cta3',
            duration: 230,
            opacity: 1
          })
      }
    } else {
      anime
        .timeline()
        .add({
          targets: '#b-cta1',
          duration: 210,
          opacity: 1
        })
        .add({
          targets: '#b-cta2',
          duration: 210,
          opacity: 1
        })
        .add({
          targets: '#b-cta3',
          duration: 210,
          opacity: 1
        })
        .add({
          targets: '#b-cta4',
          duration: 210,
          opacity: 1
        })
    }
  }, [scrolled2])

  function displayModal(id) {
    if (typeof window !== 'undefined') {
      document.getElementById(id).style.display = 'flex'
    }
  }

  function closeModal(id) {
    if (typeof window !== 'undefined') {
      document.getElementById(id).style.display = 'none'
    }
  }

  return (
    <>
      <Meta
        as={Head}
        title="Hackers Wanted"
        description="A love letter to hackers"
        image="https://cloud-perha612p-hack-club-bot.vercel.app/0dither_it_img_5673.jpg"
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
          },
          '& .css-6k4y3p': {
            backgroundImage:
              'url("https://cloud-7fhx9zewb-hack-club-bot.vercel.app/0new_piskel-3.png.png")',
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
        ></Box>
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
              transform: 'translateY(-15vh)',
              marginTop: '12px'
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
                position: 'fixed',
                marginLeft: '30%',
                marginTop: '-15%',
                justifyContent: 'center',
                alignItems: 'center',
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
              <Box
                sx={{ position: 'relative', textAlign: 'left', width: '100%' }}
              >
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
                    top: '-10px',
                    right: '-10px',
                    background: 'transparent',
                    color: 'white',
                    fontSize: '1em',
                    p: '0'
                  }}
                  onClick={() => closeModal('modal')}
                >
                  x
                </Box>
                <Box
                  as="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  gap={[2, 3]}
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
                  {/* <button
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
                      mail it to me
                    </button> */}

                  <button
                    type="submit"
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
                    mail it to me
                  </button>
                  {submitted && (
                    <Box
                      variant="primary"
                      sx={{ color: '#000', background: 'white', display: 'flex', alignItems: 'center', mt: 3 }}
                    >
                      <img src="https://cloud-1hwxunix7-hack-club-bot.vercel.app/0pixil-frame-0__3_.png" sx={{width: '30px', height: 'auto', p: 1}} />
                      <Text sx={{ ml: 2, fontWeight: '700' }} as="p">Mail is on it's way!</Text>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </Draggable>
          <Draggable>
            <Box
              id="modal-slack"
              sx={{
                display: 'none',
                flexDirection: 'column',
                maxWidth: '500px',
                width: '90vw',
                position: 'fixed',
                marginLeft: '30%',
                marginTop: '-15%',
                justifyContent: 'center',
                alignItems: 'center',
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
              <Box
                sx={{ position: 'relative', textAlign: 'left', width: '100%' }}
              >
                <h4 sx={{ my: 0 }}>
                  We hackers need a home, Hack Club could be that for you.
                </h4>
                <Box as="p" sx={{ my: [2, 3] }}>
                  Be part of 25k+ high school students that love building on our
                  global Slack. Have a coding question? Looking for project
                  feedback? Want to debate the superiority of tabs vs spaces?
                </Box>
                <a target="_blank" href="https://github.com/hackclub">
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
                    join our slack
                  </button>
                </a>
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
                    top: '-10px',
                    right: '-10px',
                    background: 'transparent',
                    color: 'white',
                    fontSize: '1em',
                    p: '0'
                  }}
                  onClick={() => closeModal('modal-slack')}
                >
                  x
                </Box>
              </Box>
            </Box>
          </Draggable>
          <Draggable>
            <Box
              id="modal-github"
              sx={{
                display: 'none',
                flexDirection: 'column',
                maxWidth: '500px',
                width: '90vw',
                position: 'fixed',
                marginLeft: '30%',
                marginTop: '-15%',
                justifyContent: 'center',
                alignItems: 'center',
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
              <Box
                sx={{ position: 'relative', textAlign: 'left', width: '100%' }}
              >
                <h4 sx={{ my: 0 }}>
                  This letter, just like all parts of Hack Club, is fully
                  open-sourced.
                </h4>
                <Box as="p" sx={{ my: [2, 3] }}>
                  This means that the schematics for our{' '}
                  <a href="https://github.com/hackclub/sprig">game console</a>,{' '}
                  <a href="https://github.com/hackclub/putting-the-you-in-cpu">
                    {' '}
                    a deep dive into how programs run
                  </a>
                  ,{' '}
                  <a href="https://github.com/hackclub/site">
                    this very website
                  </a>
                  , and more are all public on our GitHub. Come join us to build
                  .
                </Box>
                <Box as="p" sx={{ fontSize: 'smaller', fontStyle: 'italic' }}>
                  P.S As a nonprofit, even our finances are
                  <a href="https://bank.hackclub.com/hq">transparent</a>!
                </Box>
                <a target="_blank" href="https://github.com/hackclub">
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
                    github.com/hackclub
                  </button>
                </a>
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
                    top: '-10px',
                    right: '-10px',
                    background: 'transparent',
                    color: 'white',
                    fontSize: '1em',
                    p: '0'
                  }}
                  onClick={() => closeModal('modal-github')}
                >
                  x
                </Box>
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
            <Flex
              sx={{
                flexDirection: 'column',
                position: 'sticky',
                gap: 4,
                width: 'fit-content',
                float: 'right',
                top: '50px',
                right: 0,
                zIndex: 4,
                display: ['none', 'none', 'block', 'block', 'block']
              }}
            >
              <CTA
                image="https://cloud-178z6geau-hack-club-bot.vercel.app/0new_piskel-3.png__1_.png"
                text="get a paper copy"
                id="cta1"
                onClick={() => displayModal('modal')}
              />
              <CTA
                image="https://cloud-gbwqdsj6z-hack-club-bot.vercel.app/0new_piskel-4.png.png"
                text="join our community"
                id="cta2"
                onClick={() => displayModal('modal-slack')}
              />
              <CTA
                image="https://cloud-h1dl2nqn7-hack-club-bot.vercel.app/0new_piskel-5.png.png"
                text="fully open sourced!"
                id="cta3"
                onClick={() => displayModal('modal-github')}
              />
            </Flex>
            <Box
              id="letter"
              sx={{
                maxWidth: ['400px', '450px', '550px', '600px', '700px'],
                width: '100%',
                position: 'relative',
                pb: 5,
                '& p, li': {
                  my: 3
                }
              }}
            >
              <Fade cascade>
                <Flex>
                  <Box as="p" sx={{ fontStyle: 'italic', opacity: 0.6 }}>
                    Reading time: 8 minutes
                  </Box>
                </Flex>
                <Box as="p" sx={{ fontStyle: 'italic' }}>
                  Some people are allergic to unthinking rules and outdated
                  systems. They want the world to be better, more magical, more
                  free. Some also have the creative energy to do something about
                  it—without the need for instructions, and without needing to
                  be asked. <b>These people are hackers.</b> This is our love
                  letter to them, on behalf of a society that’s long failed
                  them.
                </Box>
                <hr sx={{ opacity: '0.7 !important', my: 4 }}></hr>
                <Box as="p">
                  Some of us have always been overlooked, misunderstood,
                  underappreciated; looked at with wariness instead of wonder;
                  set aside instead of embraced.{' '}
                </Box>

                <Box as="p">
                  Throughout most of history, this has been the fate of the
                  hacker. Though no society has ever suffered from having too
                  many—and indeed many have failed their potential by nurturing
                  too few—we’ve been slow to free hackers to do great things.{' '}
                </Box>

                <img
                  src="https://cloud-ip4cwk059-hack-club-bot.vercel.app/1dither_it_189933158-9f00ceaf-7f61-4bef-9911-4cf4a14e0e4d__2_.png"
                  sx={{ width: '100%', my: [3, 4] }}
                />

                <Box as="p">
                  Hackers are doers. That’s their glory, and their stigma. While
                  there are no people more important to where we’re going, we’re
                  still in desperate need of more—far, far more.{' '}
                </Box>

                <Box as="p">
                  But for all their qualities—their drive, their ingenuity,
                  their stubborn persistence—hackers have a branding problem.
                  One that has more to do with us than them.
                </Box>

                <Box as="h4">Hackers aren’t the enemy. We are.</Box>

                <Box as="p">
                  Hollywood and headlines have long been unkind to hackers. The
                  popular image is of shadowy misfits who break into sensitive
                  networks to steal things or hold them hostage—or just to prove
                  that they can.
                </Box>

                <Box as="p">
                  It’s not that hackers don’t do those things, or that those who
                  do should have a different name. But when we distinguish
                  between good and bad hackers as “white hats” or “black hats”
                  we’re missing the more basic point: the bad ones are just
                  young people we failed, mostly by never asking them to do
                  something great.{' '}
                </Box>

                <Box as="p">
                  Hackers need challenges equal to their gifts, and
                  opportunities equal to their ambitions. Else they’ll grow
                  frustrated and find themselves throwing their talents at
                  whatever or whomever offers the most money or status—which can
                  lead them to dark and tragic places.{' '}
                </Box>

                <Box as="p">
                  But this is our problem as much as theirs. More, really.
                  Hackers are a precious natural resource, the lifeblood of our
                  best futures. While we can’t create or micromanage them, we
                  can—and must—support them in healthy directions.
                </Box>

                <img
                  src="https://cloud-bn2bhadx4-hack-club-bot.vercel.app/0dither_it_screenshot_2023-04-26_at_5.43.45_pm.png"
                  sx={{ width: '100%', my: [3, 4] }}
                />

                <Box as="h4">Why?</Box>

                <Box as="p">
                  Hackers run towards our hardest problems, with special energy
                  and creativity, without needing to be asked.
                </Box>

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

                <Box as="p">
                  Hackers are reimaginers, with an incurable bias towards what’s
                  simpler, faster, and better.
                </Box>

                <Box as="p">
                  The result can be beautiful or ugly, good or bad,
                  sophisticated or crude. To have the signature of a hacker it
                  merely has to make other clever people say “ah yes of course”.
                  Hacking is the magical ability to find the straightest line
                  between two points—in spite of all the obstacles in the way,
                  in spite of all the maps that say the best route is to go
                  around.
                </Box>

                <Box as="h4">A hacker has three essential qualities:</Box>
                <Box as="ol">
                  <li>
                    They’re never quite an employee. They can be managed, but
                    rarely directed. They follow their own curiosity their own
                    way—always honestly, often infuriatingly—along with their
                    sense of taste for which problems are interesting and which
                    aren’t.
                  </li>

                  <li>
                    Code is their employee. It does exactly what’s asked of it,
                    brilliantly, if also roughly at first. Elegance tends to
                    come after execution. The hacker’s great pleasure is to look
                    upon their creation like the god of the Old Testament and
                    say “behold, it works”.
                  </li>

                  <li>
                    They’re bloodhounds for finding the better way to get
                    something done, driven by a creativity that astounds—and
                    often worries—those around them.{' '}
                  </li>
                </Box>

                <img
                  src="https://cloud-ip4cwk059-hack-club-bot.vercel.app/0download.png"
                  sx={{ width: '100%', my: [3, 4] }}
                />

                <Box as="p">
                  A hacker is a romantic, a rebel with a most excellent cause:
                  making this world a little less closed off, a little less
                  boring, a little less designed by committee.
                </Box>

                <Box as="p">
                  A hacker believes in good mischief, in being a little loose
                  with the rules that don’t matter so as to improve the outcomes
                  that do.
                </Box>

                <Box as="p">
                  Indeed, a hacker prides themselves on being a bit unruly.
                  Because there is such a thing as ruly-ness, as being a slave
                  to How Things Are Done. Hackers hate this. Sometimes it comes
                  out in their appearance. Always it comes out in how they
                  attack problems.
                </Box>

                <Box as="p">
                  Hackers find unsolved challenges irresistible, which they hack
                  away at by repeatedly asking the smart questions—the hows, the
                  what ifs, the I wonders, the why nots—until they come up with
                  scrappy, ingenious, totally unexpected solutions that the
                  prematurely old among us lacked the energy and freedom to see
                  or throw ourselves at.
                </Box>

                <Box as="p">We need that. Badly. As we always have.</Box>

                <Box as="h4">Hackers belong to a proud lineage.</Box>

                <Box as="p">
                  There’s an unbroken chain of hackers stretching back to the
                  first tools. While hackers today mostly use code, in days past
                  they used hammers and lenses and slide rules—employing them in
                  novel combinations and ways that others just didn’t see.
                </Box>

                <Box as="p">
                  Gutenberg didn’t invent many—perhaps any—individual
                  component(s) of the printing press. The Catholic Church had
                  offered him salvation from bankruptcy, if only he could
                  produce paper indulgences some cheaper way. Soon enough he’d
                  reimagined how movable type and the pressure of a screw press
                  could be combined to outdo the work of a thousand monks.
                </Box>
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

                <Box as="p">
                  Hackers can take many forms. All are programmers in some
                  right. But some want to build the next unicorn, some want to
                  just make some small corner of the world better, and some want
                  to use code to set something free. What unites them all is a
                  sense that a better future isn’t just possible; it’s possible
                  through them.
                </Box>

                <img
                  src="https://cloud-diy7ga468-hack-club-bot.vercel.app/0dither_it_hack_club_assemble_ltnj_02199.jpg"
                  sx={{ width: '100%', my: [3, 4] }}
                />

                <Box as="h4">If we don’t support hackers, we don’t grow.</Box>
                <Box as="p">
                  Coding is an actual superpower. It turns people from consumers
                  to creators; from those who engage with the world as it is to
                  those who reshape the world to something better.
                </Box>
                <Box as="p">
                  We’re in a creation drought as a society, and have been for a
                  while. Our young people are mostly building followings and
                  personas, not things.
                </Box>
                <Box as="p">
                  Building things is hard. Try to do something new—or to do an
                  old thing a new way—and you’ll get a quick education in That’s
                  Not How Things Are Done: the gravity well of committees and
                  process manuals and best practices that confuse caution for
                  wisdom.
                </Box>

                <Box as="p">
                  One of history’s great thinkers told a famous story about a
                  fence blocking a path, and how one type of reformer would just
                  destroy it while a wiser type would first ask why it was
                  built.
                </Box>

                <Box as="p">
                  The hacker would ask too. But the hacker would be less
                  persuaded by bad answers.
                </Box>

                <Box as="h4">
                  We need to be willing to get out of their way.
                </Box>
                <Box as="p">
                  Hackers don’t want, or need, to be guided much. They’ll
                  naturally experiment, explore, and tinker; always by working
                  backwards from big questions and first principles, not
                  forwards from second-hand maps that reflect yesterday’s
                  conditions and compromises.
                </Box>

                <Box as="p">
                  Sometimes we struggle to allow them to, which is to our own
                  disadvantage. Even if we think their approaches won’t work,
                  we’re much better off for letting them try. At worst, they
                  discover something new about the problem. At best, they
                  actually go and solve them.
                </Box>

                <Box as="p">
                  We should praise their spirit and offer them playgrounds for
                  it—that are non-hierarchical, merit-based, and permissionless.
                </Box>

                <Box as="p">
                  But we don’t. And this starts very early on, thanks in part to
                  a school system designed to produce factory workers for a
                  bygone age. Most schools have become a bad simulation of real
                  life in the modern economy. They’re about performing success,
                  not actually wrestling the bits and atoms of the world into a
                  more sane and productive order.
                </Box>

                <Box as="p">
                  This doesn’t need to be how you spend your teenage years.
                  There’s another path you can take, and another type of person
                  you can be.
                </Box>

                <img
                  src="https://cloud-perha612p-hack-club-bot.vercel.app/0dither_it_img_5673.jpg"
                  sx={{ width: '100%', my: [3, 4] }}
                />

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

                <Box as="p">
                  You can be a lone wolf sometimes. But you’ll go further in a
                  pack.
                </Box>

                <Box as="p">
                  The young have much to learn together, and much to teach us.
                </Box>

                <Box as="p">
                  Hackers can’t be taught really. They take ownership over their
                  own education. When they find an interesting problem, they
                  figure out what they need to learn and they pursue it with an
                  enthusiasm that we mostly know now only from long memory. We
                  can ensure that the available curriculum is good; we can’t
                  make them read it, nor determine how they’ll read it.
                </Box>

                <Box as="p">
                  But this isn’t to say they aren’t teachable, at least in the
                  sense of taking direction and feedback. They just see the
                  world differently. As we should hope they do.
                </Box>

                <Box as="p">
                  The great challenges of our times were shaped in part by our
                  past responses to them. If we truly want to solve them, we
                  need to be willing to turn them over to those who perceive
                  them differently, who can approach them from new angles, with
                  more energy and less baggage.
                </Box>

                <Box as="p">Put another way, we need to let hackers hack.</Box>

                <Box as="h4">
                  So consider this a giant sign in the window: Hackers Wanted.
                </Box>

                <Box as="p">
                  We see you, whether you’re in a Bay Area garage or a rural
                  village that the rest of the world can’t find on the map. We
                  value you. We want to stand alongside you as you build
                  things—crazy, useful, beautiful things; things we may not even
                  understand until you teach us.
                </Box>

                <Box as="p">The door is open.</Box>

                <Box as="p">With love,</Box>
              </Fade>
              {/* <Fade bottom delay={1500}> */}
              <Flex sx={{ flexWrap: 'wrap', ml: -1 }}>
                {hackers &&
                  hackers.map((e, index) => (
                    <Hack
                      delay={300 + index * 50}
                      sx={{ opacity: `${index == 0 ? 1 : 3 / index}` }}
                    >
                      {e.fields.username}
                    </Hack>
                  ))}
              </Flex>
              <Flex
                sx={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  position: 'relative',
                  gap: 2,
                  width: '100%',
                  mt: 4,
                  right: 0,
                  display: ['']
                }}
              >
                {status == 'authenticated' ? (
                  <CTA
                    image="https://cloud-e59dqvwx6-hack-club-bot.vercel.app/0new_piskel-2.png__1_.png"
                    text="you've signed :)"
                    id="b-cta1"
                    sx={{
                      opacity: '0.5 !important',
                      '&:hover': {
                        transform: 'none !important'
                      }
                    }}
                  />
                ) : (
                  <CTA
                    image="https://cloud-e59dqvwx6-hack-club-bot.vercel.app/0new_piskel-2.png__1_.png"
                    text="sign your name!"
                    onClick={() => {
                      signIn('github')
                      sign()
                    }}
                    id="b-cta1"
                    // sx={{width: [null, '180px !important', '180px !important', '180px !important', '180px !important']}}
                  />
                )}
                <CTA
                  image="https://cloud-178z6geau-hack-club-bot.vercel.app/0new_piskel-3.png__1_.png"
                  text="get a paper copy"
                  id="b-cta2"
                  onClick={() => displayModal('modal')}
                />
                <CTA
                  image="https://cloud-gbwqdsj6z-hack-club-bot.vercel.app/0new_piskel-4.png.png"
                  text="join our community"
                  id="b-cta3"
                  onClick={() => displayModal('modal-slack')}
                />
                <CTA
                  image="https://cloud-h1dl2nqn7-hack-club-bot.vercel.app/0new_piskel-5.png.png"
                  text="fully open sourced!"
                  id="b-cta4"
                  onClick={() => displayModal('modal-github')}
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
export default Page
