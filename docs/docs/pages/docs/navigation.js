import React from 'react'
import Search from './search'

function Navigation (props) {
  function renderMenu () {
    return Object.keys(props.docs).map(function (sectionKey, index) {
      return (
        <li key={index} className={`docs-navigation-item${props.sectionName === sectionKey ? ' active' : ''}`}>
          <span>{sectionKey.replace('_', ' ')}</span>
          <div className='underline' />
          <div className='docs-navigation-subItems'>
            {Object.keys(props.docs[sectionKey]).map(function (subSectionKey, index) {
              return (
                <a
                  key={index}
                  className={`docs-navigation-subItem${props.sectionName === sectionKey && props.docName === subSectionKey ? ' active' : ''}`}
                  href={`/docs/${sectionKey}/${subSectionKey}.html`}
                >
                  {props.docs[sectionKey][subSectionKey].toc[0].title}
                </a>
              )
            })}
          </div>
        </li>
      )
    })
  }

  return (
    <div id='navigation' className='docs-navigation'>
      <ul className='docs-navigation-menu'>
        {renderMenu()}
      </ul>
      <Search />
    </div>
  )
}

export default Navigation
