import Web3 from "web3";

//* window is a global variable that is available only inside the browser. It is NOT available on nodejs which is where our server is currently running. In other words whenever nextjs loads up our code with the intent to render our react application on the server, that window variale is not defined so we get that error msg that says' winodw is not defined'. So the updated code is as follows, this will also let users without Metamask to view our application


let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.  (typeof operator tells us if a variable is defined)
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);    //*   this statement sets the  provider from the current browser page/window to our web3 instance
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
  //  "https://rinkeby.infura.io/v3/15c1d32581894b88a92d8d9e519e476c"
      "https://rinkeby.infura.io/v3/ab89e851a40e4fdb973003e19d2d6f32"   //  this one is mine
  );
  web3 = new Web3(provider);
}

export default web3;  // by this time variable web3 is holding an instance of Web3 either way