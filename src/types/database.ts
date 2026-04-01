export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          id: string
          title: string
          author: string | null
          category_id: string | null
          description: string | null
          cover_url: string | null
          file_url: string | null
          is_restricted: boolean
          tags: string[] | null
          added_date: string
          curator_note: string | null
          views: number
          downloads: number
          is_published: boolean
        }
        Insert: {
          id?: string
          title: string
          author?: string | null
          category_id?: string | null
          description?: string | null
          cover_url?: string | null
          file_url?: string | null
          is_restricted?: boolean
          tags?: string[] | null
          added_date?: string
          curator_note?: string | null
          views?: number
          downloads?: number
          is_published?: boolean
        }
        Update: {
          id?: string
          title?: string
          author?: string | null
          category_id?: string | null
          description?: string | null
          cover_url?: string | null
          file_url?: string | null
          is_restricted?: boolean
          tags?: string[] | null
          added_date?: string
          curator_note?: string | null
          views?: number
          downloads?: number
          is_published?: boolean
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          color: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          color?: string | null
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          sort_order?: number
        }
      }
    }
  }
}

export type Book = Database['public']['Tables']['books']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
