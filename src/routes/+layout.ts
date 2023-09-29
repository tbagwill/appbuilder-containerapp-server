import '$lib/i18n';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { locale, waitLocale } from 'svelte-i18n';
import { redirect } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ fetch, data, depends, url }) => {
    depends('supabase:auth');

    if (browser) {
        locale.set(window.navigator.language);
    }
    
    await waitLocale();

    const supabase = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: { fetch },
        serverSession: data.session
    });

    const {
        data: { session }
    } = await supabase.auth.getSession();

    const {
        data: { user }
     } = await supabase.auth.getUser();

    // if( url.pathname.includes('admin') && !session ) throw redirect(308, '/login');

    return { supabase, session, user };
};
