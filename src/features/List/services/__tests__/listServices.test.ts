import { describe, it, expect, beforeEach } from 'vitest'
import { listServices } from '../listServices'
import type { ListItem } from '../../types'

// Mock localStorage is already set up in test setup
const mockLocalStorage = window.localStorage as any

describe('listServices', () => {
  beforeEach(() => {
    // Clear localStorage mock calls before each test
    mockLocalStorage.getItem.mockClear()
    mockLocalStorage.setItem.mockClear()
    mockLocalStorage.removeItem.mockClear()
  })

  describe('getAll', () => {
    it('returns empty array when no data exists', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const result = listServices.getAll()
      
      expect(result).toEqual([])
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('list-Items')
    })

    it('returns parsed and hydrated items when data exists', () => {
      const storedData = [
        {
          id: 'item-1',
          title: 'Test Item',
          subtitle: 'Test Subtitle',
          createdAt: '2024-01-01T10:00:00.000Z',
          updatedAt: '2024-01-02T10:00:00.000Z',
        }
      ]
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedData))
      
      const result = listServices.getAll()
      
      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject({
        id: 'item-1',
        title: 'Test Item',
        subtitle: 'Test Subtitle',
      })
      expect(result[0].createdAt).toBeInstanceOf(Date)
      expect(result[0].updatedAt).toBeInstanceOf(Date)
      expect(result[0].createdAt.toISOString()).toBe('2024-01-01T10:00:00.000Z')
      expect(result[0].updatedAt?.toISOString()).toBe('2024-01-02T10:00:00.000Z')
    })

    it('handles items without updatedAt field', () => {
      const storedData = [
        {
          id: 'item-1',
          title: 'Test Item',
          subtitle: 'Test Subtitle',
          createdAt: '2024-01-01T10:00:00.000Z',
        }
      ]
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedData))
      
      const result = listServices.getAll()
      
      expect(result[0].createdAt).toBeInstanceOf(Date)
      expect(result[0].updatedAt).toBeUndefined()
    })

    it('returns empty array for invalid JSON', () => {
      mockLocalStorage.getItem.mockReturnValue('invalid-json')
      
      const result = listServices.getAll()
      
      expect(result).toEqual([])
    })

    it('returns empty array for non-array data', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ not: 'array' }))
      
      const result = listServices.getAll()
      
      expect(result).toEqual([])
    })
  })

  describe('saveAll', () => {
    it('saves items to localStorage', () => {
      const items: ListItem[] = [
        {
          id: 'item-1',
          title: 'Test Item',
          subtitle: 'Test Subtitle',
          createdAt: new Date('2024-01-01T10:00:00.000Z'),
          updatedAt: new Date('2024-01-02T10:00:00.000Z'),
        }
      ]
      
      listServices.saveAll(items)
      
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'list-Items',
        JSON.stringify(items)
      )
    })
  })

  describe('create', () => {
    it('adds new item to existing items and saves', () => {
      const existingItems: ListItem[] = [
        {
          id: 'existing-1',
          title: 'Existing Item',
          subtitle: 'Existing Subtitle',
          createdAt: new Date('2024-01-01T10:00:00.000Z'),
        }
      ]
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingItems))
      
      const newItem: ListItem = {
        id: 'new-1',
        title: 'New Item',
        subtitle: 'New Subtitle',
        createdAt: new Date('2024-01-02T10:00:00.000Z'),
      }
      
      const result = listServices.create(newItem)
      
      expect(result).toHaveLength(2)
      expect(result[1]).toMatchObject(newItem)
      expect(mockLocalStorage.setItem).toHaveBeenCalled()
    })

    it('creates first item when no existing items', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      const newItem: ListItem = {
        id: 'first-1',
        title: 'First Item',
        subtitle: 'First Subtitle',
        createdAt: new Date('2024-01-01T10:00:00.000Z'),
      }
      
      const result = listServices.create(newItem)
      
      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject(newItem)
    })
  })

  describe('update', () => {
    it('updates existing item and saves', () => {
      const existingItems = [
        {
          id: 'item-1',
          title: 'Original Title',
          subtitle: 'Original Subtitle',
          createdAt: '2024-01-01T10:00:00.000Z',
        },
        {
          id: 'item-2',
          title: 'Item 2',
          subtitle: 'Subtitle 2',
          createdAt: '2024-01-01T11:00:00.000Z',
        }
      ]
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingItems))
      
      const updatedItem: ListItem = {
        id: 'item-1',
        title: 'Updated Title',
        subtitle: 'Updated Subtitle',
        createdAt: new Date('2024-01-01T10:00:00.000Z'),
        updatedAt: new Date('2024-01-02T10:00:00.000Z'),
      }
      
      const result = listServices.update(updatedItem)
      
      expect(result).toHaveLength(2)
      expect(result[0]).toMatchObject({
        id: 'item-1',
        title: 'Updated Title',
        subtitle: 'Updated Subtitle',
      })
      expect(result[1].title).toBe('Item 2') // Second item unchanged
      expect(mockLocalStorage.setItem).toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    it('removes item by id and saves', () => {
      const existingItems = [
        {
          id: 'item-1',
          title: 'Item 1',
          subtitle: 'Subtitle 1',
          createdAt: '2024-01-01T10:00:00.000Z',
        },
        {
          id: 'item-2',
          title: 'Item 2',
          subtitle: 'Subtitle 2',
          createdAt: '2024-01-01T11:00:00.000Z',
        }
      ]
      
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingItems))
      
      const result = listServices.delete('item-1')
      
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('item-2')
      expect(mockLocalStorage.setItem).toHaveBeenCalled()
    })

    it('returns empty array when deleting non-existent item', () => {
      mockLocalStorage.getItem.mockReturnValue('[]')
      
      const result = listServices.delete('non-existent')
      
      expect(result).toEqual([])
    })
  })

  describe('clearAll', () => {
    it('removes all data from localStorage', () => {
      listServices.clearAll()
      
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('list-Items')
    })
  })
})