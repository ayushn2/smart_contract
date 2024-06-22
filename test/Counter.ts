// Tests go here...

const {expect} = require('chai');
const {ethers} = require('hardhat');

// Contract: Type from ethers for strong typing of the counter contract instance.
import { Contract } from 'ethers';

describe('Counter',() => {

    let counter: Contract;

    beforeEach(async ()=>{
        // Before each function execture before each test example runs
        const Counter = await ethers.getContractFactory('Counter');//Ethers smart contract
        counter = await Counter.deploy('My Counter',1)//The deployed smart contract
    })

    describe('Deployment',()=>{
        it('sets the initial count', async () =>{
            expect(await counter.count()).to.equal(1)
            // Fetch the account
            // Check the count to make sure it's what we expect
        })
    
        it('sets the initial name',async () =>{
            const name = await counter.name()
            expect(name).to.equal('My Counter')
        })
    })

    describe('Counting',()=>{

        let transaction;

        it('reads the count from the "count" public variable',async ()=>{
            expect(await counter.count()).to.equal(1)
        })

        it('reads the count from the "getCount()" public variable',async ()=>{
            expect(await counter.getCount()).to.equal(1)
        })

        it('increments the count',async()=>{
            transaction = await counter.increment()
            await transaction.wait()

            let count = await counter.count()
            expect(count).to.equal(2)

            transaction = await counter.increment()
            await transaction.wait()

            expect(await counter.count()).to.equal(3)

        })

        it('decrements the count',async()=>{
            transaction = await counter.decrement()
            await transaction.wait()

            let count = await counter.count()
            expect(count).to.equal(0)


       

            
            // Cannot decrement count below 0

            await expect(counter.decrement()).to.be.reverted

           

        })

        it('reads the name from the "name" public variable',async ()=>{
            expect(await counter.name()).to.equal('My Counter')
        })

        it('reads the name from the "getName()" public variable',async ()=>{
            expect(await counter.getName()).to.equal('My Counter')
        })

        it('Updates the name',async()=>{
            transaction = await counter.setName('New Name')
            await transaction.wait()
            expect(await counter.name()).to.equal('New Name')
        })
    })

   
})