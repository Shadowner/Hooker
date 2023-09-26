/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	themes: ["corporate"],

	plugins: [require("@tailwindcss/typography"), require("daisyui")]
};

module.exports = config;
