import axios from 'axios';

// Loading data from API
export async function loadExercises(filter = 'Muscles', page = 1, limit = 12) {
  try {
    // Change coded space `%20` to usual space
    const decodedFilter = filter.replace(/%20/g, ' ');

    // API request
    const response = await axios.get(
      `https://your-energy.b.goit.study/api/filters`,
      {
        params: {
          filter: decodedFilter,
          page,
          limit,
        },
      }
    );

    // Get results from response
    const exercises = response.data.results;

    // Use totalPages directly from response
    const totalPages = response.data.totalPages;

    // Data render
    renderExercises(exercises);

    // Pagination rendering
    createPagination(totalPages, filter, limit, page); // Pass current page
  } catch (error) {
    console.error('Помилка при завантаженні даних:', error);
  }
}

// Function for rendering data
export function renderExercises(exercises) {
  const container = document.getElementById('exercises-container');
  container.innerHTML = ''; // Очистити контейнер перед рендерингом нових вправ

  exercises.forEach(exercise => {
    const exerciseElement = document.createElement('div');
    exerciseElement.classList.add('exercises__col');

    exerciseElement.innerHTML = `
      <div class="exercises__item">
        <img src="${exercise.imgURL}" alt="Опис зображення" />
        <div class="text-overlay">
          <h5>${exercise.name}</h5>
          <p>${exercise.filter}</p>
        </div>
      </div>
    `;

    // Додаємо обробник подій для кліку на кожну вправу
    exerciseElement.addEventListener('click', () => {
      fetchExerciseDetails(exercise.filter, exercise.name);
    });

    container.appendChild(exerciseElement);
  });
}


// Функція для запиту до API з параметрами filter та name
async function fetchExerciseDetails(filter, name) {
  // Приведення filter до нижнього регістру
  const lowerCaseFilter = filter.toLowerCase();

  // Формування URL запиту вручну
  const url = `https://your-energy.b.goit.study/api/exercises?${lowerCaseFilter}=${name}&page=1&limit=10`;
  console.log('Запитуваний URL:', url); // Лог URL для перевірки

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Помилка завантаження даних');

    const data = await response.json();
    console.log('Отримані дані:', data); // Лог для виведення даних
    
    if (data.results && data.results.length > 0) {
      renderExerciseDetails(data.results); // Відображаємо, якщо дані доступні
    } else {
      renderExerciseDetails([]); // Якщо дані відсутні
    }
  } catch (error) {
    console.error('Помилка при запиті до API:', error);
  }
}

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Помилка завантаження даних');

    const data = await response.json();
    
    // Перевірка кількості вправ
    if (data.results) {
      console.log('Кількість отриманих вправ:', data.results.length); // Має бути 10
      console.log('Отримані дані:', data.results); // Лог для перевірки даних
    }
    
    if (data.results && data.results.length > 0) {
      renderExerciseDetails(data.results); // Відображаємо, якщо дані доступні
    } else {
      renderExerciseDetails([]); // Якщо дані відсутні
    }
  } catch (error) {
    console.error('Помилка при запиті до API:', error);
  }


// Функція для відображення деталей обраної вправи
function renderExerciseDetails(exerciseData) {
  const detailsContainer = document.getElementById('exercise-details');
  detailsContainer.innerHTML = '';

  if (exerciseData.length > 0) {
    const exerciseDetail = exerciseData[0];

    detailsContainer.innerHTML = `
      <div class="exercise-details__item">
        <h3>${exerciseDetail.name}</h3>
        <p><strong>Rate:</strong> ${exerciseDetail.rating || 'Немає даних'}</p>
        <p><strong>Body Part:</strong> ${exerciseDetail.bodyPart}</p>
        <p><strong>target</strong> ${exerciseDetail.target}</p>
        <p><strong>burned Calories</strong> ${exerciseDetail.burnedCalories}</p>

      </div>
    `;
  } else {
    detailsContainer.innerHTML = '<p>Інформація недоступна</p>';
  }
}


// Events for filters
export function initializeFilters() {
  const filterItems = document.querySelectorAll('.exercises-filters ul li');
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedFilter = item.id;

      // Clean container and using new filter
      loadExercises(selectedFilter);

      // Changing active filter class
      document.querySelectorAll('.exercises-filters__selected').forEach(el => {
        el.classList.remove('exercises-filters__selected');
      });
      item.classList.add('exercises-filters__selected');
    });
  });
}

// Create pagination based on total pages
export function createPagination(
  totalPages,
  filter,
  limit = 12,
  currentPage = 1
) {
  const paginationContainer = document.querySelector(
    '.exercises-pagination ul'
  );
  paginationContainer.innerHTML = ''; // Clear pagination container

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.textContent = i;

    // Add class for the active page
    if (i === currentPage) {
      pageItem.classList.add('exercises-pagination__current');
    }

    // Add event listener for each page item
    pageItem.addEventListener('click', () => {
      // Update the class for the current page
      document.querySelectorAll('.exercises-pagination li').forEach(li => {
        li.classList.remove('exercises-pagination__current');
      });
      pageItem.classList.add('exercises-pagination__current');

      // Load data for the selected page
      loadExercises(filter, i, limit);
    });

    paginationContainer.appendChild(pageItem);
  }
}
