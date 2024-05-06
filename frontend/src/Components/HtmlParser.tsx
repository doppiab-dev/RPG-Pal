import { type FC } from 'react'
import { sanitize } from 'dompurify'
import parse from 'html-react-parser'

interface HtmlParserProps {
  children: string
  style?: React.CSSProperties
  testId: string
}

const HtmlParser: FC<HtmlParserProps> = ({ children, testId, style }) =>
  <span style={style} data-testid={`${testId}-span`}>
    {parse(sanitize(children).replaceAll('<a ', '<a target="_blank" rel="noopener noreferrer" '))}
  </span>

export default HtmlParser
