module.exports = {
    'testEnvironment': 'node',
      "transform": {
        "^.+\\.js?$": "babel-jest", 
        "^.+\\.ts?$": "ts-jest"
      },
    'moduleNameMapper': {
        '~(.*)': '<rootDir>/src/$1'
   }
};