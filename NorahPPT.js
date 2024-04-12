const apiKey = "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";
const form = document.getElementById("question-input-form");
const questionInput = document.getElementById("questionbox");
const submitButton = document.querySelector(".submit");
const resetButton = document.querySelector(".reset");

      form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const question = questionInput.value.trim();
          if (question) {
              await fetchReport(question);
          } else {
              questionInput.placeholder = "Please enter a question.";
          }
      });

      submitButton.addEventListener("click", async () => {
          const question = questionInput.value.trim();
          if (question) {
              await fetchReport(question);
          } else {
              questionInput.placeholder = "Please enter a question.";
          }
      });

      resetButton.addEventListener("click", () => {
          // Reset form input
          questionInput.value = "";
      });

      async function fetchReport(question) {
          try {
              const response = await fetch("https://api.openai.com/v1/chat/completions", {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${apiKey}`,
                  },
                  body: JSON.stringify({
                      messages: [
                          {
                              role: "system",
                              content: "You are consulting with Teacher Norah. Given the question provided, write a response as a compassionate teacher.",
                          },
                          {
                              role: "user",
                              content: question,
                          },
                      ],
                      model: "gpt-3.5-turbo",
                  }),
              });

              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }

              const data = await response.json();
              const answer = data.choices[0].message.content;

              // Initialize pptxgenjs library
              let pptx = new PptxGenJS();
              let slide = pptx.addSlide();

              // Add the answer to the slide
              slide.addText(answer);

              // Save the presentation
              pptx.writeFile('Teacher_Norah_Presentation');

          } catch (error) {
              console.error("Error:", error);
              questionInput.placeholder = "Error fetching response.";
          }
      }