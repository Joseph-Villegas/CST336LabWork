var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('planets', {
        name: "Earth",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/EarthRender_%28square%29.png",
        stats: {
            area: "196.9 million sq miles",
            density: "5.51 g / centimeter cubed",
            day_length: "24 hours",
            temperature: "57.2 f"
        },
        wiki: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. According to radiometric dating and other sources of evidence, Earth formed over 4.5 billion years ago.[23][24][25] Earth's gravity interacts with other objects in space, especially the Sun and the Moon, which is Earth's only natural satellite. Earth orbits around the Sun in 365.26 days, a period known as an Earth year. During this time, Earth rotates about its axis about 366.26 times."

    });
});

router.get('/earth', function(req, res, next) {
    res.render('planets', {
        name: "Earth",
        image: "https://upload.wikimedia.org/wikipedia/commons/5/5b/EarthRender_%28square%29.png",
        stats: {
            area: "196.9 million sq miles",
            density: "5.51 g / centimeter cubed",
            day_length: "24 hours",
            temperature: "57.2 f"
        },
        wiki: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. According to radiometric dating and other sources of evidence, Earth formed over 4.5 billion years ago.[23][24][25] Earth's gravity interacts with other objects in space, especially the Sun and the Moon, which is Earth's only natural satellite. Earth orbits around the Sun in 365.26 days, a period known as an Earth year. During this time, Earth rotates about its axis about 366.26 times."

    });
});

router.get('/jupiter', function(req, res, next) {
    res.render('planets', {
        name: "Jupiter",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019_-_Edited.jpg/440px-Jupiter%2C_image_taken_by_NASA%27s_Hubble_Space_Telescope%2C_June_2019_-_Edited.jpg",
        stats: {
            area: "21.71 billion sq miles",
            density: "1.33 g / centimeter cubed",
            day_length: "9 hours, 56 minutes",
            temperature: "- 234 f"
        },
        wiki: "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter has been known to astronomers since antiquity.[18] It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast shadows,[20] and is on average the third-brightest natural object in the night sky after the Moon and Venus."
    });
});

router.get('/mars', function(req, res, next) {
    res.render('planets', {
        name: "Mars",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1200px-OSIRIS_Mars_true_color.jpg",
        stats: {
            area: "55.9 million sq miles",
            density: "3.93 g / centimeter cubed",
            day_length: "24 hours, 37 minutes",
            temperature: "195 f"
        },
        wiki: "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System after Mercury. In English, Mars carries a name of the Roman god of war and is often referred to as the 'Red Planet'.[15][16] The latter refers to the effect of the iron oxide prevalent on Mars' surface, which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye.[17] Mars is a terrestrial planet with a thin atmosphere, having surface features reminiscent both of the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth."
    });
});

router.get('/saturn', function(req, res, next) {
    res.render('planets', {
        name: "Saturn",
        image: "https://cosmos-production-assets.s3.amazonaws.com/file/spina/photo/17787/190123-saturn-pr.jpg",
        stats: {
            area: "198 trillion sq miles",
            density: "0.68 g / centimeter cubed",
            day_length: "10 hours, 42 minutes",
            temperature: "- 288 f"
        },
        wiki: "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth.[14][15] It has only one-eighth the average density of Earth; however, with its larger volume, Saturn is over 95 times more massive.[16][17][18] Saturn is named after the Roman god of wealth and agriculture; its astronomical symbol (♄) represents the god's sickle."
    });
});

router.get('/mercury', function(req, res, next) {
    res.render('planets', {
        name: "Mercury",
        image: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Mercury_in_color_-_Prockter07-edit1.jpg",
        stats: {
            area: "46 million sq miles",
            density: "5.42 g / centimeter cubed",
            day_length: "58 days, 15 hours, 30 minutes",
            temperature: "332 f"
        },
        wiki: "Mercury is the smallest and innermost planet in the Solar System. Its orbit around the Sun takes only 87.97 days, the shortest of all the planets in the Solar System. It is named after the Roman deity Mercury, the messenger of the gods."
    });
});

module.exports = router;