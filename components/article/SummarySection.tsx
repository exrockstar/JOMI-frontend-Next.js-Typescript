import React from 'react'
import includes from 'lodash/includes'

const SummarySection = ({
  text = '',
  toc = [],
  citations = '',
  article = {}
}) => {
  const stripHeaderArtifacts = (text: string) => {
    const bad = '0 1 2 3 4 5 6 7 8 9 , . : ;'.split(' ')
    while (includes(bad, text.charAt(text.length - 1))) {
      text = text.slice(0, -1)
    }
    return text
  }

  const renderTableOfContents = () => {
    if (toc === undefined || toc.length <= 0) return null
    const items = []
    for (let i = 0; i < toc.length; i++) {
      const header = toc[i]
      const subitems = []
      if (header.subheaders !== undefined && header.subheaders.length > 0) {
        for (let j = 0; j < header.subheaders.length; j++) {
          const subheader = header.subheaders[j]
          var text = subheader.text
          text = stripHeaderArtifacts(text)
          subitems.push(
            <li key={`toc-subitem:${j}`} className="toc-item subheader-item">
              <a
                className="toc-link subheader-link"
                href={`#${subheader.id.toLowerCase()}`}
                title={text}
              >
                {text}
              </a>
            </li>
          )
        }
      }
      let sublist = null
      if (subitems.length > 0) {
        sublist = <ol className="toc-item-sublist">{subitems}</ol>
      }
      text = header.text
      text = stripHeaderArtifacts(text)
      items.push(
        <li key={`toc-item:${i}`} className="toc-item">
          <a
            className="toc-link"
            href={`#${header.id.toLowerCase()}`}
            title={text}
          >
            {text}
          </a>
          {sublist}
        </li>
      )
    }

    return (
      <div className="table-of-contents">
        <span className="title">Table of Contents</span>
        <ol className="toc-list">
          {items}
          <li className="toc-item">
            <a className="toc-link" href="#citations" title="Citations">
              Citations
            </a>
          </li>
        </ol>
      </div>
    )
  }
  return <div>{renderTableOfContents()}</div>
}

export default SummarySection
