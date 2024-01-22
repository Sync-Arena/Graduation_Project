module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        main_bg_color_dark: '#010409', 
        second_bg_color_dark: '#161B22',
        main_font_color_dark: '#FFF',
        second_font_color_dark: '#9090A3',
        third_font_color_dark: '#424356',
        main_heighlight_color_dark: '#696CFF',  
        second_heighlight_color_dark: '#343548',  

      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}