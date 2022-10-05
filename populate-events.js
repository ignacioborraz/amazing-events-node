require('dotenv').config()

// Importamos la conexion a la base de datos
const db = require('./config/database')

// Importar los modelos que necesito para las operaciones
const Event = require('./models/Event')

let events = [
    {
        image: "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas7.jpg",
        name: "Collectivities Party",
        date: "2021-12-12",
        description: "Enjoy your favourite dishes, from different countries, in a unique event for the whole family.",
        category: "633db9b1eccce87232ba2b2b",
        place: "Room A",
        capacity: "50000",
        assistance: "42756",
        price: 20,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo5.jpg",
        name: "Jurassic Park",
        date: "2021-11-02",
        description: "Let's go meet the biggest dinosaurs in the paleontology museum.",
        category: "633db9b1eccce87232ba2b2c",
        place: "Field",
        capacity: "100000",
        assistance: "65892",
        price: 6,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces1.jpg",
        name: "Halloween Night",
        date: "2022-02-12",
        description: "Come with your scariest costume and win incredible prizes.",
        category: "633db9b1eccce87232ba2b2d",
        place: "Room C",
        capacity: "12000",
        price: 14,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica1.jpg",
        name: "Metallica in concert",
        date: "2022-01-22",
        description: "The only concert of the most emblematic band in the world.",
        category: "633db9b1eccce87232ba2b2e",
        place: "Room A",
        capacity: "150000",
        price: 100,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton3.jpg",
        name: "10K 4 life",
        date: "2021-03-01",
        description: "Come and exercise, improve your health and lifestyle.",
        category: "633db9b1eccce87232ba2b2f",
        place: "Football field",
        capacity: "30000",
        assistance: "25698",
        price: 11,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Libros7.jpg",
        name: "School's book fair",
        date: "2022-10-15",
        description: "Bring your unused school book and take the one you need.",
        category: "633db9b1eccce87232ba2b30",
        place: "Room D1",
        capacity: "150000",
        price: 10,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Cine7.jpg",
        name: "Avengers",
        date: "2022-10-15",
        description: "Marvel's Avengers Premier in 3d, the start of an epic saga with your favourite superheroes.",
        category: "633db9b1eccce87232ba2b31",
        place: "Room D1",
        capacity: "9000",
        price: 8,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Cine1.jpg",
        name: "Spiderman",
        date: "2022-9-15",
        description: "Spiderman's Premier in 3d, the start of an epic saga with your favourite superheroes.",
        category: "633db9b1eccce87232ba2b31",
        place: "Room D1",
        capacity: "9000",
        price: 8,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Cine3.jpg",
        name: "Batman",
        date: "2021-3-11",
        description: "Come see Batman fight crime in Gotham City.",
        category: "633db9b1eccce87232ba2b31",
        place: "Room D1",
        capacity: "11000",
        assistance: "9300",
        price: 8,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Cine4.jpg",
        name: "Fredy",
        date: "2021-3-11",
        description: "The most terrifying character comes back.",
        category: "633db9b1eccce87232ba2b31",
        place: "Room D2",
        capacity: "11000",
        assistance: "10300",
        price: 8,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas2.jpg",
        name: "Korean style",
        date: "2021-08-12",
        description: "Enjoy the best Korean dishes, with international chefs and awesome events.",
        category: "633db9b1eccce87232ba2b2b",
        place: "Room A",
        capacity: "45000",
        assistance: "42756",
        price: 20,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas3.jpg",
        name: "Japanese style",
        date: "2021-06-15",
        description: "Enjoy the best Japanese dishes, with international chefs and awesome events.",
        category: "633db9b1eccce87232ba2b2b",
        place: "Room A",
        capacity: "45000",
        assistance: "42756",
        price: 20,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas4.jpg",
        name: "Straight from Middle East",
        date: "2021-10-12",
        description: "We gather Middle East's collectivities in a unique event to enjoy in family.",
        category: "633db9b1eccce87232ba2b2b",
        place: "Room B",
        capacity: "45000",
        assistance: "43000",
        price: 20,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas5.jpg",
        name: "Take away",
        date: "2021-10-12",
        description: "Are you a fast food lover? We have the event for you, were we gather the best fast food chains.",
        category: "633db9b1eccce87232ba2b2b",
        place: "Room C",
        capacity: "45000",
        assistance: "27000",
        price: 20,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas6.jpg",
        name: "Italian style",
        date: "2021-10-12",
        description: "Enjoy the best dishes in this awesome culinary event.",
        category: "633db9b1eccce87232ba2b2b",
        place: "Room A2",
        capacity: "55000",
        assistance: "48000",
        price: 20,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Libros1.jpg",
        name: "Fantasy books",
        date: "2022-3-13",
        description: "The best literary works of a captivating genre full of mythical characters.",
        category: "633db9b1eccce87232ba2b30",
        place: "Room D4",
        capacity: "150000",
        price: 3,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Libros2.jpg",
        name: "University text633db9b1eccce87232ba2b30",
        date: "2022-11-09",
        description: "Bring your unused textbooks and take one that you need.",
        category: "633db9b1eccce87232ba2b30",
        place: "Room D1",
        capacity: "170000",
        price: 10,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Libros3.jpg",
        name: "Just for your kitchen",
        date: "2021-11-09",
        description: "If you're a gastronomy lover come get the cookbook that best suits your taste and your family's.",
        category: "633db9b1eccce87232ba2b30",
        place: "Room D6",
        capacity: "130000",
        assistance: "90000",
        price: 10,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Libros4.jpg",
        name: "BestSeller",
        date: "2021-10-06",
        description: "Get to know the best works of literature and take the one that catches you the most.",
        category: "633db9b1eccce87232ba2b30",
        place: "Room D6",
        capacity: "140000",
        assistance: "110000",
        price: 10,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Libros5.jpg",
        name: "Horror and mistery novels",
        date: "2021-10-06",
        description: "Come get novels from some of the most acclaimed literature genres.",
        category: "633db9b1eccce87232ba2b30",
        place: "Room D1",
        capacity: "14000",
        assistance: "13000",
        price: 10,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Libros6.jpg",
        name: "Just Harry",
        date: "2021-10-06",
        description: "If you're a Potterhead you'll love this unique convention held in the city.",
        category: "633db9b1eccce87232ba2b30",
        place: "Room D6",
        capacity: "140000",
        assistance: "129000",
        price: 10,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces2.jpg",
        name: "Comicon",
        date: "2021-02-12",
        description: "For comic lovers, all your favourite characters gathered in one place.",
        category: "633db9b1eccce87232ba2b2d",
        place: "Room C",
        capacity: "120000",
        assistance: "110000",
        price: 14,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces3.jpg",
        name: "Comicon 2022",
        date: "2022-02-12",
        description: "If you enjoyed last year's, you'll love this one's.",
        category: "633db9b1eccce87232ba2b2d",
        place: "Room D",
        capacity: "220000",
        price: 14,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces4.jpg",
        name: "Spring Day",
        date: "2022-09-21",
        description: "Come celebrate spring dressed as your favourite character.",
        category: "633db9b1eccce87232ba2b2d",
        place: "Room H",
        capacity: "220000",
        price: 14,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces5.jpg",
        name: "Cultures",
        date: "2021-06-21",
        description: "A unique cultural event awaits you.",
        category: "633db9b1eccce87232ba2b2d",
        place: "Room G",
        capacity: "220000",
        assistance: "185000",
        price: 14,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces6.jpg",
        name: "For the little ones",
        date: "2021-09-23",
        description: "Bring your kid with his favourite costume.",
        category: "633db9b1eccce87232ba2b2d",
        place: "Room G",
        capacity: "10000",
        assistance: "9327",
        price: 14,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces7.jpg",
        name: "Epic party",
        date: "2021-09-23",
        description: "Come dressed as a pirate, firefighter, or a nurse, and we'll see who wins the big prize.",
        category: "633db9b1eccce87232ba2b2d",
        place: "Room H",
        capacity: "2000",
        assistance: "1856",
        price: 14,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Fiestadedisfraces8.jpg",
        name: "Halloween 2022",
        date: "2022-10-31",
        description: "Trick or treat? Come along with your scariest costume.",
        category: "633db9b1eccce87232ba2b2d",
        place: "Room F",
        capacity: "20000",
        price: 14,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton1.jpg",
        name: "15K NY",
        date: "2021-03-01",
        description: "We'll be raising funds for hospitals and medical care in this unique event held in The Big Apple.",
        category: "633db9b1eccce87232ba2b2f",
        place: "New York",
        capacity: "3000000",
        assistance: "2569800",
        price: 11,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton4.jpg",
        name: "Buenos Aires 2022",
        date: "2022-03-01",
        description: "Come join us in this marathon's 3ed edition.",
        category: "633db9b1eccce87232ba2b2f",
        place: "Buenos Aires",
        capacity: "300000",
        price: 11,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton5.jpg",
        name: "New York 2022",
        date: "2022-03-01",
        description: "We'll be expecting you in the 6th edition across the Big Apple.",
        category: "633db9b1eccce87232ba2b2f",
        place: "New York",
        capacity: "5000000",
        price: 11,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton6.jpg",
        name: "For Life 2nd Edition",
        date: "2022-03-01",
        description: "If you enjoyed las year's edition you'll love this one.",
        category: "633db9b1eccce87232ba2b2f",
        place: "Cordoba",
        capacity: "200000",
        price: 1,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton7.jpg",
        name: "Cancer Marathon",
        date: "2021-03-01",
        description: "We'll be raising funds for the cancer patients.",
        category: "633db9b1eccce87232ba2b2f",
        place: "Mar del Plata",
        capacity: "1800000",
        assistance: "1800000",
        price: 11,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica2.jpg",
        name: "Electronic Fest",
        date: "2021-01-22",
        description: "The best national and international DJs gathered in one place.",
        category: "633db9b1eccce87232ba2b2e",
        place: "Room A",
        capacity: "138000",
        assistance: "110300",
        price: 100,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica3.jpg",
        name: "Popular Music",
        date: "2021-05-22",
        description: "The best popular hits gathered in a unique event for the hole family to enjoy.",
        category: "633db9b1eccce87232ba2b2e",
        place: "Room C",
        capacity: "238000",
        assistance: "183300",
        price: 100,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica4.jpg",
        name: "Classics",
        date: "2021-05-22",
        description: "Come enjoy the best classics.",
        category: "633db9b1eccce87232ba2b2e",
        place: "Room B",
        capacity: "38000",
        assistance: "13300",
        price: 100,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica5.jpg",
        name: "Opera",
        date: "2022-05-22",
        description: "We gathered the best opera singers just for you.",
        category: "633db9b1eccce87232ba2b2e",
        place: "Room F",
        capacity: "138000",
        price: 100,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica6.jpg",
        name: "Reggaeton 2022",
        date: "2022-06-23",
        description: "Get ready to dance to the rhythm of the best bands.",
        category: "633db9b1eccce87232ba2b2e",
        place: "Room G",
        capacity: "2138000",
        price: 100,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica7.jpg",
        name: "Metallica in Buenos Aires",
        date: "2021-06-23",
        description: "We'll be having three opportunities for you to come listen to this 80s mythical band's hits.",
        category: "633db9b1eccce87232ba2b2e",
        place: "Buenos Aires",
        capacity: "138000",
        assistance: "137560",
        price: 100,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Conciertodemusica8.jpg",
        name: "San Francisco's Symphony",
        date: "2021-06-23",
        description: "You can't miss the opportunity to come see one of the world's best symphonies live.",
        category: "633db9b1eccce87232ba2b2e",
        place: "Buenos Aires",
        capacity: "38000",
        assistance: "36560",
        price: 100,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo1.jpg",
        name: "Parisian Museum",
        date: "2022-11-02",
        description: "A unique tour in the city of lights, get to know one of the most iconic places.",
        category: "633db9b1eccce87232ba2b2c",
        place: "Paris",
        capacity: "8200",
        price: 6,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo2.jpg",
        name: "Abstract Art",
        date: "2022-11-02",
        description: "An exhibition of selected artists explores the diverse approaches to abstraction developed since 1950.",
        category: "633db9b1eccce87232ba2b2c",
        place: "Buenos Aires",
        capacity: "1200",
        price: 6,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo3.jpg",
        name: "Buenos Aires' Museum 2022",
        date: "2022-11-02",
        description: "Unique works by international and national artists are waiting for you in this year's exhibition.",
        category: "633db9b1eccce87232ba2b2c",
        place: "Buenos Aires",
        capacity: "800",
        price: 6,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo4.jpg",
        name: "Buenos Aires' Museum",
        date: "2021-11-02",
        description: "Come enjoy the best wokrs by our local artists.",
        category: "633db9b1eccce87232ba2b2c",
        place: "Buenos Aires",
        capacity: "600",
        assistance: "550",
        price: 6,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo6.jpg",
        name: "Acropolis",
        date: "2021-11-02",
        description: "One of the most important museums in the world, houses the findings of only one archaeological site, the Athenian Acropolis.",
        category: "633db9b1eccce87232ba2b2c",
        place: "Athens",
        capacity: "1600",
        assistance: "1540",
        price: 6,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Salidaalmuseo7.jpg",
        name: "British Museum",
        date: "2022-09-02",
        description: "Culture and history combined in this unique space.",
        category: "633db9b1eccce87232ba2b2c",
        place: "England",
        capacity: "1200",
        price: 6,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Cine5.jpg",
        name: "Aladdin",
        date: "2021-3-11",
        description: "We invite you watch Disney's classic character in new adventures.",
        category: "633db9b1eccce87232ba2b31",
        place: "Room D2",
        capacity: "10000",
        assistance: "8300",
        price: 8,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Cine6.jpg",
        name: "X-men",
        date: "2022-3-11",
        description: "New characters, new adventures and a world in which they are not welcomed.",
        category: "633db9b1eccce87232ba2b31",
        place: "Room D2",
        capacity: "10000",
        price: 8,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Feriadecomidas1.jpg",
        name: "Arabic holidays",
        date: "2021-10-12",
        description: "An invitation to enjoy Middle East's flavours.",
        category: "633db9b1eccce87232ba2b2b",
        place: "Room A",
        capacity: "45000",
        assistance: "42756",
        price: 20,
        likes: []
    },{
        image: "https://amazingeventsapi.herokuapp.com/api/img/Maraton2.jpg",
        name: "15K Buenos Aires",
        date: "2021-03-01",
        description: "Join us for a healthier life and a cleaner city.",
        category: "633db9b1eccce87232ba2b2f",
        place: "Buenos Aires",
        capacity: "300000",
        assistance: "256980",
        price: 11,
        likes: []
    },{
        name: "Dr Strange 2",
        image: "https://images.thedirect.com/media/article_full/doctor-strange-multiverse-of-madness-review.jpg",
        date: "2022-10-01",
        description: "Dr. Stephen Strange opens a portal to the multiverse by using a forbidden spell. Now his team must face a threat that could destroy everything.",
        category: "633db9b1eccce87232ba2b31",
        place: "Showcase",
        capacity: 2500,
        price: 8
    },{
        name: "SpiderMan No Way Home",
        image: "https://www.muycomputer.com/wp-content/uploads/2021/08/Spider-Man.jpg",
        date: "2021-12-17",
        description: "The hero's life goes crazy after everyone knows their identity.",
        category: "633db9b1eccce87232ba2b31",
        place: "Showcase",
        capacity: 1500,
        price: 7
    },{
        name: "Wakanda Forever",
        image: "https://as01.epimg.net/meristation/imagenes/2022/09/19/noticias/1663586199_860097_1663586241_noticia_normal.jpg",
        date: "2022-11-10",
        description: "Invading forces from around the world target Wakanda's vibranium",
        category: "633db9b1eccce87232ba2b31",
        place: "Showcase",
        capacity: 1500,
        price: 7
    }
]

events.forEach(event => {
    Event.create({
        name: event.name,
        image: event.image,
        date: event.date,
        description: event.description,
        category: event.category,
        place: event.place,
        capacity: event.capacity,
        assistance: event.assistance? event.assistance : null,
        price: event.price,
        permition: false
    })
})