(function() {
  const form = document.querySelector('.quiz-form');
  const result = document.querySelector('.result');

  if (form && result) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let score = 0;
      const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];

      // Assuming correctAnswers is available globally or passed in via React
      const correctAnswers = window.correctAnswers || ['A', 'D', 'C', 'B']; // Default values as a fallback

      // Check answers
      userAnswers.forEach((answer, index) => {
        if (answer === correctAnswers[index]) {
          score += 25;
        }
      });

      // Show results on page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      result.classList.remove('d-none');

      let output = 0;
      const timer = setInterval(() => {
        const scoreDisplay = result.querySelector('span');
        if (scoreDisplay) {
          scoreDisplay.textContent = `${output}%`;
        }
        if (output === score) {
          clearInterval(timer);
        } else {
          output++;
        }
      }, 10);
    });
  }
})();
