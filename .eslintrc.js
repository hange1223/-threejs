module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "standard",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "html"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        // allow paren-less arrow functions
       'arrow-parens': 0,
       // allow async-await
       'generator-star-spacing': 0,
       // allow debugger during development
       'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
};