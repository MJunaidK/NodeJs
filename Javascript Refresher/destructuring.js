const person ={
    name: 'Mohammad Junaid Khan',
    age: 36,
    greet: function() {
        console.log('Hi, I am '+ this.name)
    },
    greet1() {
        console.log('Hi, I am '+ this.name)
    }
};

const printName = (personData) => {
    console.log(personData.name);
}

printName(person);


const destructuringName = ({name}) => {
    console.log(name);
}

destructuringName(person);

const {name, age} = person;
console.log(name,age);

const hobbies = [ 'Sports', 'Cooking' ];
const [hobby1, hobby2] = hobbies;
console.log(hobby1, hobby2);