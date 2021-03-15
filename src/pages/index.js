import React, {useRef} from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import styled, {keyframes} from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"
import fbImg from "../assets/icons/facebook.svg"
import igImg from "../assets/icons/instagram.svg"

const SlideshowWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const Slideshow = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`


const SlideshowImageCommon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: no-repeat 50% 50%;
  background-size: cover;
  opacity: 1;
`


const morph = ({index, count, scaled, transition}) => {
  // transition time in percentage
  const tt = transition

  // calculate time points
  const t1 = ((index-tt)/count * 100 + 100) % 100
  const t2 = ((index+tt)/count * 100 + 100) % 100
  const t3 = ((index+1-tt)/count * 100 + 100) % 100
  const t4 = ((index+1+tt)/count * 100 + 100) % 100

  const first = (index === 0)
  const last = (index === count - 1)
  const firstScale = scaled - (scaled - 1) * ( tt / (1 + 2*tt))
  const lastScale = 1 + (scaled - 1) * ( tt / (1 + 2*tt))
  const edgeStyle = `{ opacity: ${ (first||last) ? 0.5 : 0 }; transform: scale(${first ? firstScale: (last ? lastScale : 1)});}`

  return keyframes`
    0% ${edgeStyle}
    ${t1}% { opacity: ${first ? 0 : 1}; transform: scale(${scaled}); }
    ${t2}% { opacity: 1; }
    ${t3}% { opacity: 1; }
    ${t4}% { opacity: 0; transform: scale(1); }
    100% ${edgeStyle}
  `
}

const SlideshowImage = styled(SlideshowImageCommon)`
  background-image: ${({photoUrl}) => `url(${photoUrl})`};
  z-index: ${ ({index, count}) => ( count - index)};
  transform: scale(${ ({scaled}) => scaled});
  animation: ${morph} ${({count, animationTime}) => (animationTime * count) }s linear infinite;
`

const Presentation = styled.div`
  text-align: center;
  margin: 4em;
`

const pageQuery = graphql`
{
  graphCmsSetting {
    presentation {
      html
    }
    slideshow {
      id
      url
    }
  }
}
`



const IndexPage = () => {
  const presentationRef = useRef(null)
  const {graphCmsSetting: {slideshow, presentation}} = useStaticQuery(pageQuery)
  const scrollDown = (ev) => {
    ev.preventDefault()
    presentationRef.current.scrollIntoView()
  }

  return (
    <Layout>
      <SEO title="Inés Dorado" titleTemplate={null} />
      <header>
        <h1>Inés Dorado</h1>
        <p>La naturaleza es mi casa</p>
        <p>Perdida en la naturaleza, me encontré.</p>
      </header>

      <SlideshowWrapper>
      <Slideshow>
        {slideshow.map( (s,i) => (
          <SlideshowImage key={s.id} photoUrl={s.url} index={i} scaled={1.2} count={slideshow.length} animationTime={5} transition={0.1}/>
        ))}
      </Slideshow>
      </SlideshowWrapper>

      <section className="scrollDown">
        <a href="#" onClick={scrollDown}><span></span></a>
      </section>


      <div ref={presentationRef} />
      <Presentation dangerouslySetInnerHTML={{ __html: presentation.html }} />
      <footer>
        <p>La naturaleza es mi casa</p>
        <nav>
          <a href="https://www.facebook.com/inedorado">
            <img src={fbImg}/>
          </a>
          <a href="https://www.instagram.com/dorainesperada/">
            <img src={igImg}/>
          </a>
        </nav>
      </footer>

    </Layout>
  )
}

export default IndexPage
