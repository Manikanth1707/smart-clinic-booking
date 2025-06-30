const form = document.getElementById('appointment-form');
const response = document.getElementById('response');
const popup = document.getElementById('success-popup');
const dateInput = document.getElementById('date');
const slotsContainer = document.getElementById('slots');
const timeInput = document.getElementById('appointment_time');
const hiddenDateInput = document.getElementById('hidden-date');
const timeSlotSection = document.querySelector('.time-slots');

// Time slots to show
const timeSlots = [
  '9:00 AM - 9:30 AM',
  '9:30 AM - 10:00 AM',
  '10:00 AM - 10:30 AM',
  '11:00 AM - 11:30 AM',
  '12:00 PM - 12:30 PM',
  '1:00 PM - 1:30 PM',
  '2:00 PM - 2:30 PM',
  '3:00 PM - 3:30 PM',
  '4:00 PM - 4:30 PM',
  '4:30 PM - 5:00 PM'
];

// Initialize calendar
flatpickr("#date", {
  altInput: true,
  altFormat: "F j, Y",
  dateFormat: "Y-m-d",
  minDate: "today",
  disable: [
    function(date) {
      return (date.getDay() === 0 || date.getDay() === 6); // Disable Sundays & Saturdays
    }
  ],
  onChange: function(selectedDates, dateStr) {
    hiddenDateInput.value = dateStr;
    slotsContainer.innerHTML = '';
    timeSlotSection.style.display = 'block';

    timeSlots.forEach(slot => {
      const btn = document.createElement('button');
      btn.textContent = slot;
      btn.type = 'button';
      btn.classList.add('slot-btn');
      btn.onclick = () => {
        document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        timeInput.value = slot;
      };
      slotsContainer.appendChild(btn);
    });
  }
});

// Form submission to Firebase
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!timeInput.value) {
    response.style.color = 'red';
    response.textContent = '❌ Please select a time slot.';
    return;
  }

  response.style.color = '#555';
  response.textContent = '⏳ Submitting your appointment...';

  const appointmentData = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    date: hiddenDateInput.value,
    time: timeInput.value,
    message: form.message.value.trim(),
    timestamp: new Date()
  };

  try {
    await firebase.firestore().collection("appointments").add(appointmentData);
    response.textContent = '';
    form.reset();
    timeInput.value = '';
    hiddenDateInput.value = '';
    document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
    timeSlotSection.style.display = 'none';
    popup.style.display = 'block'; // 🎉 Show popup
  } catch (err) {
    console.error("Error submitting to Firebase:", err);
    response.style.color = 'red';
    response.textContent = '❌ Submission failed. Please try again.';
  }
});
