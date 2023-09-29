<script>
    import '../app.postcss';

    import { Toaster } from 'svelte-french-toast';
    import { invalidateAll } from '$app/navigation';
    import { onMount } from 'svelte';

    export let data;

    let { supabase, session } = data;
    $: ({ supabase, session } = data);

    onMount(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(() => {
            invalidateAll();
        });

        return () => subscription.unsubscribe();
    });
</script>

<Toaster />
<slot />
