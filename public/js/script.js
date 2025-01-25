async function fetchNews() {
  showLoading();
  try {
    const response = await fetch('/api/news');
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    
    if (data && data[0] && data[0].trends) {
      displayNews(data[0].trends);
    }
  } catch (error) {
    console.error('Error:', error);
    showError();
  }
}

function displayNews(trends) {
  const container = document.getElementById('news-container');
  container.innerHTML = '';

  trends.forEach(trend => {
    const article = document.createElement('article');
    article.className = 'news-card bg-white rounded-lg shadow-md p-6 mb-6';
    
    article.innerHTML = `
      <h3 class="text-xl font-bold text-blue-600">${trend}</h3>
      <p class="mt-3 text-gray-600">Cele mai recente actualizări despre ${trend}</p>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-sm text-gray-500">${new Date().toLocaleDateString('ro-RO')}</span>
        <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Citește mai mult
        </button>
      </div>
    `;
    
    container.appendChild(article);
  });
}

function showLoading() {
  const container = document.getElementById('news-container');
  let loadingHTML = '';
  
  for (let i = 0; i < 4; i++) {
    loadingHTML += `
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="space-y-3 mt-4">
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    `;
  }
  
  container.innerHTML = loadingHTML;
}

function showError() {
  const container = document.getElementById('news-container');
  container.innerHTML = `
    <div class="text-center py-8">
      <div class="text-red-500 mb-4">A apărut o eroare la încărcarea știrilor</div>
      <button onclick="fetchNews()" 
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Reîncearcă
      </button>
    </div>
  `;
}

fetchNews();
setInterval(fetchNews, 300000);