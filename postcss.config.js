// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './public/login.html',
        './public/signup.html',
        './views/layouts/_friends.handlebars',
        './views/layouts/_home.handlebars',
        './views/layouts/_user.handlebars',
        './views/friends.handlebars',
        './views/home.handlebars',
        './views/user.handlebars',
        './views/partials/friends/friends-block.handlebars',
        './views/partials/friends/friends-list.handlebars',
        './views/partials/moments/moment-block.handlebars',
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    }),
  ]
}