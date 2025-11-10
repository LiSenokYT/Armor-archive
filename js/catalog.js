// Catalog functionality for ground vehicles page - UPDATED

class VehicleCatalog {
    constructor() {
        this.vehicles = [];
        this.filteredVehicles = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.filters = {
            search: '',
            type: 'all',
            country: 'all',
            era: 'all',
            yearFrom: '',
            yearTo: '',
            caliber: 'all',
            crew: 'all',
            weight: 'all'
        };
        this.sortBy = 'name';
        this.viewMode = 'grid';
        this.filtersVisible = false;
        
        this.init();
    }

    init() {
        this.loadVehicles();
        this.bindEvents();
        this.applyFilters();
        this.toggleFilters(false); // Start with filters collapsed
    }

    // Sample vehicle data with expanded types
    loadVehicles() {
        this.vehicles = [
            // Основные боевые танки (ОБТ)
            {
                id: 1,
                name: "Т-72Б3",
                country: "ussr",
                type: "mbt",
                era: "modern",
                year: 2016,
                weight: 46,
                crew: 3,
                caliber: 125,
                image: "",
                description: "Современная модернизация основного боевого танка Т-72 с улучшенной защитой и системами управления огнём.",
                specs: {
                    speed: 60,
                    engine: "В-84-1, 840 л.с.",
                    armor: "Комбинированная",
                    mainGun: "125mm 2A46M"
                }
            },
            {
                id: 2,
                name: "M1A2 Abrams",
                country: "usa",
                type: "mbt",
                era: "modern",
                year: 1992,
                weight: 63,
                crew: 4,
                caliber: 120,
                image: "",
                description: "Американский основной боевой танк третьего поколения с цифровой системой управления.",
                specs: {
                    speed: 67,
                    engine: "AGT-1500, 1500 л.с.",
                    armor: "Композитная",
                    mainGun: "120mm M256"
                }
            },
            {
                id: 3,
                name: "Leopard 2A7",
                country: "germany",
                type: "mbt",
                era: "modern",
                year: 2014,
                weight: 67,
                crew: 4,
                caliber: 120,
                image: "",
                description: "Немецкий основной боевой танк, считающийся одним из лучших в мире.",
                specs: {
                    speed: 72,
                    engine: "MTU MB 873, 1500 л.с.",
                    armor: "Композитная",
                    mainGun: "120mm Rh-120"
                }
            },

            // Лёгкие танки
            {
                id: 4,
                name: "AMX-13",
                country: "france",
                type: "light-tank",
                era: "cold-war",
                year: 1953,
                weight: 15,
                crew: 3,
                caliber: 75,
                image: "",
                description: "Французский лёгкий танк с качающейся башней и автоматом заряжания.",
                specs: {
                    speed: 60,
                    engine: "SOFAM 8Gxb, 250 л.с.",
                    armor: "Противоосколочная",
                    mainGun: "75mm CN-75-50"
                }
            },

            // Средние танки
            {
                id: 5,
                name: "Т-34-85",
                country: "ussr",
                type: "medium-tank",
                era: "ww2",
                year: 1944,
                weight: 32,
                crew: 5,
                caliber: 85,
                image: "",
                description: "Легендарный советский средний танк времён Второй мировой войны.",
                specs: {
                    speed: 55,
                    engine: "В-2-34, 500 л.с.",
                    armor: "Катаная сталь",
                    mainGun: "85mm ЗИС-С-53"
                }
            },

            // Тяжёлые танки
            {
                id: 6,
                name: "Tiger I",
                country: "germany",
                type: "heavy-tank",
                era: "ww2",
                year: 1942,
                weight: 57,
                crew: 5,
                caliber: 88,
                image: "",
                description: "Немецкий тяжёлый танк, один из самых известных танков Второй мировой.",
                specs: {
                    speed: 45,
                    engine: "Maybach HL230, 700 л.с.",
                    armor: "Катаная сталь",
                    mainGun: "88mm KwK 36"
                }
            },

            // БМП
            {
                id: 7,
                name: "БМП-3",
                country: "ussr",
                type: "ifv",
                era: "cold-war",
                year: 1987,
                weight: 18,
                crew: 3,
                caliber: 100,
                image: "",
                description: "Боевая машина пехоты с уникальным комплексом вооружения.",
                specs: {
                    speed: 70,
                    engine: "УТД-29, 500 л.с.",
                    armor: "Алюминиевая",
                    mainGun: "100mm 2A70"
                }
            },

            // БТР
            {
                id: 8,
                name: "БТР-82А",
                country: "ussr",
                type: "apc",
                era: "modern",
                year: 2013,
                weight: 15,
                crew: 3,
                caliber: 30,
                image: "",
                description: "Современный бронетранспортёр с улучшенными характеристиками.",
                specs: {
                    speed: 80,
                    engine: "Камаз-740.14-300, 300 л.с.",
                    armor: "Стальная",
                    mainGun: "30mm 2A72"
                }
            },

            // САУ
            {
                id: 9,
                name: "2С19 Мста-С",
                country: "ussr",
                type: "spg",
                era: "modern",
                year: 1989,
                weight: 42,
                crew: 5,
                caliber: 152,
                image: "",
                description: "Советская и российская 152-мм самоходная гаубица.",
                specs: {
                    speed: 60,
                    engine: "В-84А, 780 л.с.",
                    armor: "Противоосколочная",
                    mainGun: "152mm 2A64"
                }
            },

            // БРДМ
            {
                id: 10,
                name: "БРДМ-2",
                country: "ussr",
                type: "brdm",
                era: "cold-war",
                year: 1962,
                weight: 7,
                crew: 4,
                caliber: 14.5,
                image: "",
                description: "Бронированная разведывательно-дозорная машина.",
                specs: {
                    speed: 100,
                    engine: "ГАЗ-41, 140 л.с.",
                    armor: "Стальная",
                    mainGun: "14.5mm КПВТ"
                }
            },

            // БМД
            {
                id: 11,
                name: "БМД-4",
                country: "ussr",
                type: "bmd",
                era: "modern",
                year: 2004,
                weight: 14,
                crew: 3,
                caliber: 100,
                image: "",
                description: "Боевая машина десанта для воздушно-десантных войск.",
                specs: {
                    speed: 70,
                    engine: "2В-06-2, 450 л.с.",
                    armor: "Алюминиевая",
                    mainGun: "100mm 2A70"
                }
            },

            // РХБЗ
            {
                id: 12,
                name: "РХМ",
                country: "ussr",
                type: "cbrn",
                era: "cold-war",
                year: 1970,
                weight: 16,
                crew: 4,
                caliber: 0,
                image: "",
                description: "Машина радиационной и химической разведки.",
                specs: {
                    speed: 65,
                    engine: "ЯМЗ-238, 240 л.с.",
                    armor: "Стальная",
                    mainGun: "Отсутствует"
                }
            },

            // ИРМ
            {
                id: 13,
                name: "ИМР-2",
                country: "ussr",
                type: "engineer",
                era: "cold-war",
                year: 1980,
                weight: 45,
                crew: 2,
                caliber: 0,
                image: "",
                description: "Инженерная машина разграждения на базе танка Т-72.",
                specs: {
                    speed: 60,
                    engine: "В-46-6, 780 л.с.",
                    armor: "Комбинированная",
                    mainGun: "Бульдозерное оборудование"
                }
            },

            // ЗСУ
            {
                id: 14,
                name: "ЗСУ-23-4 Шилка",
                country: "ussr",
                type: "spaag",
                era: "cold-war",
                year: 1965,
                weight: 21,
                crew: 4,
                caliber: 23,
                image: "",
                description: "Зенитная самоходная установка для борьбы с низколетящими целями.",
                specs: {
                    speed: 50,
                    engine: "В-6Р, 280 л.с.",
                    armor: "Стальная",
                    mainGun: "4×23mm 2А7"
                }
            },

            // МТО
            {
                id: 15,
                name: "МТО-БТ",
                country: "ussr",
                type: "recovery",
                era: "modern",
                year: 1984,
                weight: 42,
                crew: 3,
                caliber: 0,
                image: "",
                description: "Машина технической помощи на базе танка Т-72.",
                specs: {
                    speed: 60,
                    engine: "В-84, 840 л.с.",
                    armor: "Комбинированная",
                    mainGun: "Кран 25т, лебёдка"
                }
            },

            // Additional vehicles to reach ~30 items
            {
                id: 16,
                name: "Т-90М",
                country: "ussr",
                type: "mbt",
                era: "modern",
                year: 2017,
                weight: 48,
                crew: 3,
                caliber: 125,
                image: "",
                description: "Глубокая модернизация танка Т-90 с улучшенной защитой и СУО.",
                specs: {
                    speed: 65,
                    engine: "В-92С2, 1130 л.с.",
                    armor: "Комбинированная",
                    mainGun: "125mm 2A46M-5"
                }
            },
            {
                id: 17,
                name: "Challenger 2",
                country: "uk",
                type: "mbt",
                era: "modern",
                year: 1998,
                weight: 62,
                crew: 4,
                caliber: 120,
                image: "",
                description: "Британский основной боевой танк с знаменитой броней Чобхэм.",
                specs: {
                    speed: 59,
                    engine: "Perkins CV12, 1200 л.с.",
                    armor: "Чобхэм",
                    mainGun: "120mm L30A1"
                }
            },
            {
                id: 18,
                name: "Leclerc",
                country: "france",
                type: "mbt",
                era: "modern",
                year: 1992,
                weight: 57,
                crew: 3,
                caliber: 120,
                image: "",
                description: "Французский основной боевой танк с автоматом заряжания.",
                specs: {
                    speed: 72,
                    engine: "SACM V8X, 1500 л.с.",
                    armor: "Композитная",
                    mainGun: "120mm CN120-26"
                }
            },
            {
                id: 19,
                name: "Type 99",
                country: "china",
                type: "mbt",
                era: "modern",
                year: 2001,
                weight: 58,
                crew: 3,
                caliber: 125,
                image: "",
                description: "Китайский основной боевой танк третьего поколения.",
                specs: {
                    speed: 80,
                    engine: "150HB, 1500 л.с.",
                    armor: "Композитная",
                    mainGun: "125mm ZPT-98"
                }
            },
            {
                id: 20,
                name: "M2 Bradley",
                country: "usa",
                type: "ifv",
                era: "cold-war",
                year: 1981,
                weight: 27,
                crew: 3,
                caliber: 25,
                image: "",
                description: "Американская боевая машина пехоты с мощным вооружением.",
                specs: {
                    speed: 66,
                    engine: "Cummins VTA-903T, 600 л.с.",
                    armor: "Алюминиевая",
                    mainGun: "25mm M242"
                }
            },
            {
                id: 21,
                name: "M113",
                country: "usa",
                type: "apc",
                era: "cold-war",
                year: 1960,
                weight: 12,
                crew: 2,
                caliber: 12.7,
                image: "",
                description: "Американский бронетранспортёр, один из самых массовых в мире.",
                specs: {
                    speed: 64,
                    engine: "Detroit Diesel 6V53, 215 л.с.",
                    armor: "Алюминиевая",
                    mainGun: "12.7mm M2"
                }
            },
            {
                id: 22,
                name: "PzH 2000",
                country: "germany",
                type: "spg",
                era: "modern",
                year: 1998,
                weight: 57,
                crew: 5,
                caliber: 155,
                image: "",
                description: "Немецкая 155-мм самоходная гаубица с высокой автоматизацией.",
                specs: {
                    speed: 60,
                    engine: "MTU 881, 1000 л.с.",
                    armor: "Стальная",
                    mainGun: "155mm L52"
                }
            },
            {
                id: 23,
                name: "CV90",
                country: "sweden",
                type: "ifv",
                era: "modern",
                year: 1993,
                weight: 28,
                crew: 3,
                caliber: 40,
                image: "",
                description: "Шведская боевая машина пехоты с мощной 40-мм пушкой.",
                specs: {
                    speed: 70,
                    engine: "Scania DI16, 670 л.с.",
                    armor: "Стальная",
                    mainGun: "40mm Bofors"
                }
            },
            {
                id: 24,
                name: "BMP-2",
                country: "ussr",
                type: "ifv",
                era: "cold-war",
                year: 1980,
                weight: 14,
                crew: 3,
                caliber: 30,
                image: "",
                description: "Советская боевая машина пехоты второго поколения.",
                specs: {
                    speed: 65,
                    engine: "УТД-20, 300 л.с.",
                    armor: "Алюминиевая",
                    mainGun: "30mm 2A42"
                }
            },
            {
                id: 25,
                name: "Т-80БВ",
                country: "ussr",
                type: "mbt",
                era: "cold-war",
                year: 1985,
                weight: 46,
                crew: 3,
                caliber: 125,
                image: "",
                description: "Советский основной боевой танк с газотурбинным двигателем.",
                specs: {
                    speed: 70,
                    engine: "ГТД-1250, 1250 л.с.",
                    armor: "Комбинированная",
                    mainGun: "125mm 2A46-2"
                }
            },
            {
                id: 26,
                name: "M109",
                country: "usa",
                type: "spg",
                era: "cold-war",
                year: 1963,
                weight: 28,
                crew: 6,
                caliber: 155,
                image: "",
                description: "Американская 155-мм самоходная гаубица.",
                specs: {
                    speed: 56,
                    engine: "Detroit Diesel 8V71T, 405 л.с.",
                    armor: "Алюминиевая",
                    mainGun: "155mm M185"
                }
            },
            {
                id: 27,
                name: "БМП-1",
                country: "ussr",
                type: "ifv",
                era: "cold-war",
                year: 1966,
                weight: 13,
                crew: 3,
                caliber: 73,
                image: "",
                description: "Первая в мире серийная боевая машина пехоты.",
                specs: {
                    speed: 65,
                    engine: "УТД-20, 300 л.с.",
                    armor: "Стальная",
                    mainGun: "73mm 2A28"
                }
            },
            {
                id: 28,
                name: "БРМ-1",
                country: "ussr",
                type: "brdm",
                era: "cold-war",
                year: 1975,
                weight: 14,
                crew: 4,
                caliber: 73,
                image: "",
                description: "Бронированная разведывательная машина на базе БМП-1.",
                specs: {
                    speed: 65,
                    engine: "УТД-20, 300 л.с.",
                    armor: "Стальная",
                    mainGun: "73mm 2A28"
                }
            },
            {
                id: 29,
                name: "2С3 Акация",
                country: "ussr",
                type: "spg",
                era: "cold-war",
                year: 1971,
                weight: 28,
                crew: 6,
                caliber: 152,
                image: "",
                description: "Советская 152-мм самоходная гаубица.",
                specs: {
                    speed: 60,
                    engine: "В-59, 520 л.с.",
                    armor: "Стальная",
                    mainGun: "152mm 2A33"
                }
            },
            {
                id: 30,
                name: "БТР-80",
                country: "ussr",
                type: "apc",
                era: "cold-war",
                year: 1986,
                weight: 14,
                crew: 3,
                caliber: 14.5,
                image: "",
                description: "Советский бронетранспортёр с улучшенными характеристиками.",
                specs: {
                    speed: 80,
                    engine: "Камаз-7403, 260 л.с.",
                    armor: "Стальная",
                    mainGun: "14.5mm КПВТ"
                }
            }
        ];

        this.displayVehicles();
    }

