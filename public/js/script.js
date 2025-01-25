async function fetchNews() {
  showLoading();
  try {
    const response = await fetch('https://agentx.site/trends.json');
    const data = await response.json();
    
    if (data && data[0] && data[0].trends) {
      displayNews(data[0].trends);
    }
  } catch (error) {
    console.error('Eroare la obținerea datelor:', error);
    showError();
  }
}

function displayNews(trends) {
  const container = document.getElementById('news-container');
  container.innerHTML = '';

  trends.forEach(trend => {
    const article = document.createElement('article');
    article.className = 'news-card mb-6 border-b pb-4 last:border-none hover:bg-gray-50 transition-all duration-200';
    
    article.innerHTML = `
      <h3 class="text-xl font-bold text-blue-600 mb-2">${trend}</h3>
      <p class="mt-2 text-gray-600 leading-relaxed">
        Ultimele știri și actualizări despre ${trend}. Click pentru a citi mai multe detalii despre acest subiect și pentru a afla cele mai recente informații.
      </p>
      <div class="mt-4 flex justify-between items-center">
        <div>
          <span class="text-sm text-gray-500">${new Date().toLocaleDateString('ro-RO')}</span>
          <span class="text-xs text-gray-400 ml-2">Actualizat recent</span>
        </div>
        <button 
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2">
          <span>Citește mai mult</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    `;
    
    container.appendChild(article);
  });
}

function showLoading() {
  const container = document.getElementById('news-container');
  container.innerHTML = Array(5).fill(0).map(() => `
    <div class="animate-pulse">
      <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div class="space-y-3">
        <div class="h-3 bg-gray-200 rounded"></div>
        <div class="h-3 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  `).join('');
}

function showError() {
  const container = document.getElementById('news-container');
  container.innerHTML = `
    <div class="text-center py-8">
      <div class="text-red-500 text-xl mb-2">
        <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        A apărut o eroare la încărcarea știrilor
      </div>
      <p class="text-gray-600">Vă rugăm să încercați din nou mai târziu</p>
      <button onclick="fetchNews()" 
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Reîncearcă
      </button>
    </div>
  `;
}

// Initial load
fetchNews();

// Refresh every 5 minutes
setInterval(fetchNews, 300000);