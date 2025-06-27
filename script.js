const form = document.getElementById('appointment-form');
const response = document.getElementById('response');

// Replace this with your deployed Google Apps Script URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbyGcXenxk3i_4dVtsjG8zvP9GEyyzRZ6pI-XEqlNofzNdoPMMdl3-4cCFHQ8YwRMGKhaQ/exec';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  response.innerHTML = 'Submitting...';

  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(res => {
      response.innerHTML = '✅ Appointment submitted successfully!';
      form.reset();
    })
    .catch(err => {
      response.innerHTML = '❌ Something went wrong. Please try again.';
      console.error(err);
    });
});
