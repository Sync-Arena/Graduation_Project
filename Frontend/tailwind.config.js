module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'sm': '576px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1300px'
      },
      colors: {
        main_bg_color_dark: '#010409', 
        second_bg_color_dark: '#0D1117',
        third_bg_color_dark: '#161B22',
        main_border_color_dark: '#21262D',
        main_font_color_dark: '#FFF',
        second_font_color_dark: '#9090A3',
        third_font_color_dark: '#424356',
        blue_font_color: '#3161F1',
        yellow_font_color: '#FABC2D',
        main_heighlight_color_dark: '#723FC8',  
        second_heighlight_color_dark: '#343548',  
        main_link_color_dark: '#3692F0',

      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}