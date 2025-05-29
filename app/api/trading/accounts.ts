import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import supabase from '../client'

// 📌 Fetch all accounts
export const useAccounts = () => {
  return useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .order('capital', { ascending: true }) // Sort by capital (lowest first)

      if (error) throw error
      return data
    }
  })
}


// 📌 Create a new account
export const useCreateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (newAccount: {
      company: string
      capital: number
      balance: number
    }) => {
      const { data, error } = await supabase
        .from('accounts')
        .insert([newAccount])
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    }
  })
}

// 📌 Update an account
export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<{
        company: string;
        capital: number;
        balance: number;
      }>;
    }) => {
      const cleanedUpdates = Object.fromEntries(
        Object.entries(updates).filter(([_, value]) => value !== undefined)
      );
    
      const { data, error } = await supabase
        .from("accounts")
        .update(cleanedUpdates)
        .eq("id", id)
        .select()
        .single();
    
      if (error) throw error;
      return data;
    }
  })
}

// 📌 Delete an account
export const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('accounts')
        .delete()
        .eq('id', id)

      if (error) throw error
      return id
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] })
    }
  })
}

export const useAccount = (id?: string) => {
  return useQuery({
    queryKey: ["account", id],
    enabled: !!id, // only runs if id is truthy
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    },
  });
};
