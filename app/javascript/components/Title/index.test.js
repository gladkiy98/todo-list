import React from 'react'
import Title from './index'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const title = shallow(<Title />)

describe('Title', () => {
  it('should have text', () => {
    expect(title.text()).toBe('Todo-list')
  })
})
