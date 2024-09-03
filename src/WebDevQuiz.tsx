import React, { useEffect } from "react";

declare global {
  interface Window {
    correctAnswers: string[];
  }
}

const WebDevQuiz: React.FC = () => {

  useEffect(() => {
    // Check if correctAnswers is already defined on window
    if (!window.correctAnswers) {
      window.correctAnswers = ['A', 'D', 'C', 'B']; // Set the correct answers
    }

    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "/WebDevQuiz.js"; // Adjust the path if necessary
    script.async = true;
    document.body.appendChild(script);

    // Cleanup to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
        <link rel="stylesheet" type="text/css" href="/hov.css" />
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
              src="/img/icons/html5.svg"
              alt="html5"
            />
             <img
              className="tech-icon"
              src="/img/icons/css3.svg"
              alt="css3"
            />
             <img
              className="tech-icon"
              src="/img/icons/javascript.svg"
              alt="javascript"
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
        <div className="intro py-3 text-center osh">
          <div className="container">
            <h2 className="text-primary display-1 my-4">HOV QUIZ</h2>
          </div>
        </div>

        {/* Result section */}
        <div className="result py-4 d-none bg-light text-center osh">
          <div className="container lead">
            <p>
              You are <span className="text-primary display-4 p-3">0%</span>
              certified ROC
            </p>
          </div>
        </div>

        {/* Quiz section */}
        <div className="quiz py-4 bg-primary">
          <div className="container">
            <h2 className="my-5 text-white">
              "...I answer all your questions but then y'all got to go/ Now the question I ask you is
              how bad you want to know? BLAOW!"
            </h2>
            <form className="quiz-form text-light">
              {/* Question 1 */}
              <div className="my-5">
                <p className="lead font-weight-normal">1. How heavy was Jay-Z when he was born?</p>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q1" value="A" />
                  <label className="form-check-label">10 pounds 8 ounces</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q1" value="B" />
                  <label className="form-check-label">8 pounds</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q1" value="C" />
                  <label className="form-check-label">8 pounds 10 ounces</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q1" value="D" />
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
                  <input type="radio" name="q2" value="A" />
                  <label className="form-check-label">Reasonable Doubt, Friend or Foe</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q2" value="B" />
                  <label className="form-check-label">Kingdom Come, Hollywood</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q2" value="C" />
                  <label className="form-check-label">
                    The Dynasty: Roc La Familia, You, Me, Him and Her
                  </label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q2" value="D" />
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
                  <input type="radio" name="q3" value="A" />
                  <label className="form-check-label">Rock and Soul</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q3" value="B" />
                  <label className="form-check-label">Tower Records</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q3" value="C" />
                  <label className="form-check-label">Beat Street Records</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q3" value="D" />
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
                  <input type="radio" name="q4" value="A" />
                  <label className="form-check-label">Kingdom Come</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q4" value="B" />
                  <label className="form-check-label">Blueprint 2: The Gift and the Curse</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q4" value="C" />
                  <label className="form-check-label">American Gangster</label>
                </div>
                <div className="form-check my-2 text-white-50">
                  <input type="radio" name="q4" value="D" />
                  <label className="form-check-label">4:44</label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <input type="submit" className="btn btn-light" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebDevQuiz;
