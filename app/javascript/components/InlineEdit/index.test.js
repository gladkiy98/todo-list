import React from 'react'
import InlineEdit from './index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const wrapperActiveTask = mount(<InlineEdit text={'some text'} labelId={3} inputDisabled={'active'} />)
const wrapperCompletedTask = mount(<InlineEdit text={'another text'} labelId={4} inputDisabled={'completed'} />)

describe('inlineEdit', () => {
  describe('active task', () => {
    beforeAll(() => {
      wrapperActiveTask.find('label').simulate('click')
      wrapperActiveTask.setState({ text: 'new value' })
      wrapperActiveTask.find('input').simulate('blur')
    })

    it ('when edit title', () => {
      expect(wrapperActiveTask.text()).toBe('new value')
    })
  })

  describe('completed task', () => {
    beforeAll(() => {
      wrapperCompletedTask.find('label').simulate('click')
    })

    it ('when edit title', () => {
      expect(wrapperCompletedTask.text()).toBe('another text')
    })
  })
})
