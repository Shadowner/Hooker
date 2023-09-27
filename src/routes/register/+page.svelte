<script lang="ts">
	import { goto } from '$app/navigation';

	let name = '';
	let email = '';
	let password = '';
	let confirmPassword = '';

	const register = async () => {
		if (!name || !email || !password || !confirmPassword) {
			alert('Please fill all fields');
			return;
		}

		if (password !== confirmPassword) {
			alert('Passwords do not match');
			return;
		}

		const response = await fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, email, password })
		});

		const data = await response.json();

		console.log(data);

		if (data.errors) {
			alert(data.errors[0].message);
		} else {
			alert('User created');
			goto('/login');
		}
	};
</script>

<div class="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-xl">
	<h1 class="text-3xl font-semibold text-center text-gray-700">DaisyUI</h1>
	<form class="space-y-4">
		<div>
			<label class="label" for="name-input">
				<span class="text-base label-text">Name</span>
			</label>
			<input
				type="text"
				bind:value={name}
				placeholder="Name"
				class="w-full input input-bordered"
				required
			/>
		</div>
		<div>
			<label class="label" for="email-input">
				<span class="text-base label-text">Email</span>
			</label>
			<input
				bind:value={email}
				type="email"
				id="email-input"
				placeholder="Enter Email"
				class="w-full input input-bordered"
				required
			/>
		</div>
		<div>
			<label class="label" for="password-input">
				<span class="text-base label-text">Password</span>
			</label>
			<input
				bind:value={password}
				type="password"
				id="password-input"
				placeholder="Enter Password"
				class="w-full input input-bordered"
				required
			/>
		</div>
		<div>
			<label class="label" for="confirm-password-input">
				<span class="text-base label-text">Confirm Password</span>
			</label>
			<input
				bind:value={confirmPassword}
				type="password"
				id="confirm-password-input"
				placeholder="Confirm Password"
				class="w-full input input-bordered"
				required
			/>
		</div>
		<div>
			<button
				class="btn btn-block"
				disabled={!password || !email || !name || !confirmPassword}
				on:click={register}>Sign Up</button
			>
		</div>
		<span
			>Tu as déjà un compte?
			<a href="/login" class="text-blue-600 hover:text-blue-800 hover:underline">Login</a></span
		>
	</form>
</div>
