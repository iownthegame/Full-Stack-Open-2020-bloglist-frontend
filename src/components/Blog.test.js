import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: 'Blog title',
  author: 'Blog author',
  url: 'Blog url',
  likes: 125
}

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent('Blog title')

    expect(component.container).toHaveTextContent('Blog author')
  })

  test('at start the url and likes are not displayed', () => {
    const div = component.container.querySelector('.TogglableContent')
    expect(div).toHaveStyle('display: none')
  })
})
