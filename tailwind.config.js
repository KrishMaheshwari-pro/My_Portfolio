/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		// Provide a sensible container default so most pages align responsively
		container: {
			center: true,
			padding: '1rem',
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
			},
		},
		extend: {
			backdropBlur: {
				sm: '4px',
			},
			// small utility for fluid heading if needed
			fontSize: {
				'fluid-xl': 'clamp(1.25rem, 1.6vw + 1rem, 2.25rem)'
			}
		},
	},
	plugins: [],
}
