const apiKey = "";
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
    
            // Split the answer into chunks for each slide
            const maxCharsPerSlide = 500;
            const slides = [];
            let currentSlide = '';
            for (let sentence of answer.split(/[.!?]/)) {
                if ((currentSlide + ' ' + sentence).trim().length > maxCharsPerSlide) {
                    slides.push(currentSlide.trim());
                    currentSlide = sentence.trim();
                } else {
                    currentSlide += ' ' + sentence;
                }
            }
            if (currentSlide.trim().length > 0) {
                slides.push(currentSlide.trim());
            }
    
            // Construct the HTML content for the reveal.js presentation
            let presentationHTML = `
                <!doctype html>
                <html>
                <head>
                    <title>Answer Presentation</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.2.0/reveal.min.css">
                    <style>
                        .reveal .slides section {
                            text-align: center;
                            font-size: 48px; 
                        }
                    </style>
                </head>
                <body>
                    <div class="reveal">
                        <div class="slides">
            `;
            
            // Add each slide to the presentation
            for (let slideContent of slides) {
                presentationHTML += `<section data-background-color="rgb(70, 70, 255)">${slideContent}</section>`;
            }
    
            presentationHTML += `
                        </div>
                    </div>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/4.2.0/reveal.min.js"></script>
                    <script>
                        Reveal.initialize();
                    </script>
                </body>
                </html>
            `;
    
            // Open the presentation in a new tab
            const presentationBlob = new Blob([presentationHTML], { type: 'text/html' });
            const presentationUrl = URL.createObjectURL(presentationBlob);
            window.open(presentationUrl, '_blank');
    
        } catch (error) {
            console.error("Error:", error);
            questionInput.placeholder = "Error fetching response.";
        }
    }

    /*async function fetchReport(question) {
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
    }*/

/* This code is for centering the text context for presentation and creating new slides dynamically. 

 function addTextToSlide(text) {
                let slide = pptx.addSlide();
            
                // Split text into manageable chunks
                const maxTextLength = 200; // Maximum characters per slide (adjust as needed)
                let chunks = [];
            
                for (let i = 0; i < text.length; i += maxTextLength) {
                    chunks.push(text.slice(i, i + maxTextLength));
                }
            
                // Add chunks of text to the slide(s)
                for (let chunk of chunks) {
                    // Create a text box
                    const textBoxOpts = {
                        x: 0.5, // Centered horizontally
                        y: 0.5, // Centered vertically
                        w: "90%", // 90% width of the slide
                        h: "90%", // 90% height of the slide
                        align: "center", // Center align text horizontally
                        valign: "middle", // Center align text vertically
                        fontSize: 20, // Font size (adjust as needed)
                        color: "000000", // Text color (black)
                    };
            
                    slide.addText(chunk, textBoxOpts);
            
                    slide = pptx.addSlide(); // Add a new slide for the next chunk
                }
            } */ 





/*async function fetchReport(question) {
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
            
            function splitTextIntoChunks(text, maxTextLength) {
                const sentences = text.match(/[^.!?]+[.!?]+[\])'"`’”]g) || [];
                const chunks = [];
    
                let currentChunk = '';
                for (let sentence of sentences) {
                    const newChunk = (currentChunk + ' ' + sentence).trim();
                    if (newChunk.length > maxTextLength) {
                        // If newChunk exceeds maxTextLength, push currentChunk to chunks
                        if (currentChunk.trim().length > 0) {
                            chunks.push(currentChunk.trim());
                        }
                        currentChunk = sentence; // Start new chunk with current sentence
                    } else {
                        currentChunk = newChunk;
                    }
                }
    
                // Push the last chunk if not empty
                if (currentChunk.trim().length > 0) {
                    chunks.push(currentChunk.trim());
                }
    
                return chunks;
            }
    
            // Function to add text to slides with centered alignment
            function addTextToSlide(text) {
                let slide = pptx.addSlide();
    
                // Split text into manageable chunks based on logical breaks
                const maxTextLength = 200; // Maximum characters per slide (adjust as needed)
                const chunks = splitTextIntoChunks(text, maxTextLength);
    
                // Add chunks of text to the slide(s)
                for (let chunk of chunks) {
                    const textBoxOpts = {
                        x: 0.5, // Centered horizontally
                        y: 0.5, // Centered vertically
                        w: "90%", // 90% width of the slide
                        h: "90%", // 90% height of the slide
                        align: "center", // Center align text horizontally
                        valign: "middle", // Center align text vertically
                        fontSize: 20, // Font size (adjust as needed)
                        color: "000000", // Text color (black)
                    };
    
                    slide.addText(chunk, textBoxOpts);
    
                    slide = pptx.addSlide(); // Add a new slide for the next chunk
                }
    
                // Remove the last empty slide (if any)
                if (pptx.slides.length > 1) {
                    pptx.slides.pop();
                }
            }

            // Add the answer to the slides
            addTextToSlide(answer);
    
            // Save the presentation
            const pdfData = await pptx.writeFile({ outputType: 'arraybuffer', fileType: 'pdf' });
            const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
            console.log(pdfBlob)
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl, '_blank'); // Open the PDF in a new tab

        } catch (error) {
            console.error("Error:", error);
            questionInput.placeholder = "Error fetching response.";
        }
    } (make sure to add */ /*before g)*/