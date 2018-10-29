import React from 'react'
import Tasks from './index'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import fetchMock from 'fetch-mock'
import moment from 'moment'

configure({ adapter: new Adapter() })

document.head.innerHTML =
'<head>' +
  '<meta content="qqqweqweqweqwe" />' +
  '<meta content="sdhfsjkdgsdkfjsd" />' +
'</head>'

const tasks = [
  { id: 1, title: 'completed task', status: 'completed' },
  { id: 2, title: 'active task', status: 'active' }
]

fetchMock.get('/api/v1/tasks', tasks)

const wrapper = mount(<Tasks />)

describe('Tasks', () => {
  describe('callback', () => {
    it ('componentDidMount', () => {
      expect(wrapper.state('tasks')).toHaveLength(2)
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
  })

  describe('create', () => {
    beforeAll(() => {
      fetchMock.post('/api/v1/tasks', { id: 3, title: 'new task', status: 'active', completed_to: '24-10-2018' })
      wrapper.find('.input-text').simulate('change', { target: { name: 'title', value: 'new value' } })
      wrapper.setState({ completed_to: moment() })
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


  it ('clear completed task', () => {
    fetchMock.get('/api/v1/completed_tasks/new', {})
    wrapper.find('.badge-light').simulate('click')

    expect(wrapper.find('div.row-task')).toHaveLength(2)
  })

  it ('check count active tasks', () => {
    expect(wrapper.state('activeTaskCount')).toBe('2 items left')
  })

  describe('checkAll', () => {
    beforeAll(() => {
      fetchMock.get('/api/v1/completed_tasks', [tasks[0]])
      wrapper.find('.checked-all').simulate('click')
      wrapper.update(<Tasks />)
    })

    it ('when 1 active task', () => {
      expect(wrapper.state('tasks')[0].status).toBe('completed')
    })
  })

  describe('checkAll', () => {
    beforeAll(() => {
      fetchMock.get('/api/v1/active_tasks', [{ id: 1, title: 'completed task', status: 'active' }])
      wrapper.find('.checked-all').simulate('click')
      wrapper.update(<Tasks />)
    })

    it ('when 1 completed task', () => {
      expect(wrapper.state('tasks')[0].status).toBe('active')
    })
  })

  describe('filter button', () => {
    beforeAll (() => {
      fetchMock.get('/api/v1/tasks?status=1', [])
      wrapper.find('a[children="Completed"]').simulate('click')
      wrapper.update(<Tasks />)
    })

    it ('completed', () => {
      expect(wrapper.state('tasks')).toEqual([])
    })
  })

  describe('filter button', () => {
    beforeAll (() => {
      fetchMock.get('/api/v1/tasks?status=0', [tasks[1]])
      wrapper.find('a[children="Active"]').simulate('click')
      wrapper.update(<Tasks />)
    })

    it ('active', () => {
      expect(wrapper.state('tasks')).toEqual([tasks[1]])
    })
  })

  describe('filter button', () => {
    beforeAll (() => {
      fetchMock.get('/api/v1/tasks?status=', tasks)
      wrapper.find('a[children="All"]').simulate('click')
      wrapper.update(<Tasks />)
    })

    it ('all', () => {
      expect(wrapper.state('tasks')).toEqual(tasks)
    })
  })
})
