// LanguageContext.js
import { createContext, useState, useContext } from 'react';

// Translations for English
const englishText = {
  aboutPage: {
    title: 'About Us',
    paragraph1: 'Welcome to ReserveHub, your reliable partner in finding and booking essential services online. Whether you are looking to schedule a haircut, secure a spot at a local workshop, or book a consultation with a professional, we have got you covered.',
    paragraph2: 'Our platform connects you with a wide range of service providers, making it easy to compare options, read reviews, and make informed decisions about the services you need. We are committed to helping streamline your scheduling needs with our intuitive booking system.',
    paragraph3: 'At ReserveHub, we believe that booking services should be hassle-free, transparent, and trustworthy. Our mission is to empower customers by providing them with a comprehensive platform that not only saves time but also ensures quality and satisfaction.',
    paragraph4: 'Thank you for choosing us to assist with your service booking needs. We are excited to help you find the perfect services that fit your lifestyle and needs.',
  },

  addReview:{
    fillInError: 'Please fill out the comment field.',
    logInError: 'You must be logged in to add a review.',
    successfulAlert:'Review added successfully',
    failedAlert:'Failed to add review',
    anyAddingError: 'Error adding review:',
    title: 'Add Review',
    rating: 'Rating:',
    comment: 'Comment:',
    submitButton:'Submit Review',
  },

  createService:{
    fillInError: 'Please fill out all fields.',
    logInError: 'You must be logged in to create a service.',
    successfulAlert:'Service created successfully',
    failedAlert:'Failed to create service',
    anyCreatingArror: 'An error occurred while creating the service.',
    title: 'Create Service',
    titleService:'Title',
    description:'Description',
    location: 'Location',
    createButton:"Create Service",

  },
  createTimeSlot:{
    logInError:'You must be logged in to create a time slot.',
    timeError:'End time must be later than start time.',
    successfulAlert:'Time slot created successfully',
    failedAlert:'Failed to create time slot',
    anyAddingError:'An error occurred while creating the time slot.',
    title:'Create Time Slot for Service',
    startLabel:'Start Time:',
    endLable:'End Time:',
    createButton:'Create Time Slot',
    completeButton:'Complete Time Slots',
    listLable:'Created Time Slots:',
    
  },
  main:{
    serchError:"Please enter a search term.",
    searchLabel:"Search...",
    searchButton:'Search',

  },
  reservationPage:{
    failedTimeAlert:'Failed to fetch time slots',
    timeError:"Please select a time slot before confirming the reservation.",
    logInError:'You must be logged in to create a booking.',
    failedBookingAlert:'Failed to make reservation',
    successfulAlert:'Reservation successful!',
    title:'Reserve Service',
    availableLable:'Available Time:',
    timeLabel:'Time:',
    selectButton:'Select',
    noTimeMes:'No time slots available for the selected date.',
    confirmButton:'Confirm Reservation',

  },
  reviewsSection:{
    failfetchError:'Failed to fetch reviews',
    deleteConfirmation:'Are you sure you want to delete this review?',
    rightsError:'Failed to delete review. You do not have rights to perform this action.',
    successfulAlert:'Review deleted successfully',
    failedAlert:'Failed to delete review',
    title:'Reviews',
    edit: 'Edit',
    delete:'Delete',
    noReviewsMes:'No reviews yet.',
  },
  serchedServices:{
    failedAlert: 'Failed to fetch services: ',
    failedCheckAvailability:'Failed to check service availability: ',
    selectCategoryLabel:'Select Category',
    selectCountryLabel:'Select Country',
    checkAvailabilityButton:'Check Availability',
    prev:'Prev',
    next:'Next',
    noServicesLabel:'No services available matching the criteria.',
    loading: 'Loading...'


  },
  serviceBookings:{
    errorFetchingBookings:'Error fetching bookings:',
    title:'Service Bookings Calendar',
    dateLabel:'Date:',
    customerLabel:'Customer:',
    timeSlotLabel:'Time Slot:',
    noBookingsLabel:'No bookings available for this date.',

  },
  serviceDatails:{
    serviceError:'Service not found:',
    desctiptionLabel:'Description:',
    locationLabel:'Location:',
    categoryLabel:'Category:',
    countryLabel:'Country:',
    reserveButton:'Reserve',


  },
  servicesGrid:{
    learnMoreButton:'Learn More',

  },
  userBookings:{
    failFetchBookingsError:'Failed to fetch bookings',
    logInError:'You must be logged in to delete a booking.',
    deleteConfirmation:"Are you sure you want to delete this booking?",
    deleteFailing:'Failed to delete booking',
    successfulAlert:'Booking deleted successfully.',
    anyDeletingError:'Error deleting booking:',
    title:'My Bookings',
    loading:'Loading...',
    viewDetailsButton:'View Details',
    deleteButton:'Delete',
    noBookingsLabel:'No bookings available.',
  },
  userProfile:{
    failedFetchUser:'Failed to fetch user data',
    successfulAlert:'User deleted successfully',
    failedAlert:'Failed to delete user',
    logInError:'Please log in or register to view your profile...',
    title:'User Profile',
    firstnameLabel:'First Name:',
    LastNameLabel:'Last Name:',
    emailLabel:'Email:',
    editButton:'Edit Profile',
    deleteButton:'Delete Profile',
    viewServicesButton:'View My Services',
    viewReservationButton:'View My Reservations',

  },
  userSrervices:{
    failedFetchServices:'Failed to fetch user services',
    successfulAlert:'Service deleted successfully',
    failedAlert:'Failed to delete service',
    loading:'Loading...',
    title:'My Services',
    noServicesLabel:'No services found.',
    deleteConfirmation: "Are you sure you want to delete the service?"

  },

  header: {
    languageButton: 'Change Language',
    createLabel:'Create Service',
    servicesLabel:'All Services',
    accountLabel:'My Account',
    signOutLabel:'Sign Out',
    signInLabel:'Sign In',

  },
  
  editProfile:{
    errorFetching: 'Failed to fetch user data',
    errorPassword: "Passwords do not match.",
    errorUpdate: 'Failed to update user data',
    successfulAlert:'Profile updated successfully',
    editTitle: 'Edit Profile',
    firstName: 'First Name:',
    lastName: 'Last Name:',
    email: 'Email:',
    password:'Password (leave blank to keep the same):',
    confirmPassword: 'Confirm New Password:',
    updateButton:'Update Profile',
    enterPassword:"Enter new password",
    enterConfirmPassword: "Confirm new password"
  },

  editReview:{
    logInError:'You must be logged in to edit a review.',
    permissionError:'You do not have permission to perform this action.',
    fetchError: 'Failed to fetch review data',
    updateError: 'You must be logged in to update a review.',
    failUpdate:'Failed to update review',
    successfulAlert:'Review updated successfully',
    editReview:'Edit Review',
    rating:'Rating:',
    comment:'Comment:',
    updateButton:'Update Review'
  },

  editService:{
    fetchError:'Failed to fetch service details',
    fetchTimeError:'Failed to fetch time slots',
    fillError: 'Please fill out all fields.',
    logInError:'You must be logged in to create a service.',
    fetchUpdateError: 'Failed to update service',
    fetchDeleteError: 'Failed to delete time slot',
    successfulAlert:'Time slot deleted successfully',
    editServiceTitle: 'Edit Service',
    title: 'Title:',
    description: 'Description:',
    location: 'Location:',
    category: 'Category:',
    country:'Country:',
    updateButton: 'Update Service',
    addTime: 'Do you want to add new time slots?',
    yes: 'Yes',
    no: 'No',
    timeTitle: 'Time Slots',
    time: 'Time:',
    delete: 'Delete',
    message: 'No time slots available for the selected date.'
  },

  footer:{
    aboutTitle: 'About Us',
    text: 'We are a leading platform for booking and managing services. We help you connect with the best service providers in your area.',
    contact: 'Contact Us',
    home:'Home',
    about: 'About',
    services: 'Services',
    follow: 'Follow Us',
    info: 'reserveHub.com | Designed by Vika Sirenko'
  },

  userGrid:{
    learnMore:'Learn More',
    availableLable:'Availability',
    edit: 'Edit',
    delete: 'Delete',

  }
};

