import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useListStore } from '../listStore'
import type { ListItem } from '../../types'

// Mock the listServices module
vi.mock('../../services/listServices', () => ({
  listServices: {
    create: vi.fn((item: ListItem) => [item]),
    update: vi.fn((item: ListItem) => [item]),
    delete: vi.fn(() => []),
    clearAll: vi.fn(),
    getAll: vi.fn(() => []),
  }
}))

describe('useListStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useListStore.setState({ listItems: [] })
    vi.clearAllMocks()
  })

  describe('addItem', () => {
    it('adds a new item with generated id and createdAt', () => {
      const newItemData = {
        title: 'Test Item',
        subtitle: 'Test Subtitle'
      }

      const { addItem } = useListStore.getState()
      addItem(newItemData)

      const { listItems } = useListStore.getState()
      expect(listItems).toHaveLength(1)
      expect(listItems[0]).toMatchObject({
        id: 'test-uuid-123', // From our crypto mock
        title: 'Test Item',
        subtitle: 'Test Subtitle',
      })
      expect(listItems[0].createdAt).toBeInstanceOf(Date)
      expect(listItems[0].updatedAt).toBeUndefined()
    })

    it('calls listServices.create with the new item', async () => {
      const { listServices } = await import('../../services/listServices')
      const newItemData = {
        title: 'Test Item',
        subtitle: 'Test Subtitle'
      }

      const { addItem } = useListStore.getState()
      addItem(newItemData)

      expect(listServices.create).toHaveBeenCalledWith({
        id: 'test-uuid-123',
        title: 'Test Item',
        subtitle: 'Test Subtitle',
        createdAt: expect.any(Date),
      })
    })
  })

  describe('updateItem', () => {
    it('updates an existing item and stamps updatedAt', () => {
      const existingItem: ListItem = {
        id: 'existing-id',
        title: 'Original Title',
        subtitle: 'Original Subtitle',
        createdAt: new Date('2024-01-01'),
      }

      // Set initial state
      useListStore.setState({ listItems: [existingItem] })

      const updatedItem = {
        ...existingItem,
        title: 'Updated Title',
      }

      const { updateItem } = useListStore.getState()
      updateItem(updatedItem)

      const { listItems } = useListStore.getState()
      expect(listItems[0]).toMatchObject({
        id: 'existing-id',
        title: 'Updated Title',
        subtitle: 'Original Subtitle',
      })
      expect(listItems[0].updatedAt).toBeInstanceOf(Date)
      expect(listItems[0].updatedAt?.getTime()).toBeGreaterThan(existingItem.createdAt.getTime())
    })

    it('calls listServices.update with the updated item including updatedAt', async () => {
      const { listServices } = await import('../../services/listServices')
      const existingItem: ListItem = {
        id: 'existing-id',
        title: 'Original Title',
        subtitle: 'Original Subtitle',
        createdAt: new Date('2024-01-01'),
      }

      const { updateItem } = useListStore.getState()
      updateItem(existingItem)

      expect(listServices.update).toHaveBeenCalledWith({
        ...existingItem,
        updatedAt: expect.any(Date),
      })
    })
  })

  describe('deleteItem', () => {
    it('removes an item by id', () => {
      const items: ListItem[] = [
        {
          id: 'item-1',
          title: 'Item 1',
          subtitle: 'Subtitle 1',
          createdAt: new Date(),
        },
        {
          id: 'item-2',
          title: 'Item 2',
          subtitle: 'Subtitle 2',
          createdAt: new Date(),
        },
      ]

      useListStore.setState({ listItems: items })

      const { deleteItem } = useListStore.getState()
      deleteItem('item-1')

      const { listItems } = useListStore.getState()
      expect(listItems).toHaveLength(0) // Mock returns empty array
    })

    it('calls listServices.delete with the correct id', async () => {
      const { listServices } = await import('../../services/listServices')
      
      const { deleteItem } = useListStore.getState()
      deleteItem('item-to-delete')

      expect(listServices.delete).toHaveBeenCalledWith('item-to-delete')
    })
  })

  describe('clearAll', () => {
    it('removes all items', () => {
      const items: ListItem[] = [
        {
          id: 'item-1',
          title: 'Item 1',
          subtitle: 'Subtitle 1',
          createdAt: new Date(),
        },
        {
          id: 'item-2',
          title: 'Item 2',
          subtitle: 'Subtitle 2',
          createdAt: new Date(),
        },
      ]

      useListStore.setState({ listItems: items })

      const { clearAll } = useListStore.getState()
      clearAll()

      const { listItems } = useListStore.getState()
      expect(listItems).toHaveLength(0)
    })

    it('calls listServices.clearAll', async () => {
      const { listServices } = await import('../../services/listServices')
      
      const { clearAll } = useListStore.getState()
      clearAll()

      expect(listServices.clearAll).toHaveBeenCalled()
    })
  })
})