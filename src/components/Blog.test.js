import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, urls and likes are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('clicking the likes button twices calls event handler twice', () => {
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} handleLikeClick={mockHandler} />
    )

    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
