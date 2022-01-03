import type { NextPage, GetServerSideProps } from 'next'

import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { Typography } from '@mui/material'

import Carousel from 'react-material-ui-carousel'

import { Hero, Login, WebPlayback } from 'components/modules'
import {
  RichCard,
  type Props as RichCardProps,
} from 'components/modules/RichCard'

const cards: RichCardProps[] = [
  {
    type: 'article',
    title: 'APIを叩きまくってみる',
    captureSrc: 'try_api_01.jpg',
    captureAlt: '',
    href: '/contents/try-api/',
    desc: 'apiを叩く練習だ！',
  },
  {
    type: 'portfolio',
    title: '友人のサイト制作',
    captureSrc: 'contents_01.png',
    captureAlt: '',
    href: 'https://k-takeuchi-test.vercel.app/',
    stack: {
      framework: 'Next.js',
      css: 'styled-components, tailwindCSS',
      js: 'Typescript',
      deploy: 'vercel',
    },
    gitHref: 'https://github.com/mono-sakakibara/k-takeuchi-renew/',
  },
  {
    type: 'portfolio',
    title: 'Furima',
    captureSrc: 'furima-logo.png',
    captureAlt: '',
    href: 'https://furima-31998.herokuapp.com/',
    stack: {
      framework: 'RubyonRails ',
      css: 'pure',
      js: 'pure',
      deploy: 'heroku',
    },
    gitHref: 'https://github.com/mono-sakakibara/furima_31998',
    desc: (
      <>
        テックキャンプの卒業制作
        <br />
        スタイルは雛形を使用。amazon
        S3から外してしまったため、現在画像が投稿できません。（すみません。。）
        <br />
        Basic認証 ID: admin Pass: 2222
      </>
    ),
  },
]

type Props = {
  token: string
}

const Home: NextPage<Props> = ({ token }) => {
  return (
    <>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth='sm' component={'section'}>
          <Hero />
        </Container>
      </Box>
      {/* End hero unit */}

      {/* anchor */}
      <Container sx={{ py: 8 }} maxWidth='md'>
        <Box sx={{ minWidth: 275 }}>
          <Carousel
            autoPlay={false}
            indicators={true}
            navButtonsAlwaysInvisible={true}
            IndicatorIcon={[
              <>
                <Typography
                  component='span'
                  // variant='h1'
                  // align='center'
                  color='text.primary'
                  sx={{}}
                >
                  昨日の一曲
                </Typography>
              </>,
              <>
                <Typography
                  component='span'
                  // variant='h1'
                  // align='center'
                  color='text.primary'
                  sx={{}}
                >
                  今日の一曲
                </Typography>
              </>,
            ]}
            indicatorIconButtonProps={{
              style: {
                borderRadius: 'unset',
                margin: '0 30px',
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            <iframe
              src='https://open.spotify.com/embed/episode/0kNcejULVd0xzJFgzlWRHE?utm_source=generator'
              width='100%'
              height='232'
              frameBorder='0'
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            ></iframe>
            <iframe
              src='https://open.spotify.com/embed/show/0Xwe0k0GG5QoaqrDX86fTs?utm_source=generator'
              width='100%'
              height='232'
              frameBorder='0'
              allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            ></iframe>
          </Carousel>
        </Box>
      </Container>
      {/* End anchor */}

      {/* Spotify Web Playback */}
      <Container sx={{ py: 8 }} maxWidth='md'>
        <Box sx={{ minWidth: 275 }}>
          <Card
            sx={{ display: 'grid', placeItems: 'center', minHeight: '300px' }}
          >
            {token === '' ? <Login /> : <WebPlayback token={token} />}
          </Card>
        </Box>
      </Container>
      {/* End Spotify Web Playback */}

      {/* Contents Area */}
      <Container sx={{ py: 8 }} maxWidth='md'>
        <Grid container spacing={4}>
          {cards.map((card, i) => (
            <Grid item key={i} xs={12} sm={6} md={6}>
              <RichCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* End Contents Area */}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.req.cookies['spotify-token']) {
    const token: string = context.req.cookies['spotify-token']
    return {
      props: { token: token },
    }
  } else {
    return {
      props: { token: '' },
    }
  }
}

export default Home
