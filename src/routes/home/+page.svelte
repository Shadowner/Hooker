<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<p>Coucou</p>
<p>{data.user?.id}</p>
