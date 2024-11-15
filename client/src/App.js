import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Login from './Login';
import Registration from './Registration';
import Main from './Main';
import CreateService from './CreateService';
import ServicesList from './ServicesList';
import ServiceDetails from './ServiceDetails'
import EditReview from './EditReview';
import CreateTimeSlot from './CreateTimeSlot';
import ReservationPage from './ReservationPage';
import UserProfile from './UserProfile';
import EditProfile from './EditProfile';
import UserServices from './UserServices';
import EditService from './EditService';
import AboutPage from './AboutPage';
import ServiceBookings from './ServiceBookings';
import UserBookings from './UserBookings';
import SearchedServices from './SearchedServices';
import { LanguageProvider } from './LanguageContext';


function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/main" element={<Main />}/>
          <Route path="/create-service" element={<CreateService />}/>
          <Route path='/services-list' element={<ServicesList />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/edit-review/:reviewId/:serviceId" element={<EditReview/>} />
          <Route path="/create-time-slot/:serviceId" element={<CreateTimeSlot />} />
          <Route path="/reserve/:id" element={<ReservationPage/>} />
          <Route path='/user-profile' element ={<UserProfile/>} />
          <Route path='/edit-profile/:id' element={<EditProfile/>} />
          <Route path='/user-services' element={<UserServices/>} />
          <Route path='/edit-service/:serviceId' element={<EditService/>} />
          <Route path='/about-page' element={<AboutPage/>} />
          <Route path='/service-bookings/:serviceId' element={<ServiceBookings/>} />
          <Route path='/user-bookings/:userId' element={<UserBookings/>} />
          <Route path='/searched-services' element={<SearchedServices/>} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
