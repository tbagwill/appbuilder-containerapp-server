import { initInterface, interfacePref } from '$lib/stores';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';


export const handle = (async ({ event, resolve }) => {
    
    let theme: string | null = null;
    
    // create supabase server client
    event.locals.supabase = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event,
    });

    // helper method to return session info
    event.locals.getSession = async () => {
        const {
          data: { session },
        } = await event.locals.supabase.auth.getSession()
        return session
    };

    event.locals.getUser = async () => {
        const {
          data: { user },
        } = await event.locals.supabase.auth.getUser()
        return user
    };

    await initInterface();

    interfacePref.subscribe((item) => {
        if (item.theme) {
            theme = item.theme;
        }
    });

    if (theme) {
        return await resolve(event, {
            transformPageChunk: ({ html }) =>
                html.replace('data-theme="business"', `data-theme="${theme}"`)
        });
    }

    //  If user is not logged in, request for admin page redirects to login page.
    if (event.url.pathname.startsWith(`${event.url.origin}/admin`)) {
        const currSession = await event.locals.getSession()
        if( !currSession ) {
          throw redirect( 308, '/login' );
        }
    }

    return await resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        }
    });
}) satisfies Handle;
