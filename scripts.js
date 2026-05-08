(function(){
  const TOTAL = 150;
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

  const COLORS = ['#EA4335','#4285F4','#FBBC05','#34A853','#7C4DFF','#FF7043'];

  // MANY different topics
  const TOPICS = [
    'design','javascript','cooking','travel','fitness','movies','music','science',
    'history','photography','gaming','technology','space','nature','cars','finance',
    'coding','robots','ai','art','health','sports','education','books','anime',
    'fashion','food','business','crypto','weather','astronomy','biology','chemistry',
    'physics','gardening','hiking','camping','architecture','drawing','painting',
    'cybersecurity','web development','mobile apps','machine learning','deep learning',
    'productivity','meditation','mental health','recipes','baking'
  ];

  const ADJECTIVES = [
    'ultimate','beginner','advanced','complete','modern','easy','fast','creative',
    'practical','professional','expert','smart','powerful','simple','interactive',
    'helpful','detailed','popular','updated','essential'
  ];

  const TYPES = [
    'guide','tutorial','tips','course','reference','walkthrough','examples',
    'strategies','lessons','ideas','explained','basics','masterclass','blueprint'
  ];

  const RESOURCE_MAP = {
    design: 'https://www.smashingmagazine.com',
    javascript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    cooking: 'https://www.seriouseats.com',
    travel: 'https://www.lonelyplanet.com',
    fitness: 'https://www.acefitness.org',
    movies: 'https://www.imdb.com',
    music: 'https://www.allmusic.com',
    science: 'https://www.nature.com',
    history: 'https://www.britannica.com',
    photography: 'https://www.dpreview.com',
    gaming: 'https://www.ign.com',
    technology: 'https://techcrunch.com',
    space: 'https://www.nasa.gov',
    nature: 'https://www.nationalgeographic.com',
    cars: 'https://www.caranddriver.com',
    finance: 'https://www.investopedia.com',
    coding: 'https://stackoverflow.com',
    robots: 'https://spectrum.ieee.org/robotics',
    ai: 'https://openai.com',
    art: 'https://www.metmuseum.org',
    health: 'https://www.webmd.com',
    sports: 'https://www.espn.com',
    education: 'https://www.khanacademy.org',
    books: 'https://www.goodreads.com',
    anime: 'https://myanimelist.net',
    fashion: 'https://www.vogue.com',
    food: 'https://www.foodnetwork.com',
    business: 'https://hbr.org',
    crypto: 'https://coinmarketcap.com',
    weather: 'https://weather.com'
  };

  function random(arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function capitalize(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  // CREATE 150 UNIQUE SEARCH RESULTS
  function makeDataset(){
    for(let i = 1; i <= TOTAL; i++){

      const topic = random(TOPICS);
      const adjective = random(ADJECTIVES);
      const type = random(TYPES);

      const base = RESOURCE_MAP[topic] || 'https://example.com';

      const uniqueId = `${topic}-${adjective}-${type}-${i}`;

      const title =
        `${capitalize(adjective)} ${capitalize(topic)} ${capitalize(type)} #${i}`;

      const url =
        `${base}/search/${uniqueId}`;

      const domain = (new URL(base)).host;

      const snippet =
        `Discover ${topic} with this ${adjective} ${type}. Learn practical techniques, examples, and modern approaches for ${topic}. Entry number ${i}.`;

      const info =
        `This unique search result focuses on ${topic}. It includes advanced learning resources, tutorials, examples, and helpful references from ${domain}. Search ID: ${uniqueId}.`;

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

  function renderPage(){
    resultsEl.innerHTML = '';

    if(filtered.length === 0){
      resultsMeta.classList.add('hidden');
      resultsEl.innerHTML =
        `<p style="color:var(--muted);text-align:center;padding:18px">
          No results found.
        </p>`;
      return;
    }

    resultsMeta.classList.remove('hidden');

    const start = (page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);

    countEl.textContent = `About ${filtered.length} results`;

    pageItems.forEach(item => {

      const r = document.createElement('article');
      r.className = 'result';

      r.innerHTML = `
        <div class="play-icon" style="background:${item.color}">
          ${playSvg()}
        </div>

        <div class="result-body">

          <div class="result-head">
            <h3 class="result-title">
              <a class="result-link"
                 href="${item.url}"
                 target="_blank">
                 ${item.title}
              </a>
            </h3>

            <button class="info-btn"
                    data-id="${item.id}">
                    info
            </button>
          </div>

          <div class="result-url">
            <a href="${item.url}" target="_blank">
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

  function renderPager(){

    const totalPages =
      Math.ceil(filtered.length / PAGE_SIZE);

    pagerEl.innerHTML = '';

    if(totalPages <= 1) return;

    const prevBtn = document.createElement('button');

    prevBtn.textContent = '← Prev';
    prevBtn.disabled = page === 1;

    prevBtn.onclick = () => {
      if(page > 1){
        page--;
        renderPage();
      }
    };

    pagerEl.appendChild(prevBtn);

    const info = document.createElement('span');

    info.textContent =
      ` Page ${page} of ${totalPages} `;

    pagerEl.appendChild(info);

    const nextBtn = document.createElement('button');

    nextBtn.textContent = 'Next →';
    nextBtn.disabled = page === totalPages;

    nextBtn.onclick = () => {
      if(page < totalPages){
        page++;
        renderPage();
      }
    };

    pagerEl.appendChild(nextBtn);
  }

  function attachInfoHandlers(){

    document.querySelectorAll('.info-btn')
      .forEach(btn => {

        const id = btn.dataset.id;
        const infoEl =
          document.getElementById(`info-${id}`);

        btn.onclick = () => {
          infoEl.classList.toggle('visible');
        };
      });
  }

  function doSearch(q){

    const t = (q || '').toLowerCase().trim();

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

  luckyBtn.addEventListener('click', () => {

    const idx =
      Math.floor(Math.random() * dataset.length);

    qInput.value = dataset[idx].tag;

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

  // INIT
  makeDataset();

  filtered = [...dataset];

  renderPage();

})();
