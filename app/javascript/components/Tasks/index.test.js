import React from 'react'
import Tasks from './index'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetchMock from 'fetch-mock'

configure({ adapter: new Adapter() })

const tasks = [
  { id: 1, title: 'completed task', status: 'completed' },
  { id: 2, title: 'active task', status: 'active' }
]

fetchMock.get('/api/v1/tasks', tasks)

const wrapper = shallow(<Tasks />)

describe('Tasks', () => {
  describe('callback', () => {
    it ('componentDidMount', () => {
      expect(wrapper.find('div.row-task')).toHaveLength(2)
    })
  })

  describe('validation', () => {
    it('errors', () => {
      wrapper.find('input.invisible').simulate('click', { preventDefault() {} })
      expect(wrapper.state('errors')).toEqual({ title: 'Title cannot be empty', completed_to: 'Date cannot be emty' })
    })
  })

  describe('handleChange', () => {
    it('when change input-text', () => {
      wrapper.find('.input-text').simulate('change', { target: { name: 'title', value: 'new value' } })
      expect(wrapper.state('title')).toEqual('new value')
    })

    it('when change input-data', () => {
      wrapper.find('.input-data').simulate('change', { target: { name: 'completed_to', value: '10-24-2018' } })
      expect(wrapper.state('completed_to')).toEqual('10-24-2018')
    })
  })

  describe('create', () => {
    beforeAll(() => {
      fetchMock.post('/api/v1/tasks', { id: 3, title: 'new task', status: 'active', completed_to: '24-10-2018' })
      wrapper.find('.input-text').simulate('change', { target: { name: 'title', value: 'new value' } })
      wrapper.find('.input-data').simulate('change', { target: { name: 'completed_to', value: '10-24-2018' } })
      wrapper.find('input.invisible').simulate('click', { preventDefault: () => {} })
      wrapper.update(<Tasks />)
    })

    it('when valid params', () => {
      expect(wrapper.state('tasks')[2].title).toBe('new task')
    })
  })

  describe('update active task', () => {
    beforeAll(() => {
      fetchMock.put('/api/v1/completed_tasks/2', { id: 2, title: 'active task', status: 'completed' })
      wrapper.find('input#checked_2').simulate('change')
      wrapper.update(<Tasks />)
    })

    it ('when update status', () => {
      expect(wrapper.state('tasks')[1].status).toBe('completed')
    })
  })

  describe('update completed task', () => {
    beforeAll(() => {
      fetchMock.put('/api/v1/active_tasks/1', { id: 1, title: 'completed task', status: 'active' })
      wrapper.find('input#checked_1').simulate('change')
      wrapper.update(<Tasks />)
    })

    it ('when update status', () => {
      expect(wrapper.state('tasks')[0].status).toBe('active')
    })
  })

  it ('click on delete', () => {
    fetchMock.delete('/api/v1/tasks/2', {})
    wrapper.find('#data_2').simulate('click')

    expect(wrapper.find('div.row-task')).toHaveLength(2)
  })
})
