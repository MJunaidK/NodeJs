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

person.greet();