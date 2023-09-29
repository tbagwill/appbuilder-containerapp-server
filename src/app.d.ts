// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import { SupabaseClient, Session } from '@supabase/supabase-js'
declare global {
    namespace App {
      interface Locals {
        supabase: SupabaseClient<Database>
        getSession(): Promise<Session | null>
        getUser(): Promise<User | null >
      }
      interface PageData {
        session: Session | null;
        user: User | null;
      }
      interface Error {
        message: string;
        errorId: string;
      }
      // interface Platform {}
    }
  }
