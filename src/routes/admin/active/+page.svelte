<script>
    import { activePackages, deactivatePackage } from '$lib/stores';
    import { AboutIcon, VisibleOffIcon } from '$lib/icons';

    console.log($activePackages);
</script>

<div class="overflow-x-auto w-full">
    {#if $activePackages.length > 0}
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
                {#each $activePackages as project}
                    <tr>
                        <td>
                            <img
                                class="mask mask-squircle sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                                src={project.image.baseurl + '/' + project.image.files[0].src}
                                alt="App Icon"
                            />
                        </td>
                        <td>{project.app_lang.name}</td>
                        <td>{project.app_lang.regionname}</td>
                        <td>
                            <a href="/admin/{project.id}" class="btn btn-ghost btn-circle btn-sm">
                                <AboutIcon color="hsl(var(--bc))" />
                            </a>

                            <button
                                class="btn btn-ghost btn-circle btn-sm"
                                on:click={() => deactivatePackage(project.id)}
                            >
                                <VisibleOffIcon color="hsl(var(--bc))" />
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {:else}
        <p>No active packages found.</p>
    {/if}
</div>
