const sum = (a,b) => {
    if(a && b){
      return a+b;
    }
  throw new Error("Invalid arguments");
}
try{
  console.log(sum(1));
}catch(error){
  console.log('Error occured!')
  //console.log(error);
}
console.log('This works!');



/*const sum = (a,b) => {
  return a+b;
};
console.log(sum(2,3));
console.log(sum(2)); */