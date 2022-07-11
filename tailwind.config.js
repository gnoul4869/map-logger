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
            },
        },
    },
    plugins: [],
};