// Translations for Ukrainian
const ukrainianText = {
  aboutPage: {
    title: 'Про Нас',
    paragraph1: 'Ласкаво просимо до ReserveHub, вашого надійного партнера у пошуку та бронюванні необхідних послуг онлайн. Незалежно від того, чи ви шукаєте можливість записатися на стрижку, зарезервувати місце на місцевому майстер-класі або записатися на консультацію з професіоналом, ми вам допоможемо.',
    paragraph2: 'Наша платформа з\'єднує вас з широким спектром постачальників послуг, що робить легким порівняння варіантів, читання відгуків та прийняття обґрунтованих рішень щодо необхідних вам послуг. Ми прагнемо допомогти спростити ваші потреби в плануванні за допомогою нашої інтуїтивної системи бронювання.',
    paragraph3: 'У ReserveHub ми вважаємо, що бронювання послуг повинно бути безпроблемним, прозорим та надійним. Наша місія - надавати клієнтам комплексну платформу, яка не тільки економить час, але й забезпечує якість та задоволення.',
    paragraph4: 'Дякуємо, що обрали нас для допомоги у бронюванні ваших послуг. Ми раді допомогти вам знайти ідеальні послуги, які відповідають вашому способу життя та потребам.',
  },

  addReview:{
    fillInError: 'Будь ласка, заповніть поле коментаря.',
    logInError: 'Ви повинні увійти, щоб додати відгук.',
    successfulAlert:'Відгук успішно доданий',
    failedAlert:'Не вдалося додати відгук',
    anyAddingError: 'Помилка додавання відгуку:',
    title: 'Додати Відгук',
    rating: 'Рейтинг:',
    comment: 'Коментар:',
    submitButton:'Надіслати Відгук',
  },

  createService:{
    fillInError: 'Будь ласка, заповніть всі поля.',
    logInError: 'Ви повинні увійти, щоб створити послугу.',
    successfulAlert:'Послугу успішно створено',
    failedAlert:'Не вдалося створити послугу',
    anyCreatingArror: 'Сталася помилка під час створення послуги.',
    title: 'Створити Послугу',
    titleService:'Назва',
    description:'Опис',
    location: 'Місцезнаходження',
    createButton:"Створити Послугу",
  },

  createTimeSlot:{
    logInError:'Ви повинні увійти, щоб створити часовий інтервал.',
    timeError:'Час завершення повинен бути пізніше часу початку.',
    successfulAlert:'Часовий інтервал успішно створено',
    failedAlert:'Не вдалося створити часовий інтервал',
    anyAddingError:'Сталася помилка під час створення часового інтервалу.',
    title:'Створити Часовий Інтервал для Послуги',
    startLabel:'Час Початку:',
    endLable:'Час Завершення:',
    createButton:'Створити Часовий Інтервал',
    completeButton:'Завершити Часові Інтервали',
    listLable:'Створені Часові Інтервали:',
  },

  main:{
    serchError:"Будь ласка, введіть термін для пошуку.",
    searchLabel:"Пошук...",
    searchButton:'Шукати',
  },

  reservationPage:{
    failedTimeAlert:'Не вдалося отримати часові інтервали',
    timeError:"Будь ласка, виберіть часовий інтервал перед підтвердженням бронювання.",
    logInError:'Ви повинні увійти, щоб створити бронювання.',
    failedBookingAlert:'Не вдалося зробити бронювання',
    successfulAlert:'Бронювання успішно!',
    title:'Забронювати Послугу',
    availableLable:'Доступний Час:',
    timeLabel:'Час:',
    selectButton:'Вибрати',
    noTimeMes:'Немає доступних часових інтервалів на обрану дату.',
    confirmButton:'Підтвердити Бронювання',
  },

  reviewsSection:{
    failfetchError:'Не вдалося отримати відгуки',
    deleteConfirmation:'Ви впевнені, що хочете видалити цей відгук?',
    rightsError:'Не вдалося видалити відгук. У вас немає прав для виконання цієї дії.',
    successfulAlert:'Відгук успішно видалено',
    failedAlert:'Не вдалося видалити відгук',
    title:'Відгуки',
    edit: 'Редагувати',
    delete:'Видалити',
    noReviewsMes:'Відгуків поки немає.',
  },

  serchedServices:{
    failedAlert: 'Не вдалося отримати послуги: ',
    failedCheckAvailability:'Не вдалося перевірити доступність послуги: ',
    selectCategoryLabel:'Вибрати Категорію',
    selectCountryLabel:'Вибрати Країну',
    checkAvailabilityButton:'Перевірити Доступність',
    prev:'Попередній',
    next:'Наступний',
    noServicesLabel:'Немає доступних послуг, що відповідають критеріям.',
    loading: 'Завантаження...',
  },

  serviceBookings:{
    errorFetchingBookings:'Помилка отримання бронювань:',
    title:'Календар Бронювань Послуг',
    dateLabel:'Дата:',
    customerLabel:'Клієнт:',
    timeSlotLabel:'Часовий Інтервал:',
    noBookingsLabel:'Немає доступних бронювань на цю дату.',
  },

  serviceDatails:{
    serviceError:'Послуга не знайдена:',
    desctiptionLabel:'Опис:',
    locationLabel:'Місцезнаходження:',
    categoryLabel:'Категорія:',
    countryLabel:'Країна:',
    reserveButton:'Забронювати',
  },

  servicesGrid:{
    learnMoreButton:'Дізнатися Більше',
  },

  userBookings:{
    failFetchBookingsError:'Не вдалося отримати бронювання',
    logInError:'Ви повинні увійти, щоб видалити бронювання.',
    deleteConfirmation:"Ви впевнені, що хочете видалити це бронювання?",
    deleteFailing:'Не вдалося видалити бронювання',
    successfulAlert:'Бронювання успішно видалено.',
    anyDeletingError:'Помилка видалення бронювання:',
    title:'Мої Бронювання',
    loading:'Завантаження...',
    viewDetailsButton:'Переглянути Деталі',
    deleteButton:'Видалити',
    noBookingsLabel:'Немає доступних бронювань.',
  },

  userProfile:{
    failedFetchUser:'Не вдалося отримати дані користувача',
    successfulAlert:'Користувач успішно видалений',
    failedAlert:'Не вдалося видалити користувача',
    logInError:'Будь ласка, увійдіть або зареєструйтеся, щоб переглянути свій профіль...',
    title:'Профіль Користувача',
    firstnameLabel:'Ім\'я:',
    LastNameLabel:'Прізвище:',
    emailLabel:'Електронна Пошта:',
    editButton:'Редагувати Профіль',
    deleteButton:'Видалити Профіль',
    viewServicesButton:'Переглянути Мої Послуги',
    viewReservationButton:'Переглянути Мої Бронювання',
  },

  userSrervices:{
    failedFetchServices:'Не вдалося отримати послуги користувача',
    successfulAlert:'Послуга успішно видалена',
    failedAlert:'Не вдалося видалити послугу',
    loading:'Завантаження...',
    title:'Мої Послуги',
    noServicesLabel:'Послуг не знайдено.',
    deleteConfirmation: "Ви впевнені, що хочете видалити послугу?"
  },

  header: {
    languageButton: 'Змінити Мову',
    createLabel:'Створити Послугу',
    servicesLabel:'Всі Послуги',
    accountLabel:'Мій Обліковий Запис',
    signOutLabel:'Вийти',
    signInLabel:'Увійти',
  },
  
  editProfile:{
    errorFetching: 'Не вдалося отримати дані користувача',
    errorPassword: "Паролі не співпадають.",
    errorUpdate: 'Не вдалося оновити дані користувача',
    successfulAlert:'Профіль успішно оновлено',
    editTitle: 'Редагувати Профіль',
    firstName: 'Ім\'я:',
    lastName: 'Прізвище:',
    email: 'Електронна Пошта:',
    password:'Пароль (залиште порожнім, щоб залишити без змін):',
    confirmPassword: 'Підтвердити Новий Пароль:',
    updateButton:'Оновити Профіль',
    enterPassword:"Введіть новий пароль",
    enterConfirmPassword: "Підтвердіть новий пароль"
  },

  editReview:{
    logInError:'Ви повинні увійти, щоб редагувати відгук.',
    permissionError:'Ви не маєте права виконувати цю дію.',
    fetchError: 'Не вдалося отримати дані відгуку',
    updateError: 'Ви повинні увійти, щоб оновити відгук.',
    failUpdate:'Не вдалося оновити відгук',
    successfulAlert:'Відгук успішно оновлено',
    editReview:'Редагувати Відгук',
    rating:'Рейтинг:',
    comment:'Коментар:',
    updateButton:'Оновити Відгук'
  },

  editService:{
    fetchError:'Не вдалося отримати деталі послуги',
    fetchTimeError:'Не вдалося отримати часові інтервали',
    fillError: 'Будь ласка, заповніть всі поля.',
    logInError:'Ви повинні увійти, щоб створити послугу.',
    fetchUpdateError: 'Не вдалося оновити послугу',
    fetchDeleteError: 'Не вдалося видалити часовий інтервал',
    successfulAlert:'Часовий інтервал успішно видалено',
    editServiceTitle: 'Редагувати Послугу',
    title: 'Назва:',
    description: 'Опис:',
    location: 'Місцезнаходження:',
    category: 'Категорія:',
    country:'Країна:',
    updateButton: 'Оновити Послугу',
    addTime: 'Хочете додати нові часові інтервали?',
    yes: 'Так',
    no: 'Ні',
    timeTitle: 'Часові Інтервали',
    time: 'Час:',
    delete: 'Видалити',
    message: 'Немає доступних часових інтервалів на обрану дату.'
  },

  footer:{
    aboutTitle: 'Про Нас',
    text: 'Ми - провідна платформа для бронювання та управління послугами. Ми допомагаємо вам зв\'язатися з найкращими постачальниками послуг у вашому районі.',
    contact: 'Зв\'яжіться З Нами',
    home:'Головна',
    about: 'Про Нас',
    services: 'Послуги',
    follow: 'Слідуйте За Нами',
    info: 'reserveHub.com | Дизайн Віка Сіренко'
  },

  userGrid:{
    learnMore:'Дізнатися Більше',
    availableLable:'Доступність',
    edit: 'Редагувати',
    delete: 'Видалити',
  }
};


const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');
  const translations = language === 'english' ? englishText : ukrainianText;

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'ukrainian' : 'english');
  };

  return (
    <LanguageContext.Provider value={{ translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
