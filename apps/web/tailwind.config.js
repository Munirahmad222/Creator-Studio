/** @type {import('tailwindcss').Config} */
export default { content: ['./index.html', './src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'], darkMode: 'class', theme: { extend: { colors: { brand: { 50: '#F5F1FF', 100: '#EAE2FF', 500: '#8063FF', 600: '#6D4AFF', 700: '#5935DB' } }, boxShadow: { soft: '0 10px 35px rgba(35, 24, 78, 0.07)' } } }, plugins: [] };
