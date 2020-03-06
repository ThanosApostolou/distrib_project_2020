const jwa = require('jwa');

WALLET = require("./wallet.js")
BLOCK = require("./block.js")

module.exports = class NODE {
    ip;
    port;
    nodeid;
    capacity;
    wallet;
    restapp;
    blockchain;

    constructor(ip, port, id, capacity) {
        this.ip = ip;
        this.port = port;
        this.nodeid = id;
        this.capacity = capacity;
        this.wallet = new WALLET();
        this.blockchain = [];
    }

    create_block(id, nonce, previous_hash) {
        return new BLOCK(id, nonce, previous_hash);
    }

    sign_transaction (transaction){
        const rsa_sign = jwa('RS256');
        const input = transaction ; //string
        const signature = rsa_sign.sign(input,this.wallet.privatekey);
        return signature;
    };

    verify_signature (signature, transaction, publicKey){
        const rsa_sign = jwa('RS256');
        const input = transaction ; //string
        var check = rsa_sign.verify(input, signature, publicKey);
        return check ;
    };
}

function test() {
    this.text="test";
    this.sig=this.sign_transaction(this.text);
    this.check=this.verify_signature(this.sig, this.text, this.wallet.publickey);
    console.log(this.sig, "\n", this.check);
}