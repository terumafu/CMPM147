// project.js - purpose and description here
// Author: Your Name
// Date:

// NOTE: This is how we might start a basic JavaaScript OOP project

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const fillers = {
  main: ["Raspberry", "Blueberry", "Huckleberry", "Strawberry", "Melon", "Citrus", "Lemon", "Scandanavian"],
  pre: ["Sour", "Sugar", "Giga", "Dyna", "Crazy", "Wacko"],
  post: ["Swimmers", "Blast", "Bombs","Chews", "Blitzers", "Gumdrops", "Jawbreakers"],
  descriptor: ["ooiest", "gooiest", "most sour", "most delicious", "sweetest", "tastiest", "hardest", "crackliest"],
  
};

const template = `Hey you!

Have you heard of the new candy thats selling like hotcakes? \n
$pre-$main $post is the $descriptor candy thats getting swept off the shelves!
`;
const slotPattern = /\$(\w+)/;
  
function replacer(match, name) {
  let options = fillers[name];
  if (options) {
    return options[Math.floor(Math.random() * options.length)];
  } else {
    return `<UNKNOWN:${name}>`;
  }
}

function generate() {
  let story = template;
  while (story.match(slotPattern)) {
    story = story.replace(slotPattern, replacer);
  }

  /* global box */
  $("#box").text(story);

}

$("#clicker").click(generate);
  
  generate();

function main() {
  
  
  
  // STUDENTS: You don't need to edit code below this line.
  
  
  /* global clicker */
  
  
}

// let's get this party started - uncomment me
//main();