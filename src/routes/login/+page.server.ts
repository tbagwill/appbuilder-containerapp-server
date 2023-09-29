import type { Actions } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/data/schemas';
import { currUser } from '$lib/stores';
import toast from 'svelte-french-toast';

export const load = async( ) => {
    const loginForm = await superValidate( loginSchema );
    return { loginForm };
}

export const actions: Actions = {
    login: async ({ request, locals, url }) => {
        const loginForm = await superValidate( request, loginSchema );

        console.log( loginForm );

        if ( !loginForm.valid ) 
        {
            return fail( 400, { loginForm })
        } else {
            const { data: user, error: err } = await locals.supabase.auth.signInWithPassword({
                email: loginForm.data.email as string,
                password: loginForm.data.password as string
            })

            if( err ){
                console.log( err );
                return fail( 400, { loginForm, invalid: true });
            }

            if( user ) {
                console.log( user );
                throw redirect( 300, `${url.origin}/admin/active`);
            }
        }
    }
}