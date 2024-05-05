import { type FC } from 'react'
import { sanitize } from 'dompurify'
import parse from 'html-react-parser'

interface HtmlParserProps {
  children: string
  style?: React.CSSProperties
}

const HtmlParser: FC<HtmlParserProps> = ({ children, style }) =>
  <span style={style}>{parse(sanitize(children).replaceAll('<a ', '<a target="_blank" rel="noopener noreferrer" '))}</span>

export default HtmlParser
