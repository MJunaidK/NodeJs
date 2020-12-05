const hobbies = ['Sports', 'Cooking'];

const copiedArray = hobbies.slice();
console.log(copiedArray);

const arrayinarray = [hobbies];
console.log(arrayinarray);

const spreadarray = [...hobbies];
console.log(spreadarray);
 
const personObject ={
    name: 'Mohammad Junaid Khan',
    age: 36,
    greet: function() {
        console.log('Hi, I am '+ this.name)
    },
    greet1() {
        console.log('Hi, I am '+ this.name)
    }
};

const copiedPersonObject = {...personObject};
console.log(copiedPersonObject);

const restOperator = ( ...args ) => {
    return args;
};

console.log( restOperator(1,2,3,4) );
