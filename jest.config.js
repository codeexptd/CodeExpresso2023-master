module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "\\.(jpg|jpeg|png|gif|svg|mp3)$": "<rootDir>/node_modules/jest-transform-stub",
    },
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy",
    }
};