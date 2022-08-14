const path = require('path');
const solc = require('solc');
const fs   = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
      'Campaign.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

//console.log(JSON.parse(solc.compile(JSON.stringify(input))).contracts);
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];


fs.ensureDirSync(buildPath);

 //* below is the For In loop.  This loop iterates over the keys of an object. Here in our iutput object we have 2 keys i.e the 2 contracts which are IdeaFacotry and Idea

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}