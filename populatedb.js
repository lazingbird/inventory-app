const userArgs = process.argv.slice(2);

const Guitar = require("./models/guitar");
const Category = require("./models/category");

const guitars = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: about to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createGuitars();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function guitarCreate(index, name, description, category, price, stock) {
  const guitardetail = {
    name: name,
    description: description,
    category: category,
    price: price,
  };
  stock ? (guitardetail.stock = stock) : 0;

  const guitar = new Guitar(guitardetail);

  await guitar.save();
  guitars[index] = guitar;
  console.log(`Added guitar: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Acoustic Guitars"),
    categoryCreate(1, "Baroque Guitars"),
    categoryCreate(2, "Lute Guitars"),
    categoryCreate(3, "Weissenborn Guitars"),
    categoryCreate(4, "Bass Guitars"),
    categoryCreate(5, "Renaissance Guitars"),
  ]);
}

async function createGuitars() {
  console.log("Adding guitars");
  await Promise.all([
    guitarCreate(
      0,
      "Heartland 4-4 Student Nylon Classic Guitar",
      "Our Heartland range of full size classical guitars are the ideal starter for children, with softer strings and a wide, flat fretboard, making it a natural fit for those.",
      categories[0],
      79.99,
      1
    ),
    guitarCreate(
      1,
      "Heartland Spirit Dreadnought Steel String Guitar Kit Black",
      "The Heartland Spirit Dreadnought Steel String Guitar Kit is ourFull-Size Steel String Model in a Black finish.",
      categories[0],
      139.99,
      3
    ),
    guitarCreate(
      2,
      "Heartland Sellas Baroque Guitar, 5 Course Lacewood",
      "The Baroque guitar (c. 1600–1750) is a string instrument with five courses of strings and movable frets. The first (highest pitched) course sometimes used only a single string.",
      categories[1],
      969.99,
      1
    ),
    guitarCreate(
      3,
      "Lute Guitar, 6 String Variegated Lacewood Rosewood",
      "Lute guitars are instruments of same scale length as regular classical guitar and can be played like one but with a body/bowl made like a lute. It is a six stringed instrument like classical guitar.",
      categories[2],
      684.99,
      1
    ),
    guitarCreate(
      4,
      "Heartland Weissenborn guitar The Session Master",
      "Weissenborn guitars first originated from the Los Angeles and Hawaii music scenes of the 1920/30's. These days such contemporary folk artists like David Lindley, Ben Harper have spearheaded the re-emergence of these instruments into the mainstream guitarists hands.",
      categories[3],
      499.99
    ),
    guitarCreate(
      5,
      "Heartland Weissenborn guitar The Stage Master",
      "These weissenborn guitars are very versatile instruments when it comes to various tuning scales and styles, a variety of string gauges work well on these instruments, whether it's a heavy full one man band sound or a mellow picking and sliding harmonic style.",
      categories[3],
      724.99,
      3
    ),
    guitarCreate(
      6,
      "Muzikkon Electro-Acoustic Jumbo Bass Guitar, 4 String",
      "This electro-acoustic bass comes with D'Addario copper wound bass strings that give off a warm but punchy sound to this solid spruce top, long scaled bass.",
      categories[4],
      314.99
    ),
    guitarCreate(
      7,
      "Muzikkon Jumbo Acoustic Bass Guitar, 4 String",
      "This acoustic bass comes with D'Addario copper wound bass strings that give off a warm but punchy sound to this solid spruce top, long scaled bass.",
      categories[4],
      249.99
    ),
    guitarCreate(
      7,
      "Renaissance guitar, 4 Course Variegated Maple Ebony",
      "Body made of alternating staves of Solid Maple and Solid Ebony.",
      categories[5],
      944.99,
      1
    ),
  ]);
}