    bindEvents() {
        // Toggle filters visibility
        document.getElementById('filtersToggle').addEventListener('click', () => {
            this.toggleFilters();
        });

        // Search filter
        document.getElementById('searchFilter').addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFilters();
        });

        // Type filter chips
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                this.filters.type = e.target.dataset.type;
                this.applyFilters();
            });
        });

        // Select filters
        ['country', 'era', 'caliber', 'crew', 'weight'].forEach(filter => {
            const element = document.getElementById(filter + 'Filter');
            if (element) {
                element.addEventListener('change', (e) => {
                    this.filters[filter] = e.target.value;
                    this.applyFilters();
                });
            }
        });

        // Year range filters
        ['yearFrom', 'yearTo'].forEach(filter => {
            const element = document.getElementById(filter);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.filters[filter] = e.target.value;
                    this.applyFilters();
                });
            }
        });

        // Sort control
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.applyFilters();
            });
        }

        // View controls
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.viewMode = e.target.dataset.view;
                this.updateViewMode();
            });
        });

        // Advanced filters toggle
        const advancedToggle = document.getElementById('advancedToggle');
        if (advancedToggle) {
            advancedToggle.addEventListener('click', (e) => {
                e.target.classList.toggle('active');
                document.getElementById('advancedFilters').classList.toggle('active');
            });
        }

        // Clear filters
        const clearFilters = document.getElementById('clearFilters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // Reset search
        const resetSearch = document.getElementById('resetSearch');
        if (resetSearch) {
            resetSearch.addEventListener('click', () => {
                this.clearFilters();
            });
        }

        // Load more
        const loadMore = document.getElementById('loadMore');
        if (loadMore) {
            loadMore.addEventListener('click', () => {
                this.loadMore();
            });
        }

        // Quick view modal
        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeModal();
            });
        }

        // Close modal on backdrop click
        const modal = document.getElementById('quickViewModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target.id === 'quickViewModal') {
                    this.closeModal();
                }
            });
        }
    }

    toggleFilters(show) {
        this.filtersVisible = show !== undefined ? show : !this.filtersVisible;
        const container = document.querySelector('.filters-container');
        const toggle = document.getElementById('filtersToggle');
        
        if (this.filtersVisible) {
            container.classList.add('active');
            toggle.classList.add('active');
            toggle.innerHTML = '<span>Скрыть фильтры</span><span class="toggle-icon">▼</span>';
        } else {
            container.classList.remove('active');
            toggle.classList.remove('active');
            toggle.innerHTML = '<span>Показать фильтры</span><span class="toggle-icon">▼</span>';
        }
    }

    applyFilters() {
        this.currentPage = 1;
        this.filteredVehicles = this.vehicles.filter(vehicle => {
            return this.matchesFilters(vehicle);
        });

        this.sortVehicles();
        this.updateActiveFilters();
        this.displayVehicles();
    }

    matchesFilters(vehicle) {
        // Search filter
        if (this.filters.search && !vehicle.name.toLowerCase().includes(this.filters.search.toLowerCase())) {
            return false;
        }

        // Type filter
        if (this.filters.type !== 'all' && vehicle.type !== this.filters.type) {
            return false;
        }

        // Country filter
        if (this.filters.country !== 'all' && vehicle.country !== this.filters.country) {
            return false;
        }

        // Era filter
        if (this.filters.era !== 'all' && vehicle.era !== this.filters.era) {
            return false;
        }

        // Year range filter
        if (this.filters.yearFrom && vehicle.year < parseInt(this.filters.yearFrom)) {
            return false;
        }
        if (this.filters.yearTo && vehicle.year > parseInt(this.filters.yearTo)) {
            return false;
        }

        // Caliber filter
        if (this.filters.caliber !== 'all') {
            const caliber = vehicle.caliber;
            switch (this.filters.caliber) {
                case 'small': if (caliber > 75) return false; break;
                case 'medium': if (caliber <= 75 || caliber > 105) return false; break;
                case 'large': if (caliber <= 105 || caliber > 125) return false; break;
                case 'very-large': if (caliber <= 125) return false; break;
            }
        }

        // Crew filter
        if (this.filters.crew !== 'all') {
            const crew = vehicle.crew;
            switch (this.filters.crew) {
                case '1-2': if (crew > 2) return false; break;
                case '3-4': if (crew < 3 || crew > 4) return false; break;
                case '5+': if (crew < 5) return false; break;
            }
        }

        // Weight filter
        if (this.filters.weight !== 'all') {
            const weight = vehicle.weight;
            switch (this.filters.weight) {
                case 'light': if (weight > 20) return false; break;
                case 'medium': if (weight <= 20 || weight > 40) return false; break;
                case 'heavy': if (weight <= 40 || weight > 60) return false; break;
                case 'super-heavy': if (weight <= 60) return false; break;
            }
        }

        return true;
    }

    sortVehicles() {
        this.filteredVehicles.sort((a, b) => {
            switch (this.sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'year':
                    return a.year - b.year;
                case 'year-desc':
                    return b.year - a.year;
                case 'weight':
                    return a.weight - b.weight;
                case 'weight-desc':
                    return b.weight - a.weight;
                default:
                    return 0;
            }
        });
    }

    updateActiveFilters() {
        const activeFiltersContainer = document.getElementById('activeFilters');
        if (!activeFiltersContainer) return;

        activeFiltersContainer.innerHTML = '';

        Object.entries(this.filters).forEach(([key, value]) => {
            if (value && value !== 'all') {
                const filterElement = document.createElement('div');
                filterElement.className = 'active-filter';
                
                let label = '';
                switch (key) {
                    case 'search':
                        if (!value) return;
                        label = `Поиск: "${value}"`;
                        break;
                    case 'type':
                        label = `Тип: ${this.getTypeLabel(value)}`;
                        break;
                    case 'country':
                        label = `Страна: ${this.getCountryLabel(value)}`;
                        break;
                    case 'era':
                        label = `Период: ${this.getEraLabel(value)}`;
                        break;
                    case 'yearFrom':
                        label = `Год от: ${value}`;
                        break;
                    case 'yearTo':
                        label = `Год до: ${value}`;
                        break;
                    case 'caliber':
                        label = `Калибр: ${this.getCaliberLabel(value)}`;
                        break;
                    case 'crew':
                        label = `Экипаж: ${this.getCrewLabel(value)}`;
                        break;
                    case 'weight':
                        label = `Масса: ${this.getWeightLabel(value)}`;
                        break;
                }

                if (label) {
                    filterElement.innerHTML = `
                        ${label}
                        <button class="active-filter-remove" data-filter="${key}">×</button>
                    `;
                    activeFiltersContainer.appendChild(filterElement);
                }
            }
        });

        // Add remove event listeners
        document.querySelectorAll('.active-filter-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.removeFilter(filter);
            });
        });
    }

    removeFilter(filter) {
        switch (filter) {
            case 'search':
                this.filters.search = '';
                document.getElementById('searchFilter').value = '';
                break;
            case 'type':
                this.filters.type = 'all';
                document.querySelectorAll('.filter-chip').forEach(chip => {
                    chip.classList.remove('active');
                    if (chip.dataset.type === 'all') chip.classList.add('active');
                });
                break;
            case 'country':
            case 'era':
            case 'caliber':
            case 'crew':
            case 'weight':
                this.filters[filter] = 'all';
                const filterElement = document.getElementById(filter + 'Filter');
                if (filterElement) filterElement.value = 'all';
                break;
            case 'yearFrom':
                this.filters.yearFrom = '';
                document.getElementById('yearFrom').value = '';
                break;
            case 'yearTo':
                this.filters.yearTo = '';
                document.getElementById('yearTo').value = '';
                break;
        }
        this.applyFilters();
    }

    clearFilters() {
        this.filters = {
            search: '',
            type: 'all',
            country: 'all',
            era: 'all',
            yearFrom: '',
            yearTo: '',
            caliber: 'all',
            crew: 'all',
            weight: 'all'
        };

        // Reset UI
        document.getElementById('searchFilter').value = '';
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.classList.remove('active');
            if (chip.dataset.type === 'all') chip.classList.add('active');
        });
        
        const filtersToReset = ['country', 'era', 'caliber', 'crew', 'weight'];
        filtersToReset.forEach(filter => {
            const element = document.getElementById(filter + 'Filter');
            if (element) element.value = 'all';
        });
        
        document.getElementById('yearFrom').value = '';
        document.getElementById('yearTo').value = '';

        this.applyFilters();
    }

    displayVehicles() {
        const grid = document.getElementById('vehiclesGrid');
        const resultsCount = document.getElementById('resultsCount');
        const noResults = document.getElementById('noResults');
        const loadingState = document.getElementById('loadingState');

        if (!grid) return;

        // Hide loading, show appropriate state
        if (loadingState) loadingState.style.display = 'none';

        if (this.filteredVehicles.length === 0) {
            grid.style.display = 'none';
            if (noResults) noResults.style.display = 'block';
            if (resultsCount) resultsCount.textContent = '0';
            return;
        }

        if (noResults) noResults.style.display = 'none';
        grid.style.display = 'grid';
        if (resultsCount) resultsCount.textContent = this.filteredVehicles.length;

        // Get current page items
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentVehicles = this.filteredVehicles.slice(0, endIndex);

        grid.innerHTML = currentVehicles.map(vehicle => this.createVehicleCard(vehicle)).join('');

        // Update load more button
        const loadMoreBtn = document.getElementById('loadMore');
        if (loadMoreBtn) {
            if (endIndex >= this.filteredVehicles.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'block';
            }
        }

        // Add click events to new cards
        this.bindVehicleCardEvents();
    }

    createVehicleCard(vehicle) {
        const typeLabel = this.getTypeLabel(vehicle.type);
        const countryLabel = this.getCountryLabel(vehicle.country);

        return `
            <div class="vehicle-card" data-vehicle-id="${vehicle.id}">
                <div class="vehicle-badge">${countryLabel}</div>
                <div class="vehicle-image">
                    <div class="vehicle-image-placeholder">
                        ${vehicle.name}
                    </div>
                </div>
                <div class="vehicle-content">
                    <div class="vehicle-header">
                        <h3 class="vehicle-title">${vehicle.name}</h3>
                    </div>
                    <div class="vehicle-country">${countryLabel} • ${vehicle.year}г</div>
                    <div class="vehicle-type">${typeLabel}</div>
                    
                    <div class="vehicle-specs">
                        <div class="vehicle-spec">
                            <span class="spec-label">Масса</span>
                            <span class="spec-value">${vehicle.weight}т</span>
                        </div>
                        <div class="vehicle-spec">
                            <span class="spec-label">Экипаж</span>
                            <span class="spec-value">${vehicle.crew}</span>
                        </div>
                        <div class="vehicle-spec">
                            <span class="spec-label">Калибр</span>
                            <span class="spec-value">${vehicle.caliber}мм</span>
                        </div>
                        <div class="vehicle-spec">
                            <span class="spec-label">Скорость</span>
                            <span class="spec-value">${vehicle.specs.speed}км/ч</span>
                        </div>
                    </div>
                    
                    <p class="vehicle-description">${vehicle.description}</p>
                    
                    <div class="vehicle-actions">
                        <button class="vehicle-btn quick-view-btn" data-vehicle-id="${vehicle.id}">
                            Быстрый просмотр
                        </button>
                        <a href="../vehicle-details.html?id=${vehicle.id}" class="vehicle-btn secondary">
                            Подробнее
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    bindVehicleCardEvents() {
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const vehicleId = parseInt(e.target.dataset.vehicleId);
                this.showQuickView(vehicleId);
            });
        });

        document.querySelectorAll('.vehicle-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('vehicle-btn')) {
                    const vehicleId = parseInt(card.dataset.vehicleId);
                    // Navigate to detail page
                    window.location.href = `../vehicle-details.html?id=${vehicleId}`;
                }
            });
        });
    }

    showQuickView(vehicleId) {
        const vehicle = this.vehicles.find(v => v.id === vehicleId);
        if (!vehicle) return;

        const modalBody = document.getElementById('modalBody');
        if (!modalBody) return;

        modalBody.innerHTML = this.createQuickViewContent(vehicle);

        document.getElementById('quickViewModal').classList.add('active');
    }

    createQuickViewContent(vehicle) {
        const typeLabel = this.getTypeLabel(vehicle.type);
        const countryLabel = this.getCountryLabel(vehicle.country);

        return `
            <div class="quick-view">
                <div class="quick-view-image">
                    <div class="vehicle-image-placeholder large">
                        ${vehicle.name}
                    </div>
                </div>
                <div class="quick-view-content">
                    <h2>${vehicle.name}</h2>
                    <div class="quick-view-meta">
                        <span class="meta-item">${countryLabel}</span>
                        <span class="meta-item">${vehicle.year} год</span>
                        <span class="meta-item">${typeLabel}</span>
                    </div>
                    
                    <div class="quick-view-specs">
                        <div class="spec-row">
                            <span class="spec-name">Экипаж:</span>
                            <span class="spec-value">${vehicle.crew} человека</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-name">Боевая масса:</span>
                            <span class="spec-value">${vehicle.weight} тонн</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-name">Основное вооружение:</span>
                            <span class="spec-value">${vehicle.specs.mainGun}</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-name">Двигатель:</span>
                            <span class="spec-value">${vehicle.specs.engine}</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-name">Макс. скорость:</span>
                            <span class="spec-value">${vehicle.specs.speed} км/ч</span>
                        </div>
                        <div class="spec-row">
                            <span class="spec-name">Бронирование:</span>
                            <span class="spec-value">${vehicle.specs.armor}</span>
                        </div>
                    </div>
                    
                    <p class="quick-view-description">${vehicle.description}</p>
                    
                    <div class="quick-view-actions">
                        <a href="../vehicle-details.html?id=${vehicle.id}" class="vehicle-btn">
                            Полное описание
                        </a>
                        <button class="vehicle-btn secondary" onclick="catalog.closeModal()">
                            Закрыть
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    closeModal() {
        document.getElementById('quickViewModal').classList.remove('active');
    }

    updateViewMode() {
        const grid = document.getElementById('vehiclesGrid');
        if (grid) {
            grid.className = `vehicles-grid ${this.viewMode}-view`;
        }
    }

    loadMore() {
        this.currentPage++;
        this.displayVehicles();
    }

    // Helper methods for labels
    getTypeLabel(type) {
        const types = {
            'mbt': 'ОБТ',
            'light-tank': 'Лёгкий танк',
            'medium-tank': 'Средний танк',
            'heavy-tank': 'Тяжёлый танк',
            'ifv': 'БМП',
            'apc': 'БТР',
            'spg': 'САУ',
            'brdm': 'БРДМ',
            'bmd': 'БМД',
            'cbrn': 'РХБЗ',
            'engineer': 'ИРМ',
            'spaag': 'ЗСУ',
            'recovery': 'МТО'
        };
        return types[type] || type;
    }

    getCountryLabel(country) {
        const countries = {
            'ussr': 'СССР/Россия',
            'usa': 'США',
            'germany': 'Германия',
            'uk': 'Великобритания',
            'france': 'Франция',
            'china': 'Китай',
            'japan': 'Япония',
            'israel': 'Израиль',
            'sweden': 'Швеция'
        };
        return countries[country] || country;
    }

    getEraLabel(era) {
        const eras = {
            'ww2': 'Вторая мировая',
            'cold-war': 'Холодная война',
            'modern': 'Современность'
        };
        return eras[era] || era;
    }

    getCaliberLabel(caliber) {
        const calibers = {
            'small': 'до 75мм',
            'medium': '76-105мм',
            'large': '106-125мм',
            'very-large': '126мм+'
        };
        return calibers[caliber] || caliber;
    }

    getCrewLabel(crew) {
        const crews = {
            '1-2': '1-2 человека',
            '3-4': '3-4 человека',
            '5+': '5+ человек'
        };
        return crews[crew] || crew;
    }

    getWeightLabel(weight) {
        const weights = {
            'light': 'до 20т',
            'medium': '20-40т',
            'heavy': '40-60т',
            'super-heavy': '60т+'
        };
        return weights[weight] || weight;
    }
}

// Initialize catalog when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.catalog = new VehicleCatalog();
});
