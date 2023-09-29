<script>
    import { AboutIcon, VisibleIcon } from '$lib/icons';
    import { incomingPackages, currUser } from '$lib/stores';
</script>

<div class="overflow-x-auto w-full">
    {#if $incomingPackages.length > 0}
        <table class="table table-md lg:w-3/4">
            <thead>
                <tr>
                    <th>Icon</th>
                    <th>Package</th>
                    <th>Region</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {#each $incomingPackages as project}
                    <tr>
                        <td>
                            <img
                                class="mask mask-squircle sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                                src={project.img}
                                alt="App Icon"
                            />
                        </td>
                        <td>{project.app_lang.name}</td>
                        <td>{project.app_lang.regionname}</td>
                        <td>
                            <a href="/admin/{project.id}" class="btn btn-ghost btn-circle btn-sm">
                                <AboutIcon color="hsl(var(--bc))" />
                            </a>
                            {#if $currUser.isAdmin}
                                <button
                                    class="btn btn-ghost btn-circle btn-sm"
                                    on:click={() => activatePackage(project.id)}
                                >
                                    <VisibleIcon color="hsl(var(--bc))" />
                                </button>
                            {/if}
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p>No inactive packages found.</p>
    {/if}
</div>
