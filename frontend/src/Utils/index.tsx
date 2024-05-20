import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    margin: 12
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify'
  },
  bold: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontWeight: 'bold'
  },
  italic: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontStyle: 'italic'
  },
  underline: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    textDecoration: 'underline'
  }
})

// eslint-disable-next-line react/display-name
export const replaceDomNode = () => (domNode: any) => {
  if (domNode.name === 'h2') {
    return <Text style={styles.title}>{domNode.children}</Text>
  }
  if (domNode.name === 'h3') {
    return <Text style={styles.subtitle}>{domNode.children}</Text>
  }
}

export const textToHtml = (parsedText: string | JSX.Element | JSX.Element[]): JSX.Element => {
  if (Array.isArray(parsedText)) {
    return <Document>
      <Page style={styles.body}>
        {
          parsedText.map((text, i) => {
            if (typeof text === 'string') return <Text style={styles.text} key={`text-${i}`}>{text}</Text>
            if (text.type === 'TEXT' && Boolean(text.props)) {
              return <Text style={text.props.style} key={text.key}>{text.props.children.map((child: { data: any }) => child.data).join(' ')}</Text>
            }
            return <Text style={styles.text} key={text.key} />
          }
          )
        }
      </Page>
    </Document>
  }

  return <Document>
    <Page style={styles.body}>
      <Text style={styles.text}>{parsedText}</Text>
    </Page>
  </Document>
}
