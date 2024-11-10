import axios from 'axios';

// Завантаження даних з API з фільтром, категорією, пошуковим запитом, сторінкою та лімітом
export async function loadExercises(
  filter = 'Muscles',
  page = 1,
  limit = 12,
  searchQuery = ''
) {
  try {
    const decodedFilter = filter.replace(/%20/g, ' ');

    // Отримуємо категорію з UI
    const selectedCategory = document.querySelector('.exercises-filters__selected').id;

    // API запит
    const response = await axios.get(
      'https://your-energy.b.goit.study/api/filters',
      {
        params: {
          filter: decodedFilter,
          category: selectedCategory,
          page,
          limit,
          search: searchQuery, // Пошуковий запит
        },
      }
    );

    // Отримуємо дані з відповіді
    const exercises = response.data.results;
    const totalPages = response.data.totalPages;

    // Якщо вправи не знайдено, вивести повідомлення
    if (exercises.length === 0) {
      document.getElementById('exercises-container').innerHTML = '<p>No exercises found for this filter and category.</p>';
      return;
    }

    // Відображення вправ
    renderExercises(exercises);

    // Відображення вибраної категорії
    renderSelectedCategory(selectedCategory);

    // Створення пагінації
    createPagination(totalPages, filter, limit, page);
  } catch (error) {
    console.error('Error loading exercises:', error);
  }
}

// Відображення вибраної категорії
export function renderSelectedCategory(category) {
  const categoryElement = document.getElementById('selected-category');
  categoryElement.textContent = `Selected Category: ${category}`;
}

// Функція для рендерингу вправ
export function renderExercises(exercises) {
    const container = document.getElementById('exercises-container');
    container.innerHTML = ''; // Очищаємо контейнер перед рендерингом нових вправ
  
    exercises.forEach(exercise => {
      const exerciseElement = document.createElement('div');
      exerciseElement.classList.add('exercises__col');
  
      // Перевірка на правильність ID
      console.log('Exercise ID:', exercise.id); // Додаємо лог, щоб перевірити ID
  
      // Збереження ID вправи в dataset для подальшого використання
      exerciseElement.dataset.exerciseId = exercise.id;
  
      exerciseElement.innerHTML = `
        <div class="exercises__item">
          <img src="${exercise.imgURL}" alt="Опис зображення" />
  
          <div class="text-overlay">
            <h5>${exercise.name}</h5>
            <p>${exercise.filter}</p>
          </div>
        </div>
      `;
  
      // Додаємо подію на клік, щоб показати деталі вправи
      exerciseElement.addEventListener('click', () => {
        // Витягуємо exerciseId з dataset
        const exerciseId = exerciseElement.dataset.exerciseId;
        console.log('Exercise ID on click:', exerciseId); // Перевірка ID при кліку
        showExerciseDetails(exerciseId);
      });
  
      container.appendChild(exerciseElement);
    });
  }
  
  export async function showExerciseDetails(exerciseId) {
    if (!exerciseId) {
      console.error('Exercise ID is missing');
      return;
    }
  
    try {
      // Запит для отримання деталей вправи за правильним URL
      const response = await axios.get(
        `https://your-energy.b.goit.study/api/exercises/${exerciseId}`
      );
      
      const exercise = response.data;
  
      // Відображення даних у модальному вікні
      const modal = document.getElementById('exercise-modal');
      modal.innerHTML = `
        <div class="modal-content">
          <h3>${exercise.name}</h3>
          <p><strong>Calories burned in 3 minutes:</strong> ${exercise.caloriesBurned}</p>
          <p><strong>Body part:</strong> ${exercise.bodyPart}</p>
          <p><strong>Goal:</strong> ${exercise.goal}</p>
          <p><strong>Rating:</strong> ${exercise.rating}</p>
          <button class="close-btn" onclick="closeModal()">Close</button>
        </div>
      `;
      modal.style.display = 'block';
    } catch (error) {
      console.error('Error fetching exercise details:', error);
    }
  }
  
// Закриття модального вікна
export function closeModal() {
  const modal = document.getElementById('exercise-modal');
  modal.style.display = 'none';
}

// Функція для обробки пошукового запиту
export function initializeSearch() {
  const searchInput = document.getElementById('exercise-search');
  searchInput.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchQuery = searchInput.querySelector('input').value;
    loadExercises(undefined, 1, 12, searchQuery); // Завантажуємо вправи з новим пошуковим запитом
  });
}

// Створення пагінації
export function createPagination(totalPages, filter, limit = 12, currentPage = 1) {
  const paginationContainer = document.querySelector('.exercises-pagination ul');
  paginationContainer.innerHTML = ''; // Очистка контейнера пагінації

  for (let i = 1; i <= totalPages; i++) {
    const pageItem = document.createElement('li');
    pageItem.textContent = i;

    // Додавання класу для поточної сторінки
    if (i === currentPage) {
      pageItem.classList.add('exercises-pagination__current');
    }

    pageItem.addEventListener('click', () => {
      loadExercises(filter, i, limit); // Завантажуємо вправи для вибраної сторінки
    });

    paginationContainer.appendChild(pageItem);
  }
}

// Ініціалізація фільтрів (ця функція також експортується)
export function initializeFilters() {
  const filterItems = document.querySelectorAll('.exercises-filters ul li');
  filterItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedFilter = item.id;

      // Очищаємо контейнер та завантажуємо вправи з новим фільтром
      loadExercises(selectedFilter);

      // Змінюємо активний клас для фільтрів
      document.querySelectorAll('.exercises-filters__selected').forEach(el => {
        el.classList.remove('exercises-filters__selected');
      });
      item.classList.add('exercises-filters__selected');
    });
  });
}
