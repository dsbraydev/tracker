import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from '../client'
import { useDeleteTradeImage } from './image'
const BUCKET_NAME = "trade-images"

export interface Trade {
  id: string
  account_id: string
  currency: string
  amount: number
  image_url: string
  result: 'win' | 'loss'
  stop_loss?: number
  profit_target?: number
  ratio?: number
  notes?: string
  created_at: string
}

// 📌 Fetch all trades (optionally by account)
export const useTrades = (accountId?: string) => {
  return useQuery({
    queryKey: ['trades', accountId],
    queryFn: async () => {
      const query = supabase
        .from('trades')
        .select('*')
        .order('created_at', { ascending: false })

      if (accountId) {
        query.eq('account_id', accountId)
      }

      const { data, error } = await query
      if (error) throw error
      return data as Trade[]
    }
  })
}

// 📌 Create a trade
export const useCreateTrade = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newTrade: Omit<Trade, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('trades')
        .insert([newTrade])
        .select()
        .single()

      if (error) throw error
      return data as Trade
    },
    onSuccess: (_data, _variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['trades'] })
    }
  })
}

// 📌 Update a trade
export const useUpdateTrade = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      updates
    }: {
      id: string
      updates: Partial<Omit<Trade, 'id' | 'created_at'>>
    }) => {
      const { data, error } = await supabase
        .from('trades')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data as Trade
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['trades'] })
    }
  })
}

// 📌 Delete a trade
export const useDeleteTrade = () => {
  const queryClient = useQueryClient()
  const deleteImage = useDeleteTradeImage()

  return useMutation({
    mutationFn: async (trade: { id: string; image_url?: string }) => {
      // Extract file path from URL if present
      if (trade.image_url) {
        const path = new URL(trade.image_url).pathname
        const filePath = decodeURIComponent(path.replace(`/storage/v1/object/public/${BUCKET_NAME}/`, ""))
        await deleteImage.mutateAsync(filePath)
      }

      // Delete trade
      const { error } = await supabase
        .from("trades")
        .delete()
        .eq("id", trade.id)

      if (error) throw error
      return trade.id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] })
    }
  })
}
