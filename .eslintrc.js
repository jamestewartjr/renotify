module.exports = {
  "extends": [
    "react-app",
    "plugin:jsx-a11y/recommended",
    "plugin:cypress/recommended"
  ],
  "env": {
    "es6": true,
    "node": true, 
    "browser": true
},
  "rules" : {
      "indent": ["error", 2]
  }
},
{
  "plugins": [
    "cypress"
  ]
}