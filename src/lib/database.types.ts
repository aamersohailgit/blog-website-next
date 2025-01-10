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
      posts: {
        Row: {
          id: number
          title: string
          content: string
          excerpt: string | null
          author: string | null
          slug: string
          published_at: string
          updated_at: string
          is_published: boolean
        }
        Insert: {
          id?: number
          title: string
          content: string
          excerpt?: string | null
          author?: string | null
          slug: string
          published_at?: string
          updated_at?: string
          is_published?: boolean
        }
        Update: {
          id?: number
          title?: string
          content?: string
          excerpt?: string | null
          author?: string | null
          slug?: string
          published_at?: string
          updated_at?: string
          is_published?: boolean
        }
      }
    }
  }
}