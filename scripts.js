(function(){

  // =========================
  // SETTINGS
  // =========================

  const TOTAL = 500;
  const PAGE_SIZE = 10;

  const resultsEl = document.getElementById('results');
  const countEl = document.getElementById('resultCount');
  const pagerEl = document.getElementById('pager');
  const qInput = document.getElementById('q');
  const searchBtn = document.getElementById('searchBtn');
  const luckyBtn = document.getElementById('luckyBtn');
  const resultsMeta = document.getElementById('resultsMeta');

  let dataset = [];
  let filtered = [];
  let page = 1;

  const COLORS = [
    '#EA4335',
    '#4285F4',
    '#FBBC05',
    '#34A853',
    '#7C4DFF',
    '#FF7043'
  ];

  const TOPICS = [
    'javascript',
    'ai',
    'space',
    'coding',
    'science',
    'technology',
    'movies',
    'music',
    'books',
    'gaming',
    'finance',
    'health',
    'travel',
    'fitness',
    'photography'
  ];

  const ADJECTIVES = [
    'ultimate',
    'beginner',
    'advanced',
    'modern',
    'easy',
    'creative',
    'professional',
    'expert',
    'updated',
    'interactive',
    'complete',
    'helpful',
    'smart',
    'fast',
    'practical'
  ];

  const TYPES = [
    'guide',
    'tutorial',
    'tips',
    'course',
    'reference',
    'walkthrough',
    'examples',
    'masterclass',
    'blueprint',
    'lessons'
  ];

  // =========================
  // REAL LINKS
  // =========================

  const RESOURCE_MAP = {

    javascript: [
      {
        title: 'MDN JavaScript Guide',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'
      },
      {
        title: 'JavaScript.info',
        url: 'https://javascript.info/'
      },
      {
        title: 'Eloquent JavaScript',
        url: 'https://eloquentjavascript.net/'
      }
    ],

    ai: [
      {
        title: 'OpenAI',
        url: 'https://openai.com/'
      },
      {
        title: 'Hugging Face',
        url: 'https://huggingface.co/'
      },
      {
        title: 'FastAI',
        url: 'https://www.fast.ai/'
      }
    ],

    coding: [
      {
        title: 'Stack Overflow',
        url: 'https://stackoverflow.com/'
      },
      {
        title: 'GitHub',
        url: 'https://github.com/'
      },
      {
        title: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/'
      }
    ],

    space: [
      {
        title: 'NASA',
        url: 'https://www.nasa.gov/'
      },
      {
        title: 'ESA',
        url: 'https://www.esa.int/'
      },
      {
        title: 'Space.com',
        url: 'https://www.space.com/'
      }
    ],

    science: [
      {
        title: 'Nature',
        url: 'https://www.nature.com/'
      },
      {
        title: 'Scientific American',
        url: 'https://www.scientificamerican.com/'
      },
      {
        title: 'New Scientist',
        url: 'https://www.newscientist.com/'
      }
    ],

    technology: [
      {
        title: 'TechCrunch',
        url: 'https://techcrunch.com/'
      },
      {
        title: 'The Verge',
        url: 'https://www.theverge.com/'
      },
      {
        title: 'Wired',
        url: 'https://www.wired.com/'
      }
    ],

    movies: [
      {
        title: 'IMDb',
        url: 'https://www.imdb.com/'
      },
      {
        title: 'Rotten Tomatoes',
        url: 'https://www.rottentomatoes.com/'
      },
      {
        title: 'Letterboxd',
        url: 'https://letterboxd.com/'
      }
    ],

    music: [
      {
        title: 'Spotify',
        url: 'https://spotify.com/'
      },
      {
        title: 'YouTube Music',
        url: 'https://music.youtube.com/'
      },
      {
        title: 'AllMusic',
        url: 'https://www.allmusic.com/'
      }
    ],

    books: [
      {
        title: 'Goodreads',
        url: 'https://www.goodreads.com/'
      },
      {
        title: 'Project Gutenberg',
        url: 'https://www.gutenberg.org/'
      },
      {
        title: 'Open Library',
        url: 'https://openlibrary.org/'
      }
    ],

    gaming: [
      {
        title: 'IGN',
        url: 'https://www.ign.com/'
      },
      {
        title: 'GameSpot',
        url: 'https://www.gamespot.com/'
      },
      {
        title: 'Steam',
        url: 'https://store.steampowered.com/'
      }
    ],

    finance: [
      {
        title: 'Investopedia',
        url: 'https://www.investopedia.com/'
      },
      {
        title: 'Yahoo Finance',
        url: 'https://finance.yahoo.com/'
      },
      {
        title: 'Bloomberg',
        url: 'https://www.bloomberg.com/'
      }
    ],

    health: [
      {
        title: 'WebMD',
        url: 'https://www.webmd.com/'
      },
      {
        title: 'Mayo Clinic',
        url: 'https://www.mayoclinic.org/'
      },
      {
        title: 'Healthline',
        url: 'https://www.healthline.com/'
      }
    ],

    travel: [
      {
        title: 'Lonely Planet',
        url: 'https://www.lonelyplanet.com/'
      },
      {
        title: 'Tripadvisor',
        url: 'https://www.tripadvisor.com/'
      },
      {
        title: 'Booking.com',
        url: 'https://www.booking.com/'
      }
    ],

    fitness: [
      {
        title: 'Bodybuilding.com',
        url: 'https://www.bodybuilding.com/'
      },
      {
        title: 'ACE Fitness',
        url: 'https://www.acefitness.org/'
      },
      {
        title: 'Muscle & Fitness',
        url: 'https://www.muscleandfitness.com/'
      }
    ],

    photography: [
      {
        title: 'DPReview',
        url: 'https://www.dpreview.com/'
      },
      {
        title: 'PetaPixel',
        url: 'https://petapixel.com/'
      },
      {
        title: '500px',
        url: 'https://500px.com/'
      }
    ]
  };

  // =========================
  // HELPERS
  // =========================

  function random(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function capitalize(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // =========================
  // CREATE 500 RESULTS
  // =========================

  function makeDataset(){

    dataset = [];

    for(let i = 1; i <= TOTAL; i++){

      const topic =
        random(TOPICS);

      const adjective =
        random(ADJECTIVES);

      const type =
        random(TYPES);

      const resources =
        RESOURCE_MAP[topic];

      const chosen =
        random(resources);

      const randomNumber =
        Math.floor(Math.random() * 99999);

      const url =
        chosen.url;

      const realTitle =
        chosen.title;

      const domain =
        (new URL(url)).host;

      // MANY TITLE STYLES
      const titlePatterns = [

        `${capitalize(adjective)} ${topic} ${type} on ${realTitle}`,

        `${realTitle}: ${capitalize(topic)} ${type}`,

        `${capitalize(topic)} ${type} for beginners - ${realTitle}`,

        `${capitalize(adjective)} ${realTitle} learning resource`,

        `${capitalize(topic)} examples and tips on ${realTitle}`,

        `${realTitle} ${capitalize(type)} #${randomNumber}`,

        `Learn ${capitalize(topic)} with ${realTitle}`,

        `${capitalize(adjective)} guide to ${topic} using ${realTitle}`

      ];

      const snippetPatterns = [

        `Explore ${topic} tutorials, examples, and resources from ${realTitle}.`,

        `Discover practical ${topic} learning materials and guides.`,

        `Learn modern ${topic} techniques using tutorials from ${realTitle}.`,

        `Browse helpful ${topic} examples, walkthroughs, and references.`,

        `Updated ${topic} content and tutorials from ${realTitle}.`

      ];

      const title =
        random(titlePatterns);

      const snippet =
        random(snippetPatterns);

      const info =
        `
        Resource: ${realTitle}

        Topic: ${topic}

        Search Result ID: ${i}-${randomNumber}

        Includes tutorials, examples,
        documentation, and references.
        `;

      dataset.push({

        id: i,

        title,

        url,

        site: domain,

        snippet,

        info,

        tag: topic,

        color: COLORS[i % COLORS.length]
      });
    }
  }

  // =========================
  // RENDER RESULTS
  // =========================

  function renderPage(){

    resultsEl.innerHTML = '';

    if(filtered.length === 0){

      resultsMeta.classList.add('hidden');

      resultsEl.innerHTML =
        `
        <p style="color:var(--muted);text-align:center;padding:18px">
          No results found.
        </p>
        `;

      return;
    }

    resultsMeta.classList.remove('hidden');

    const start =
      (page - 1) * PAGE_SIZE;

    const pageItems =
      filtered.slice(start, start + PAGE_SIZE);

    countEl.textContent =
      `About ${filtered.length} results`;

    pageItems.forEach(item => {

      const r =
        document.createElement('article');

      r.className = 'result';

      r.innerHTML = `
        <div class="play-icon"
             style="background:${item.color}">

          ${playSvg()}

        </div>

        <div class="result-body">

          <div class="result-head">

            <h3 class="result-title">

              <a class="result-link"
                 href="${item.url}"
                 target="_blank"
                 rel="noopener noreferrer">

                ${item.title}

              </a>

            </h3>

            <button class="info-btn"
                    data-id="${item.id}">
              info
            </button>

          </div>

          <div class="result-url">

            <a href="${item.url}"
               target="_blank"
               rel="noopener noreferrer">

              ${item.site}

            </a>

          </div>

          <div class="result-snippet">
            ${item.snippet}
          </div>

          <div class="result-info"
               id="info-${item.id}">

            ${item.info}

          </div>

        </div>
      `;

      resultsEl.appendChild(r);
    });

    renderPager();

    attachInfoHandlers();
  }

  // =========================
  // PAGINATION
  // =========================

  function renderPager(){

    const totalPages =
      Math.ceil(filtered.length / PAGE_SIZE);

    pagerEl.innerHTML = '';

    if(totalPages <= 1) return;

    const prevBtn =
      document.createElement('button');

    prevBtn.textContent =
      '← Prev';

    prevBtn.disabled =
      page === 1;

    prevBtn.onclick = () => {

      if(page > 1){

        page--;

        renderPage();
      }
    };

    pagerEl.appendChild(prevBtn);

    const info =
      document.createElement('span');

    info.textContent =
      ` Page ${page} of ${totalPages} `;

    pagerEl.appendChild(info);

    const nextBtn =
      document.createElement('button');

    nextBtn.textContent =
      'Next →';

    nextBtn.disabled =
      page === totalPages;

    nextBtn.onclick = () => {

      if(page < totalPages){

        page++;

        renderPage();
      }
    };

    pagerEl.appendChild(nextBtn);
  }

  // =========================
  // INFO BUTTONS
  // =========================

  function attachInfoHandlers(){

    document
      .querySelectorAll('.info-btn')
      .forEach(btn => {

        const id =
          btn.dataset.id;

        const infoEl =
          document.getElementById(`info-${id}`);

        btn.onclick = () => {

          infoEl.classList.toggle('visible');
        };
      });
  }

  // =========================
  // SEARCH
  // =========================

  function doSearch(q){

    const t =
      (q || '').toLowerCase().trim();

    if(!t){

      filtered = [...dataset];

    } else {

      filtered = dataset.filter(item =>

        item.title.toLowerCase().includes(t) ||
        item.snippet.toLowerCase().includes(t) ||
        item.info.toLowerCase().includes(t) ||
        item.tag.toLowerCase().includes(t)
      );
    }

    page = 1;

    renderPage();
  }

  // =========================
  // SVG ICON
  // =========================

  function playSvg(){

    return `
      <svg width="24"
           height="24"
           viewBox="0 0 24 24"
           fill="none">

        <rect x="2"
              y="2"
              width="20"
              height="20"
              rx="6"
              fill="rgba(255,255,255,0.06)">
        </rect>

        <path d="M9 8.5v7l6-3.5-6-3.5z"
              fill="white">
        </path>

      </svg>
    `;
  }

  // =========================
  // EVENTS
  // =========================

  luckyBtn.addEventListener('click', () => {

    const idx =
      Math.floor(Math.random() * dataset.length);

    qInput.value =
      dataset[idx].tag;

    doSearch(qInput.value);
  });

  searchBtn.addEventListener('click', () => {

    doSearch(qInput.value);
  });

  qInput.addEventListener('keydown', e => {

    if(e.key === 'Enter'){

      doSearch(qInput.value);
    }
  });

  // =========================
  // INIT
  // =========================

  makeDataset();

  filtered = [...dataset];

  renderPage();

})();
