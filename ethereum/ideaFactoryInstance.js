import web3 from './web3';
import ideaFactory  from './build/IdeaFactory.json';
const factoryAddress = '0x08ab9E3D5957f3E7f624393537FD230da62C7a12';


const  instance = new web3.eth.Contract(ideaFactory.abi, factoryAddress);

export default instance;
