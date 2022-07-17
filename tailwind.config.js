/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                dark: '#161c20',
                'slite-black': '#444',
                'gamer-red': '#e44444',
                'fa-white': '#f7f7f7',
                'davy-grey': '#555555',
                'outer-space': '#42484d',
                'taupe-gray': '#888888',
                sienna: '#E46F46',
                begonia: '#f87171',
                'v-green': '#0faf87',
            },
        },
    },
    plugins: [],
};
