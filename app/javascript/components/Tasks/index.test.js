import React from 'react'
import Tasks from './index'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetchMock from 'fetch-mock'

configure({ adapter: new Adapter() })

const tasks = [
  { id: 1, title: 'text', status: 'completed' },
  { id: 2, title: 'test', status: 'active' }
]

fetchMock.get('/api/v1/tasks', tasks)

const wrapper = shallow(<Tasks />)

describe('Tasks', () => {
  describe('callback', () => {
    it ('componentDidMount', () => {
      wrapper.instance().componentDidMount()

      expect(wrapper.find('div.row-task')).toHaveLength(2)
    })
  })

  it ('click on delete', () => {
    fetchMock.delete('/api/v1/tasks/2', {})
    wrapper.find('#data_2').simulate('click')

    expect(wrapper.find('div.row-task')).toHaveLength(1)
  })
})
