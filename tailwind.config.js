/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // all React components
    "./public/index.html", // your main HTML file
  ],
  theme: {
    extend: {
      // 🌟 sans font එක නිවැරදිව extend යටතට ගෙන ඇත
      fontFamily: {
        sans: ['Quicksand', 'sans-serif'],
      },
      
      // 🌟 සියලු animations එකම animation object එක තුළ ඒකාබද්ධ කර ඇත
      animation: {
        blob: "blob 7s infinite",
        'shadow-pulse': "shadow-pulse 2s infinite ease-in-out alternate",
      },
      
      // 🌟 Keyframes
      keyframes: {
        blob: {
          "0%, 100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
        },
        'shadow-pulse': {
          '0%': {
            boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
            transform: 'translateY(0px) scale(1)',
          },
          '50%': {
            boxShadow: '0 15px 30px rgba(204, 102, 153, 0.4)', // Pink/Purple සෙවණැල්ල
            transform: 'translateY(-5px) scale(1.02)',
          },
          '100%': {
            boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
            transform: 'translateY(0px) scale(1)',
          },
        },
      },
    },
  },
  plugins: [],
}
