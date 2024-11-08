import React, { useState, useRef } from "react";

declare global {
  interface Window {
    correctAnswers: string[];
  }
}

const WebDevQuiz: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isPerfectScore, setIsPerfectScore] = useState(false);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let score = 0;
    let incorrectAnswers = 0;
    let unanswered = 0;
    const userAnswers = [
      e.currentTarget.q1.value,
      e.currentTarget.q2.value,
      e.currentTarget.q3.value,
      e.currentTarget.q4.value,
      e.currentTarget.q5.value,
      e.currentTarget.q6.value,
      e.currentTarget.q7.value,
      e.currentTarget.q8.value,
      e.currentTarget.q9.value,
      e.currentTarget.q10.value,
      e.currentTarget.q11.value,
      e.currentTarget.q12.value,
      e.currentTarget.q13.value,
      e.currentTarget.q14.value,
      e.currentTarget.q15.value,
      e.currentTarget.q16.value,
      e.currentTarget.q17.value,
      e.currentTarget.q18.value,
      e.currentTarget.q19.value,
      e.currentTarget.q20.value,
    ];

    const correctAnswers = window.correctAnswers || ['A', 'D', 'C', 'B', 'B', 'A', 'D', 'C', 'D', 'D', 'B', 'B', 'A', 'B', 'D', 'A', 'C', 'A', 'D', 'B' ];

    userAnswers.forEach((answer, index) => {
      const questionElement = e.currentTarget[`q${index + 1}`] as RadioNodeList;
      const questionLabel = e.currentTarget.querySelector(`.q${index + 1}-label`) as HTMLElement;

      // If no answer is selected, add the 'text-warning' class
      if (!answer) {
        unanswered += 1;
        questionLabel?.classList.add('missed');
      } else {
        questionLabel?.classList.remove('missed');
        if (answer === correctAnswers[index]) {
          score += 1;
        } else {
          incorrectAnswers += 1; // Increment incorrect answers count
          // Access the checked input element
          if (unanswered === 0) {
            const checkedInput = Array.from(questionElement).find((input) => (input as HTMLInputElement).checked) as HTMLInputElement | undefined;
            if (checkedInput) {
              // Find the closest parent element with class 'form-check'
              checkedInput.closest('.form-check')?.classList.add('incorrect');
            }
          }
        }
      }
    });

    setCorrectCount(score);
    setIncorrectCount(incorrectAnswers); // Set the incorrect answers count
    setUnansweredCount(unanswered);
    setShowUnansweredWarning(unanswered > 0);

    if (unanswered === 0) {
      setSubmitted(true);
      setShowUnansweredWarning(false);
    }

    // Scroll to the top of the page to show the result
    window.scrollTo({ top: 0, behavior: 'smooth' });

        // Start the score animation
        const targetScore = (score / 20) * 100;
        let currentScore = 0;
        const interval = setInterval(() => {
            currentScore += 1;
            if (currentScore > targetScore) {
                clearInterval(interval);
                setAnimatedScore(targetScore);
                if (targetScore === 100) {
                  setIsPerfectScore(true); // Trigger 100% animation
              }
            } else {
                setAnimatedScore(currentScore);
            }
        }, 20); // Adjust the interval duration for speed

    // Ensure resultRef.current is defined before calling scrollIntoView
    requestAnimationFrame(() => {
      if (resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  const handleRetry = () => {
    window.location.reload(); // Simple page refresh for retry
  };

    // Handle radio button change to remove warning class
    const handleAnswerChange = (questionNumber: number) => {
      const questionLabel = document.querySelector(`.q${questionNumber}-label`) as HTMLElement;
      questionLabel?.classList.remove('missed');
    };

  return (
    <>
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>HOV Quiz</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" type="text/css" href="/index.css" />
      </div>
      <div className="quiz-body">
      <div className="tech-stack-icons web-dev-icons">
            {/* Tech Stack Icons */}
            <img
              className="tech-icon"
              src="/img/icons/Bootstrap.svg"
              alt="Bootstrap"
            />
             <img
              className="tech-icon"
              src="/img/icons/css3.svg"
              alt="css3"
            />
              <img
              className="tech-icon"
              src="/img/icons/react.svg"
              alt="react"
            />
             <img
              className="tech-icon"
              src="/img/icons/typescript.svg"
              alt="typescript"
            />
            <img
              className="tech-icon"
              src="/img/icons/NPM.svg"
              alt="npm"
            />
             <img
              className="tech-icon"
              src="/img/icons/git.svg"
              alt="git"
            />
             <img
              className="tech-icon"
              src="/img/icons/github.svg"
              alt="github"
            />
            {/* Add more icons here */}
          </div>
        {/* Top section */}
        <div className="intro py-3 text-center osh" ref={resultRef}>
          <div className="container">
            <h2 className="text-primary display-1 my-4">HOV QUIZ</h2>
          </div>
        </div>

        {showUnansweredWarning && (
          <div className="alert text-center missed">
            You have not answered {unansweredCount}{" "}
            {unansweredCount === 1 ? "question" : "questions"}, please answer them and resubmit.
          </div>
        )}

        {/* Result section */}
        {submitted && (
          <div className="result pt-0 text-center osh" >
            <div className="container lead">
              {correctCount < 20 ? (
                <>
                  <p>
                    You are <span className={`text-primary display-4 p-3 ${isPerfectScore ? 'pulse-animation' : ''}`}>{animatedScore}%</span> certified ROC <br />
                    <span className="text-danger hovresult"> You have answered {incorrectCount} {incorrectCount === 1 ? 'question' : 'questions'} incorrectly.</span>
                  </p>
                  <button onClick={handleRetry} className="btn btn-danger mb-4">
                    Try Again
                  </button>
                </>
              ) : (
                <p>
                  You are <span className={`text-primary display-4 p-3 ${isPerfectScore ? 'pulse-animation' : ''}`}>{animatedScore}%</span> certified ROC
                </p>
              )}
            </div>
          </div>
        )}

        {/* Quiz section */}
        <div className="quiz py-4 bg-primary">
          <div className="container">
            <h2 className="my-5 text-white">
              "...I answer all your questions but then y'all got to go/ Now the question I ask you is
              how bad you want to know? BLAOW!"
            </h2>
            <form className="quiz-form text-light" onSubmit={handleSubmit}>
              {/* Question 1 */}
              <div className="my-5">
                <p className="lead font-weight-normal">1. How heavy was Jay-Z when he was born?</p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q1" value="A" onChange={() => handleAnswerChange(1)} disabled={submitted} />
                  <label className="form-check-label">10 pounds 8 ounces</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q1" value="B" onChange={() => handleAnswerChange(1)} disabled={submitted}/>
                  <label className="form-check-label">8 pounds</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q1" value="C" onChange={() => handleAnswerChange(1)} disabled={submitted}/>
                  <label className="form-check-label">8 pounds 10 ounces</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q1" value="D" onChange={() => handleAnswerChange(1)} disabled={submitted}/>
                  <label className="form-check-label">6 pounds 6 ounces</label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  2. Which one of Jay-Z's albums and tracks had a video that was a reenactment of
                  Friends?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q2" value="A" onChange={() => handleAnswerChange(2)} disabled={submitted}/>
                  <label className="form-check-label">Reasonable Doubt, Friend or Foe</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q2" value="B" onChange={() => handleAnswerChange(2)} disabled={submitted}/>
                  <label className="form-check-label">Kingdom Come, Hollywood</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q2" value="C" onChange={() => handleAnswerChange(2)} disabled={submitted}/>
                  <label className="form-check-label">
                    The Dynasty: Roc La Familia, You, Me, Him and Her
                  </label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q2" value="D" onChange={() => handleAnswerChange(2)} disabled={submitted}/>
                  <label className="form-check-label">4:44, Moonlight</label>
                </div>
              </div>

              {/* Question 3 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  3. What was the name of the store in Brooklyn that Jay-Z and Biggie promoted their
                  music in years before achieving major label support?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q3" value="A" onChange={() => handleAnswerChange(3)} disabled={submitted}/>
                  <label className="form-check-label">Rock and Soul</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q3" value="B" onChange={() => handleAnswerChange(3)} disabled={submitted}/>
                  <label className="form-check-label">Tower Records</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q3" value="C" onChange={() => handleAnswerChange(3)} disabled={submitted}/>
                  <label className="form-check-label">Beat Street Records</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q3" value="D" onChange={() => handleAnswerChange(3)} disabled={submitted}/>
                  <label className="form-check-label">King Karol</label>
                </div>
              </div>

              {/* Question 4 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  4. Which one of Jay-Z’s first nine studio album packages was not shot by Jonathan
                  Mannion?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q4" value="A" onChange={() => handleAnswerChange(4)} disabled={submitted}/>
                  <label className="form-check-label">Kingdom Come</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q4" value="B" onChange={() => handleAnswerChange(4)} disabled={submitted}/>
                  <label className="form-check-label">Blueprint 2: The Gift and the Curse</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q4" value="C" onChange={() => handleAnswerChange(4)} disabled={submitted}/>
                  <label className="form-check-label">American Gangster</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q4" value="D" onChange={() => handleAnswerChange(4)} disabled={submitted}/>
                  <label className="form-check-label">4:44</label>
                </div>
              </div>

              {/* Question 5 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  5. At the 1999 MTV video music Awards what song did Jigga win best rap video for?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q5" value="A" onChange={() => handleAnswerChange(5)} disabled={submitted}/>
                  <label className="form-check-label">Jigga what, jigga who</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q5" value="B" onChange={() => handleAnswerChange(5)} disabled={submitted}/>
                  <label className="form-check-label">Can i get a…</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q5" value="C" onChange={() => handleAnswerChange(5)} disabled={submitted}/>
                  <label className="form-check-label">Anything</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q5" value="D" onChange={() => handleAnswerChange(5)} disabled={submitted}/>
                  <label className="form-check-label">Do it again</label>
                </div>
              </div>
              {/* Question 6 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  6. Whats was the name of the tour that Jay-Z and Mary J Blige embarked on in 2008
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q6" value="A" onChange={() => handleAnswerChange(6)} disabled={submitted}/>
                  <label className="form-check-label">Heart of the city tour</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q6" value="B" onChange={() => handleAnswerChange(6)} disabled={submitted}/>
                  <label className="form-check-label">King and Queen of Hearts World Tour</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q6" value="C" onChange={() => handleAnswerChange(6)} disabled={submitted}/>
                  <label className="form-check-label">On the run tour</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q6" value="D" onChange={() => handleAnswerChange(6)} disabled={submitted}/>
                  <label className="form-check-label">No more drama tour</label>
                </div>
              </div>
              {/* Question 7 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  7. How many times has Jay-Z performed on SNL?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q7" value="A" onChange={() => handleAnswerChange(7)} disabled={submitted}/>
                  <label className="form-check-label">Three times</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q7" value="B" onChange={() => handleAnswerChange(7)} disabled={submitted}/>
                  <label className="form-check-label">Once</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q7" value="C" onChange={() => handleAnswerChange(7)} disabled={submitted}/>
                  <label className="form-check-label">Eight times</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q7" value="D" onChange={() => handleAnswerChange(7)} disabled={submitted}/>
                  <label className="form-check-label">Five times</label>
                </div>
              </div>
              {/* Question 8 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  8. Which of HOV's albums spent 5 weeks atop the billboard 200 album chart?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q8" value="A" onChange={() => handleAnswerChange(8)} disabled={submitted}/>
                  <label className="form-check-label">Blueprint</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q8" value="B" onChange={() => handleAnswerChange(8)} disabled={submitted}/>
                  <label className="form-check-label">4:44</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q8" value="C" onChange={() => handleAnswerChange(8)} disabled={submitted}/>
                  <label className="form-check-label">Vol 2 … Hard knock life</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q8" value="D" onChange={() => handleAnswerChange(8)} disabled={submitted}/>
                  <label className="form-check-label">Reasonable Doubt</label>
                </div>
              </div>
              {/* Question 9 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  9. Finish the lyric: The theme song to The Sopranos/Plays in the key of life on my mental piano/Got a strange way of seeing life, like...
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q9" value="A" onChange={() => handleAnswerChange(9)} disabled={submitted}/>
                  <label className="form-check-label">life is gettin too wild
                    I need to bring some sort kinda calm to it</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q9" value="B" onChange={() => handleAnswerChange(9)} disabled={submitted}/>
                  <label className="form-check-label">It's the thought of a ride that make my eyes wide
                    I'm caught up, I'm tryna make all of my dreams materialize</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q9" value="C" onChange={() => handleAnswerChange(9)} disabled={submitted}/>
                  <label className="form-check-label">Don Bishop, the fifth or palm cock either
                    Lift up your soul or give you the holy ghost</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q9" value="D" onChange={() => handleAnswerChange(9)} disabled={submitted}/>
                  <label className="form-check-label">I'm Stevie Wonder with beads under the do-rag Intuition is there, even when my vision's impaired</label>
                </div>
              </div>
              {/* Question 10 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  10. What month and year was co-ceo and founder signed to Roc-A-Fella records under the moniker Jay-Z
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q10" value="A" onChange={() => handleAnswerChange(10)} disabled={submitted}/>
                  <label className="form-check-label">December 1996</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q10" value="B" onChange={() => handleAnswerChange(10)} disabled={submitted}/>
                  <label className="form-check-label">Jun 1998</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q10" value="C" onChange={() => handleAnswerChange(10)} disabled={submitted}/>
                  <label className="form-check-label">September 1994</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q10" value="D" onChange={() => handleAnswerChange(10)} disabled={submitted}/>
                  <label className="form-check-label">October 1995</label>
                </div>
              </div>
              {/* Question 11 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  11. What month and year did Rocawear launch?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q11" value="A" onChange={() => handleAnswerChange(11)} disabled={submitted}/>
                  <label className="form-check-label">September 2001</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q11" value="B" onChange={() => handleAnswerChange(11)} disabled={submitted}/>
                  <label className="form-check-label">July 1999</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q11" value="C" onChange={() => handleAnswerChange(11)} disabled={submitted}/>
                  <label className="form-check-label">April 2005</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q11" value="D" onChange={() => handleAnswerChange(11)} disabled={submitted}/>
                  <label className="form-check-label">October 1998</label>
                </div>
              </div>
              {/* Question 12 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  12. Where in New York was the album cover for album Volume 3 shot?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q12" value="A" onChange={() => handleAnswerChange(12)} disabled={submitted}/>
                  <label className="form-check-label">560 state street</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q12" value="B" onChange={() => handleAnswerChange(12)} disabled={submitted}/>
                  <label className="form-check-label">46th Street and 6th ave</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q12" value="C" onChange={() => handleAnswerChange(12)} disabled={submitted}/>
                  <label className="form-check-label"> 540 W 26th St</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q12" value="D" onChange={() => handleAnswerChange(12)} disabled={submitted}/>
                  <label className="form-check-label">825 8th Ave</label>
                </div>
              </div>
              {/* Question 13 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  13. Which album did Jay-z support by embarking on a 10 city “principle for a day” high school tour
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q13" value="A" onChange={() => handleAnswerChange(13)} disabled={submitted}/>
                  <label className="form-check-label">Blueprint2: Gift and the curse</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q13" value="B" onChange={() => handleAnswerChange(13)} disabled={submitted}/>
                  <label className="form-check-label">The Black Album</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q13" value="C" onChange={() => handleAnswerChange(13)} disabled={submitted}/>
                  <label className="form-check-label"> Blueprint</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q13" value="D" onChange={() => handleAnswerChange(13)} disabled={submitted}/>
                  <label className="form-check-label">Kingdom Come</label>
                </div>
              </div>
              {/* Question 14 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  14. Who are the other performers that featured at "An Evening With Jay-Z" show at The Pearl concert theater inside the Palms Casino & Resort in Las Vegas on December 29, 2007.
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q14" value="A" onChange={() => handleAnswerChange(14)} disabled={submitted}/>
                  <label className="form-check-label">J. Cole, Wale, N.E.R.D., Trey Songz, Young Jeezy</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q14" value="B"  onChange={() => handleAnswerChange(14)} disabled={submitted}/>
                  <label className="form-check-label">Questlove, DJ Just Blaze, Bilal, Ne-Yo, Beanie Sigel, Memphis Bleek, Kanye West and Mary J Blige</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q14" value="C"  onChange={() => handleAnswerChange(14)} disabled={submitted}/>
                  <label className="form-check-label">Beanie Sigel, Oschino, Peedi Peedi, Freeway, Omillio Sparks, Neef Buck, Young Chris and casha </label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q14" value="D"  onChange={() => handleAnswerChange(14)} disabled={submitted}/>
                  <label className="form-check-label">Jay Electronica, Talib Kweli, J. Cole, AZ, Mac Miller, Bobby Shmurda, Brand Nubian</label>
                </div>
              </div>
              {/* Question 15 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  15. When did The 40/40 Club inside the luxury Palazzo hotel and casino open.
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q15" value="A"  onChange={() => handleAnswerChange(15)} disabled={submitted}/>
                  <label className="form-check-label">July 15 2010</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q15" value="B" onChange={() => handleAnswerChange(15)} disabled={submitted}/>
                  <label className="form-check-label">April 5, 2005.</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q15" value="C" onChange={() => handleAnswerChange(15)} disabled={submitted}/>
                  <label className="form-check-label"> September 4, 2009. </label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q15" value="D" onChange={() => handleAnswerChange(15)} disabled={submitted}/>
                  <label className="form-check-label"> December 30, 2007.</label>
                </div>
              </div>
              {/* Question 16 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  16. What sporting event did Jay-Z and Beyonce attend (one of their first dates) 2 days after premiering their single 03 Bonnie & Clide?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q16" value="A" onChange={() => handleAnswerChange(16)} disabled={submitted}/>
                  <label className="form-check-label">College football game Miami hurricanes vs Florida state seminoles.</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q16" value="B" onChange={() => handleAnswerChange(16)} disabled={submitted}/>
                  <label className="form-check-label">NBA basketball game Net vs Heat</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q16" value="C" onChange={() => handleAnswerChange(16)} disabled={submitted}/>
                  <label className="form-check-label">NFL football game Rams vs Bengals</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q16" value="D" onChange={() => handleAnswerChange(16)} disabled={submitted}/>
                  <label className="form-check-label"> WNBA basketball game Storm vs Liberty</label>
                </div>
              </div>
              {/* Question 17 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  17. Other than Jay-Z who helped curated the line up who were the other artists on the 1st inaugural sprite liquid mix tour?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q17" value="A" onChange={() => handleAnswerChange(17)} disabled={submitted}/>
                  <label className="form-check-label">Common, Foxy Brown, Green day, Maroon 5, Fabolous, Juvenile, Lil Wayne, Korn, Papa Roach, Rapsody, DMX, Cozz, Bas</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q17" value="B" onChange={() => handleAnswerChange(17)} disabled={submitted}/>
                  <label className="form-check-label">Rhianna, Beyonce, Mary J Blige, Alicia Keys, Nas, Busta Rhymes, 50Cent, Emimem, Snoop</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q17" value="C" onChange={() => handleAnswerChange(17)} disabled={submitted}/>
                  <label className="form-check-label">NERD, Mos def, Dela soul, Talib Kweli, Nappy Roots, Blackalicious, Tech N9ne, Hoobastank, Borialis, Nonpoint, Trik Turner and 311</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q17" value="D" onChange={() => handleAnswerChange(17)} disabled={submitted}/>
                  <label className="form-check-label"> Justin Timberlake, Linkin park, Limp Bizkit, Kid Rock, Young Jeezy, Rick Ross, Pusha T, UGK, OutKast </label>
                </div>
              </div>
              {/* Question 18 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  18. Who presented Jay-Z with the moon man for best rap video at the 1999 MTV video music awards?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q18" value="A" onChange={() => handleAnswerChange(18)} disabled={submitted}/>
                  <label className="form-check-label">Afeni Shakur and Voletta Wallace</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q18" value="B" onChange={() => handleAnswerChange(18)} disabled={submitted}/>
                  <label className="form-check-label">Jamie Foxx and Kerry Washington</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q18" value="C" onChange={() => handleAnswerChange(18)} disabled={submitted}/>
                  <label className="form-check-label">Rhianna</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q18" value="D" onChange={() => handleAnswerChange(18)} disabled={submitted}/>
                  <label className="form-check-label"> Alica Keys and Mary J Blige </label>
                </div>
              </div>
              {/* Question 19 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  19. Who is the now retired NFL goat who listened to HOV’s to get motivated for games and training. Used PSA as work out music?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q19" value="A" onChange={() => handleAnswerChange(19)} disabled={submitted}/>
                  <label className="form-check-label">Dean Sanders</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q19" value="B"  onChange={() => handleAnswerChange(19)} disabled={submitted}/>
                  <label className="form-check-label">Shannon Sharpe</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q19" value="C"  onChange={() => handleAnswerChange(19)} disabled={submitted}/>
                  <label className="form-check-label">Randy Moss</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q19" value="D"  onChange={() => handleAnswerChange(19)} disabled={submitted}/>
                  <label className="form-check-label"> Tom Brady </label>
                </div>
              </div>
              {/* Question 20 */}
              <div className="my-5">
                <p className="lead font-weight-normal">
                  20. What JayZ and Pharrell collaborative song debuted the Billionaire boys club clothing label?
                </p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q20" value="A"  onChange={() => handleAnswerChange(20)} disabled={submitted}/>
                  <label className="form-check-label">Excuse me miss</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q20" value="B" onChange={() => handleAnswerChange(20)} disabled={submitted}/>
                  <label className="form-check-label">Frontin</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q20" value="C" onChange={() => handleAnswerChange(20)} disabled={submitted}/>
                  <label className="form-check-label">I just wanna love you</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q20" value="D" onChange={() => handleAnswerChange(20)} disabled={submitted}/>
                  <label className="form-check-label"> Change clothes </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <input type="submit" className="btn btn-light" value="Submit" disabled={submitted}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebDevQuiz;
