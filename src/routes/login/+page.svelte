<script>
    import { VisibleIcon, VisibleOffIcon } from '$lib/icons';
    import { superForm } from 'sveltekit-superforms/client';

    export let data;
    export let form;
    let visible = false;

    function toggleVisibility() {
        visible = !visible;
        if (visible) document.getElementById('password').setAttribute('type', 'text');
        else document.getElementById('password').setAttribute('type', 'password');
    }

    const { form: loginForm, errors, enhance } = superForm(data.loginForm, { resetForm: false });
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<div class="flex flex-col w-full justify-center items-center p-8 mt-8">
    <div class="card w-11/12 md:w-3/4 flex flex-col items-center rounded-xl bg-primary p-8">
        <div class="card-title text-xl md:text-3xl text-center font-bold">Login</div>
        <form class="w-11/12 md:w-3/4" name="login" method="POST" action="?/login" use:enhance>
            <div class="card-body p-0 mt-6 flex flex-col w-full">
                <label for="email" class="label text-sm label-text"> Email: </label>
                <input
                    class="input input-secondary text-sm font-semibold w-full p-2 pl-4 rounded-full"
                    title="Input (email)"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    autocomplete="email"
                />
                {#if $errors.email}<span class="text-error">{$errors.email}</span>{/if}
                <label for="password" class="label"> Password: </label>
                <div class="join w-full">
                    <input
                        class="join-item input input-secondary text-sm font-semibold w-full p-2 pl-4 rounded-full"
                        title="Input (password)"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        autocomplete="current-password"
                    />
                    <button
                        class="btn join-item rounded-full btn-outline btn-secondary btn-ghost"
                        type="button"
                        on:click={toggleVisibility}
                    >
                        {#if visible}
                            <VisibleOffIcon color="hsl(var(--bc))" />
                        {:else}
                            <VisibleIcon color="hsl(var(--bc))" />
                        {/if}
                    </button>
                </div>
                {#if $errors.password}<span class="text-error">{$errors.password}</span>{/if}
            </div>
            {#if form?.invalid}
                <aside class="alert alert-error rounded-xl p-4 mt-8">
                    <h3 class="h3 font-bold">Uh oh!</h3>
                    <p>Could not log you in. Please try again.</p>
                </aside>
            {/if}
            <button
                class="btn w-full btn-outline text-lg font-bold btn-md rounded-full mt-8"
                formaction="?/login"
                type="submit"
            >
                Login
            </button>
        </form>
    </div>
</div>
