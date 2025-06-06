"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Проверяем наличие данных в таблицах
    const regionsCount = await queryInterface.sequelize.query(
      'SELECT COUNT(*) FROM "Regions"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const brandsCount = await queryInterface.sequelize.query(
      'SELECT COUNT(*) FROM "Brands"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const carModelsCount = await queryInterface.sequelize.query(
      'SELECT COUNT(*) FROM "CarModels"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Если в любой из таблиц уже есть данные, пропускаем сиды
    if (
      regionsCount[0].count > 0 ||
      brandsCount[0].count > 0 ||
      carModelsCount[0].count > 0
    ) {
      console.log(
        "База данных уже содержит начальные данные. Пропускаем сиды."
      );
      return;
    }

    // Добавление регионов
    await queryInterface.bulkInsert(
      "Regions",
      [
        "Москва",
        "Санкт-Петербург",
        "Алтайский край",
        "Амурская область",
        "Архангельская область",
        "Астраханская область",
        "Белгородская область",
        "Брянская область",
        "Владимирская область",
        "Волгоградская область",
        "Воронежская область",
        "Еврейская автономная область",
        "Забайкальский край",
        "Ивановская область",
        "Иркутская область",
        "Кабардино-Балкарская Респ.",
        "Калининградская область",
        "Калужская область",
        "Камчатский край",
        "Карачаево-Черкесская Респ.",
        "Кемеровская область (Кузбасс)",
        "Кировская область",
        "Костромская область",
        "Красноярский край",
        "Курганская область",
        "Курская область",
        "Липецкая область",
        "Магаданская область",
        "Мурманская область",
        "Ненецкий автономный округ",
        "Нижегородская область",
        "Новгородская область",
        "Новосибирская область",
        "Омская область",
        "Оренбургская область",
        "Орловская область",
        "Пензенская область",
        "Пермский край",
        "Приморский край",
        "Псковская область",
        "Респ. Адыгея",
        "Респ. Алтай",
        "Респ. Башкортостан",
        "Респ. Бурятия",
        "Респ. Дагестан",
        "Респ. Ингушетия",
        "Респ. Калмыкия",
        "Респ. Карелия",
        "Респ. Коми",
        "Респ. Крым",
        "Респ. Марий Эл",
        "Респ. Мордовия",
        "Респ. Саха (Якутия)",
        "Респ. Северная Осетия - Алания",
        "Респ. Татарстан",
        "Респ. Тыва",
        "Респ. Хакасия",
        "Ростовская область",
        "Рязанская область",
        "Самарская область",
        "Саратовская область",
        "Сахалинская область",
        "Свердловская область",
        "Смоленская область",
        "Ставропольский край",
        "Тверская область",
        "Томская область",
        "Тульская область",
        "Тюменская область",
        "Удмуртская Респ.",
        "Ульяновская область",
        "Хабаровский край",
        "Ханты-Мансийский автономный округ - Югра",
        "Челябинская область",
        "Чеченская Респ.",
        "Чувашская Респ.",
        "Чукотский автономный округ",
        "Ямало-Ненецкий автономный округ",
        "Ярославская область",
      ].map((name) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Добавление брендов
    await queryInterface.bulkInsert(
      "Brands",
      [
        "Lada (BA3)",
        "Audi",
        "BELGEE",
        "BMW",
        "Changan",
        "CHERY",
        "Chevrolet",
        "Citroen",
        "Daewoo",
        "Exeed",
        "Ford",
        "GAC",
        "Geely",
        "Haval",
        "Honda",
        "Hyundai",
        "Infiniti",
        "Jaecoo",
        "Jetour",
        "Kia",
        "Land Rover",
        "Lexus",
        "LiXiang",
        "Mazda",
        "Mercedes-Benz",
        "Mitsubishi",
        "Nissan",
        "Omoda",
        "Opel",
        "Peugeot",
        "Porsche",
        "Renault",
        "Skoda",
        "Ssang Yong",
        "Subaru",
        "Suzuki",
        "Tank",
        "Toyota",
        "Volkswagen",
        "Volvo",
        "УАЗ",
        "Genesis",
        "Jaguar",
        "Tesla",
        "Jeep",
        "Cadillac",
        "Ram",
        "SEAT",
        "Alfa Romeo",
        "Dacia",
        "Zeekr",
        "Hongqi",
        "FAW",
      ].map((name) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Получаем ID брендов
    const brands = await queryInterface.sequelize.query(
      'SELECT id, name FROM "Brands"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Создаем объект с соответствием названий брендов их ID
    const brandIds = {};
    brands.forEach((brand) => {
      brandIds[brand.name] = brand.id;
    });

    // Добавление моделей (базовые модели для некоторых популярных брендов)
    const carModels = [
      // Lada (BA3)
      {
        brandName: "Lada (BA3)",
        models: [
          "1111 Ока",
          "2101",
          "2102",
          "2103",
          "2104",
          "2105",
          "2106",
          "2107",
          "2108",
          "2109",
          "21099",
          "2110",
          "2111",
          "2112",
          "2113",
          "2114",
          "2115",
          "2619",
          "2121 (4x4)",
          "2123",
          "2129",
          "2131 (4x4)",
          "2329",
          "Aura",
          "Granta",
          "Kalina",
          "Largus",
          "Niva",
          "Niva Legend",
          "Priora",
          "Vesta",
          "XRAY",
        ],
      },
      // Audi
      {
        brandName: "Audi",
        models: [
          "100",
          "80",
          "A1",
          "A2",
          "A3",
          "A4",
          "A5",
          "A6",
          "A7",
          "A8",
          "e-tron",
          "Q2",
          "Q3",
          "Q4",
          "Q5",
          "Q6",
          "Q7",
          "Q8",
          "RS",
          "TT",
        ],
      },
      // BMW
      {
        brandName: "BMW",
        models: [
          "1 серии",
          "2 серии",
          "3 серии",
          "4 серии",
          "5 серии",
          "6 серии",
          "7 серии",
          "8 серии",
          "i серия",
          "M",
          "X1",
          "X2",
          "X3",
          "X4",
          "X5",
          "X6",
          "X7",
          "XM",
          "Z3",
          "Z4",
        ],
      },
      // Mercedes-Benz
      {
        brandName: "Mercedes-Benz",
        models: [
          "190 (W201)",
          "A-Класс",
          "AMG GT",
          "B-Класс",
          "C-Класс",
          "CL-Класс",
          "CLA",
          "CLC-Класс",
          "CLK-Класс",
          "CLS",
          "E-Класс",
          "G-Класс",
          "GL-Класс",
          "GLA",
          "GLB",
          "GLC",
          "GLC Coupe",
          "GLE",
          "GLE Coupe",
          "GLK-Класс",
          "GLS",
          "M-Класс",
          "R-Класс",
          "S-Класс",
          "SL-Класс",
          "SLK-Класс",
          "V-Класс",
          "Viano",
          "Vito",
          "W123",
          "W124",
        ],
      },
      // Toyota
      {
        brandName: "Toyota",
        models: [
          "4Runner",
          "Allex",
          "Allion",
          "Alphard",
          "Altezza",
          "Aqua",
          "Aristo",
          "Auris",
          "Avalon",
          "Avensis",
          "bB",
          "Belta",
          "Brevis",
          "bZ4X",
          "C-HR",
          "Caldina",
          "Camry",
          "Carina",
          "Carina E",
          "Celica",
          "Chaser",
          "Corolla",
          "Corolla Cross",
          "Corolla Rumion",
          "Corolla Spacio",
          "Corolla Verso",
          "Corona",
          "Corsa",
          "Cresta",
          "Crown",
          "Crown Kluger",
          "Duet",
          "Echo",
          "Esquire",
          "Estima",
          "FJ Cruiser",
          "Fortuner",
          "Frontlander",
          "FunCargo",
          "Gaia",
          "GR86",
          "Granvia",
          "GT86",
          "Harrier",
          "HiAce",
          "Highlander",
          "Hilux",
          "Hilux Surf",
          "Ipsum",
          "ISis",
          "Ist",
          "Izoa",
          "Kluger",
          "Land Cruiser",
          "Land Cruiser Prado",
          "Levin",
          "Lite Ace",
          "Mark II",
          "Mark X",
          "Matrix",
          "Nadia",
          "Noah",
          "Opa",
          "Passo",
          "Platz",
          "Porte",
          "Premio",
          "Prius",
          "Prius Alpha",
          "Probox",
          "Ractis",
          "Raize",
          "Raum",
          "RAV4",
          "Roomy",
          "Rush",
          "Sai",
          "Sequoia",
          "Sienna",
          "Sienta",
          "Spade",
          "Sprinter",
          "Succeed",
          "Supra",
          "Tacoma",
          "Tank",
          "Town Ace",
          "Tundra",
          "Vellfire",
          "Venza",
          "Verso",
          "Vista",
          "Vitz",
          "Voxy",
          "Wildlander",
          "Windom",
          "Wish",
          "Yaris",
          "Yaris Cross",
        ],
      },
      // Volkswagen
      {
        brandName: "Volkswagen",
        models: [
          "Amarok",
          "Arteon",
          "Atlas",
          "Beetle",
          "Bora",
          "Caddy",
          "Caravelle",
          "Golf",
          "Golf GTI",
          "Golf Plus",
          "Golf R",
          "ID.3",
          "ID.4",
          "ID.6",
          "Jetta",
          "Lavida",
          "Multivan",
          "Passat",
          "Passat CC",
          "Phaeton",
          "Pointer",
          "Polo",
        ],
      },
      // Kia
      {
        brandName: "Kia",
        models: [
          "Avella",
          "Carens",
          "Carnival",
          "Ceed",
          "Cerato",
          "EV6",
          "K3",
          "K5",
          "K7",
          "K8",
          "Magentis",
          "Mohave",
          "Morning",
          "Optima",
          "Picanto",
          "Quoris",
          "Ray",
          "Rio",
          "Seltos",
          "Sorento",
          "Soul",
          "Spectra",
          "Sportage",
          "Stinger",
          "Venga",
        ],
      },
      // Hyundai
      {
        brandName: "Hyundai",
        models: [
          "Accent",
          "Avante",
          "Casper",
          "Creta",
          "Elantra",
          "Equus",
          "Genesis",
          "Getz",
          "Grand Starex",
          "Grandeur",
          "H-1",
          "i20",
          "i30",
          "i40",
          "ix35",
          "ix55",
          "Kona",
          "Matrix",
          "Mufasa",
          "Palisade",
          "Santa Fe",
          "Solaris",
          "Sonata",
          "Starex",
          "Staria",
          "Terracan",
          "Tucson",
          "Veloster",
          "Venue",
        ],
      },
      // Nissan
      {
        brandName: "Nissan",
        models: [
          "AD",
          "Almera",
          "Almera Classic",
          "Altima",
          "Avenir",
          "Bluebird",
          "Cefiro",
          "Cube",
          "Dayz",
          "Elgrand",
          "Juke",
          "Laurel",
          "Leaf",
          "Liberty",
          "March",
          "Maxima",
          "Micra",
          "Murano",
          "Navara (Frontier)",
          "Note",
          "NV200",
          "Pathfinder",
          "Patrol",
          "Presage",
          "Primera",
          "Qashqai",
          "Rogue",
          "Sentra",
          "Serena",
          "Skyline",
          "Sunny",
          "Sylphy",
          "Teana",
          "Terrano",
          "Tiida",
          "Wingroad",
          "X-Trail",
        ],
      },
      // Honda
      {
        brandName: "Honda",
        models: [
          "Accord",
          "Airwave",
          "Breeze",
          "Civic",
          "Civic Ferio",
          "Civic Type R",
          "CR-V",
          "CR-Z",
          "Crider",
          "Crossroad",
          "Crosstour",
          "Elysion",
          "Fit",
          "Fit Shuttle",
          "Freed",
          "HR-V",
          "Insight",
          "Inspire",
          "Integra",
          "Jade",
          "Jazz",
          "N-BOX",
          "N-WGN",
          "Odyssey",
          "Partner",
          "Pilot",
          "Shuttle",
          "Stepwgn",
          "Stream",
          "Torneo",
          "UR-V",
          "Vezel",
          "XR-V",
        ],
      },
      // Mazda
      {
        brandName: "Mazda",
        models: [
          "2",
          "3",
          "323",
          "5",
          "6",
          "626",
          "Atenza",
          "Axela",
          "Bongo",
          "BT-50",
          "Capella",
          "CX-3",
          "CX-30",
          "CX-4",
          "CX-5",
          "CX-50",
          "CX-60",
          "CX-7",
          "CX-8",
          "CX-9",
          "Demio",
          "Familia",
          "MPV",
          "MX-5",
          "Premacy",
          "RX-8",
          "Tribute",
        ],
      },
      // Mitsubishi
      {
        brandName: "Mitsubishi",
        models: [
          "Airtrek",
          "ASX",
          "Carisma",
          "Chariot",
          "Colt",
          "Delica",
          "Delica D:5",
          "Eclipse Cross",
          "eK Wagon",
          "Galant",
          "Grandis",
          "L200",
          "Lancer",
          "Mirage",
          "Montero",
          "Outlander",
          "Pajero",
          "Pajero Sport",
          "RVR",
          "Space Star",
        ],
      },
      // Subaru
      {
        brandName: "Subaru",
        models: [
          "Ascent",
          "BRZ",
          "Crosstrek",
          "Forester",
          "Impreza",
          "Legacy",
          "Levorg",
          "Outback",
          "Tribeca",
          "WRX",
          "XV",
        ],
      },
      // Lexus
      {
        brandName: "Lexus",
        models: [
          "CT",
          "ES",
          "GS",
          "GX",
          "IS",
          "LC",
          "LM",
          "LS",
          "LX",
          "NX",
          "RX",
          "RZ",
          "SC",
          "TX",
        ],
      },
      // Infiniti
      {
        brandName: "Infiniti",
        models: [
          "EX",
          "FX",
          "G",
          "JX",
          "M",
          "Q50",
          "Q70",
          "QX50",
          "QX55",
          "QX56",
          "QX60",
          "QX70",
          "QX80",
        ],
      },
      // Genesis
      {
        brandName: "Genesis",
        models: ["G70", "G80", "G90", "GV60", "GV70", "GV80", "GV80 Coupe"],
      },
      // Tesla
      {
        brandName: "Tesla",
        models: ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y"],
      },
      // Jeep
      {
        brandName: "Jeep",
        models: [
          "Avenger",
          "Cherokee",
          "Commander",
          "Compass",
          "Gladiator",
          "Grand Cherokee",
          "Liberty (Patriot)",
          "Renegade",
          "Wagoneer",
          "Wrangler",
        ],
      },
      // Land Rover
      {
        brandName: "Land Rover",
        models: [
          "Defender",
          "Discovery",
          "Discovery Sport",
          "Freelander",
          "Range Rover",
          "Range Rover Evoque",
          "Range Rover Sport",
          "Range Rover Velar",
        ],
      },
      // Jaguar
      {
        brandName: "Jaguar",
        models: [
          "E-Pace",
          "E-type",
          "F-Pace",
          "F-Type",
          "I-Pace",
          "S-Type",
          "X-Type",
          "XE",
          "XF",
          "XJ",
          "XJR",
          "XKR",
        ],
      },
      // Porsche
      {
        brandName: "Porsche",
        models: [
          "718 Spyder",
          "911",
          "Boxster",
          "Cayenne",
          "Cayman",
          "Macan",
          "Panamera",
          "Taycan",
        ],
      },
      // Volvo
      {
        brandName: "Volvo",
        models: [
          "240",
          "440",
          "460",
          "740",
          "850",
          "940",
          "960",
          "C30",
          "C70",
          "S40",
          "S60",
          "S70",
          "S80",
          "S90",
          "V40",
          "V40 Cross Country",
          "V50",
          "V60",
          "V60 Cross Country",
          "V70",
          "V90",
          "V90 Cross Country",
          "XC40",
          "XC60",
          "XC70",
          "XC90",
        ],
      },
      // УАЗ
      {
        brandName: "УАЗ",
        models: ["3151", "3153", "469", "Hunter", "Patriot", "Pickup"],
      },
      // Cadillac
      {
        brandName: "Cadillac",
        models: [
          "ATS",
          "BLS",
          "CT4",
          "CT5",
          "CT6",
          "CTS",
          "Escalade",
          "Lyriq",
          "SRX",
          "XT4",
          "XT5",
          "XT6",
        ],
      },
      // Ram
      {
        brandName: "Ram",
        models: ["1500", "ProMaster City", "TRX"],
      },
      // SEAT
      {
        brandName: "SEAT",
        models: [
          "Alhambra",
          "Altea",
          "Arona",
          "Arosa",
          "Ateca",
          "Cordoba",
          "Ibiza",
          "Leon",
          "Leon Cupra",
          "Tarraco",
          "Toledo",
        ],
      },
      // Alfa Romeo
      {
        brandName: "Alfa Romeo",
        models: [
          "145",
          "146",
          "147",
          "155",
          "156",
          "159",
          "164",
          "166",
          "33",
          "4C",
          "Brera",
          "Giulia",
          "Giulietta",
          "GT",
          "Spider",
          "Stelvio",
        ],
      },
      // Dacia
      {
        brandName: "Dacia",
        models: [
          "Dokker",
          "Duster",
          "Lodgy",
          "Logan",
          "Sandero",
          "Solenza",
          "Spring",
          "SuperNova",
        ],
      },
      // Zeekr
      {
        brandName: "Zeekr",
        models: ["001", "007", "009", "7x", "mix", "x"],
      },
      // Hongqi
      {
        brandName: "Hongqi",
        models: ["E-HS9", "E-QM5", "H5", "H9", "HQ9", "HS3", "HS5", "HS7"],
      },
      // FAW
      {
        brandName: "FAW",
        models: [
          "Bestune B70",
          "Bestune B70S",
          "Bestune M9",
          "Bestune T55",
          "Bestune T77",
          "Bestune T90",
          "Bestune T99",
          "Besturn B50",
          "Besturn X40",
          "Besturn X80",
          "Oley",
          "V5",
          "Vita",
        ],
      },
      // Changan
      {
        brandName: "Changan",
        models: [
          "Alsvin",
          "CS35",
          "CS55",
          "CS75",
          "CS85",
          "CS95",
          "Eado",
          "Hunter",
          "Lamore",
          "UNI-K",
          "UNI-S (CS55 Plus)",
          "UNI-T",
          "UNI-V",
          "UNI-Z",
        ],
      },
      // CHERY
      {
        brandName: "CHERY",
        models: [
          "Amulet (A15)",
          "Arrizo 5",
          "Arrizo 8",
          "Bonus (A13)",
          "Fora (A21)",
          "Kimo (A1)",
          "Tiggo (T11)",
          "Tiggo 3",
          "Tiggo 4",
          "Tiggo 4 Pro",
          "Tiggo 5",
          "Tiggo 7",
          "Tiggo 7 Pro",
          "Tiggo 7 Pro Max",
          "Tiggo 7 Pro Plug-in Hybrid",
          "Tiggo 8",
          "Tiggo 8 Pro",
          "Tiggo 8 Pro Max",
          "Tiggo 9",
        ],
      },
      // Chevrolet
      {
        brandName: "Chevrolet",
        models: [
          "Aveo",
          "Camaro",
          "Captiva",
          "Cobalt",
          "Cruze",
          "Epica",
          "Equinox",
          "Express",
          "Lacetti",
          "Lanos",
          "Malibu",
          "Monza",
          "Nexia",
          "Niva",
          "Orlando",
          "Rezzo",
          "Spark",
          "Tahoe",
          "TrailBlazer",
          "Trax",
        ],
      },
      // Citroen
      {
        brandName: "Citroen",
        models: [
          "Berlingo",
          "C-Crosser",
          "C-Elysee",
          "C3",
          "C3 Picasso",
          "C4",
          "C4 Picasso",
          "C5",
          "C5 Aircross",
          "C5 X",
          "DS4",
          "Jumpy",
          "SpaceTourer",
          "Xsara Picasso",
        ],
      },
      // Daewoo
      {
        brandName: "Daewoo",
        models: [
          "Espero",
          "Gentra",
          "Lacetti",
          "Lanos",
          "Leganza",
          "Matiz",
          "Nexia",
        ],
      },
      // Exeed
      {
        brandName: "Exeed",
        models: ["LX", "RX", "TXL", "VX"],
      },
      // Ford
      {
        brandName: "Ford",
        models: [
          "Bronco",
          "C-MAX",
          "EcoSport",
          "Edge",
          "Escape",
          "Explorer",
          "F-150",
          "Fiesta",
          "Focus",
          "Fusion",
          "Galaxy",
          "Kuga",
          "Maverick",
          "Mondeo",
          "Mustang",
          "Ranger",
          "S-MAX",
          "Scorpio",
          "Sierra",
          "Tourneo Connect",
          "Tourneo Custom",
          "Transit Connect",
        ],
      },
      // GAC
      {
        brandName: "GAC",
        models: ["Empow", "GN8", "GS3", "GS4", "GS5", "GS8", "M8"],
      },
      // Geely
      {
        brandName: "Geely",
        models: [
          "Atlas",
          "Atlas Pro",
          "Binyue",
          "Cityray",
          "Coolray",
          "Emgrand",
          "Emgrand EC7",
          "Emgrand X7",
          "Icon",
          "Jiaji",
          "MK",
          "MK Cross",
          "Monjaro",
          "Okavango",
          "Preface",
          "Tugella",
        ],
      },
      // Haval
      {
        brandName: "Haval",
        models: [
          "DaGou (Big Dog)",
          "Dargo",
          "F7",
          "F7x",
          "H3",
          "H5",
          "H6",
          "H7",
          "H9",
          "Jolion",
          "M6",
        ],
      },
      // Jaecoo
      {
        brandName: "Jaecoo",
        models: ["J7", "J8"],
      },
      // Jetour
      {
        brandName: "Jetour",
        models: ["Dashing", "T2", "X50", "X70", "X70 PLUS", "X90", "X90 PLUS"],
      },
      // Omoda
      {
        brandName: "Omoda",
        models: ["C5", "S5", "S5 GT"],
      },
      // Opel
      {
        brandName: "Opel",
        models: [
          "Antara",
          "Astra",
          "Combo",
          "Corsa",
          "Frontera",
          "Grandland",
          "Insignia",
          "Meriva",
          "Mokka",
          "Omega",
          "Vectra",
          "Vivaro",
          "Zafira",
        ],
      },
      // Peugeot
      {
        brandName: "Peugeot",
        models: [
          "107",
          "2008",
          "206",
          "207",
          "208",
          "3008",
          "301",
          "307",
          "308",
          "4007",
          "4008",
          "406",
          "407",
          "408",
          "5008",
          "508",
          "607",
          "Expert",
          "Partner",
          "RCZ",
          "Traveller",
        ],
      },
      // Renault
      {
        brandName: "Renault",
        models: [
          "Arkana",
          "Captur",
          "Clio",
          "Duster",
          "Espace",
          "Fluence",
          "Kangoo",
          "Kaptur",
          "Koleos",
          "Laguna",
          "Latitude",
          "Logan",
          "Megane",
          "Sandero",
          "Scenic",
          "Symbol",
          "Talisman",
          "Trafic",
        ],
      },
      // Skoda
      {
        brandName: "Skoda",
        models: [
          "Fabia",
          "Felicia",
          "Kamiq",
          "Karoq",
          "Kodiaq",
          "Kodiaq GT",
          "Octavia",
          "Octavia RS",
          "Rapid",
          "Roomster",
          "Superb",
          "Yeti",
        ],
      },
      // SsangYong
      {
        brandName: "Ssang Yong",
        models: [
          "Actyon",
          "Actyon Sports",
          "Istana",
          "Korando",
          "Kyron",
          "Musso",
          "Rexton",
          "Tivoli",
          "Torres",
        ],
      },
      // Suzuki
      {
        brandName: "Suzuki",
        models: [
          "Aerio",
          "Alto",
          "Baleno",
          "Escudo",
          "Grand Vitara",
          "Hustler",
          "Ignis",
          "Jimny",
          "Liana",
          "Solio",
          "Splash",
          "Swift",
          "SX4",
          "Vitara",
          "Wagon R",
        ],
      },
      // Tank
      {
        brandName: "Tank",
        models: ["300", "400", "500", "700"],
      },
    ];

    // Создаем массив для bulk insert моделей
    const carModelsToInsert = [];
    carModels.forEach((brand) => {
      if (brandIds[brand.brandName]) {
        brand.models.forEach((modelName) => {
          carModelsToInsert.push({
            brandId: brandIds[brand.brandName],
            name: modelName,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      }
    });

    await queryInterface.bulkInsert("CarModels", carModelsToInsert);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("CarModels", null, {});
    await queryInterface.bulkDelete("Brands", null, {});
    await queryInterface.bulkDelete("Regions", null, {});
  },
};
