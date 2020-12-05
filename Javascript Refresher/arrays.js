const mixTypes = ['Sports', 'Cooking', 1, true, {}];

for(let mix of mixTypes){
    console.log(mix);
}

const hobbies = ['Sports', 'Cooking'];

for(let hobby of hobbies){
    console.log(hobby);
}

console.log(hobbies.map(hobby => {
    return 'Hobby: '+ hobby;
}))

console.log(hobbies.map(hobby => 'Hobby: '+ hobby));
console.log(hobbies);


hobbies.push('Programming');
console.log(hobbies);