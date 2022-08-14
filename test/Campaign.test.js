const assert           = require('assert');
const ganache          = require('ganache-cli');
const Web3             = require('web3');
const web3             = new Web3(ganache.provider());

const compiledFactory  = require('../ethereum/build/IdeaFactory.json');
const compiledIdea = require('../ethereum/build/Idea.json');

let accounts;
let factory;
let ideaAddress;
let idea;
let minimumAmount;

beforeEach( async() => {
    accounts = await web3.eth.getAccounts();

    factory  = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({data: compiledFactory.evm.bytecode.object})    //*  very important how we pass the evm...spent 2 hours fixing this
         .send({from: accounts[0], gas: '2000000'});

    minimumAmount = web3.utils.toWei('1', 'ether')
    await factory.methods.createIdea(minimumAmount)
        .send({from: accounts[0], gas: '2000000'});

    const address = await factory.methods.getDeployedIdeas().call();
    ideaAddress = address[0];

    idea = new web3.eth.Contract(compiledIdea.abi, ideaAddress);


});

describe('Ideas',  () => {
    it('Both Factory and Idea contracts deployed successfully',  () => {
        assert.ok(factory.options.address);
        assert.ok(idea.options.address);
    });

    it('marks the caller as the idea manager', async() => {
        const manager = await idea.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows people to contribute, check the minimum amount and mark them as contributers',  async () => {
        let sentAmount = web3.utils.toWei('1', 'ether');

        try{
            await idea.methods.contribute().send({from: accounts[1], value: sentAmount});

        } catch(err) {
            console.log('minimum ' + web3.utils.fromWei(minimumAmount, 'ether') + ' ether is required to contribute');
            assert(err);
        }

        const isContributer = await idea.methods.contributers(accounts[1]).call();
        assert(isContributer);

    });

    it('allows manager to create a payment request', async() => {
        const sentAmount = web3.utils.toWei('5', 'ether');
        await idea.methods.createRequest("Kharcha Paani", sentAmount, accounts[2])
        .send({from: accounts[0], gas: '1000000'});

        const request = await idea.methods.requests(0).call();

        assert.equal('Kharcha Paani', request.description);
        assert.equal(sentAmount, request.value);
        assert.equal(accounts[2], request.recipient);

    })

    it('finalizes request', async () => {

        console.log('Contract balance BEFORE receiving contribution -',
        web3.utils.fromWei(await web3.eth.getBalance(ideaAddress)), 'ether');

        await idea.methods.contribute().send({from: accounts[1], value: web3.utils.toWei('15', 'ether')});

        console.log('Contract balance AFTER  receiving contribution & before finalizing request -',
        web3.utils.fromWei(await web3.eth.getBalance(ideaAddress)), 'ether');

        await idea.methods.createRequest("Kharcha Paani", web3.utils.toWei('15', 'ether'), accounts[2])
        .send({from: accounts[0], gas: '1000000'});

        await idea.methods.approveRequest(0).send({from: accounts[1], gas: '1000000'})

        console.log('Recipient account balance BEFORE receiving payment -',
        web3.utils.fromWei(await web3.eth.getBalance(accounts[2])), 'ether');

        await idea.methods.finalizeRequest(0).send({from: accounts[0], gas: '1000000'})

        console.log('Recipient account balance AFTER  receiving payment -',
        web3.utils.fromWei(await web3.eth.getBalance(accounts[2])), 'ether');

        console.log('Contract balance AFTER sending the payment(finalizing request) -',
        web3.utils.fromWei(await web3.eth.getBalance(ideaAddress)), 'ether');
  
    });

});