const API_KEY = "78684310-850d-427a-8432-4a6487f6dbc4";
const API_URL = "http://95.217.134.12:4010/create-pdf";

const convertToPdf = async (text) => {
  try {
    const response = await fetch(`${API_URL}?apiKey=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
      }),
    });

    const pdfBlob = await response.blob();
    // const pdfUrl = URL.createObjectURL(pdfBlob);

    return pdfBlob;
  } catch (error) {
    console.error("Error during conversion into PDF:", error);
    throw error;
  }
};

export { convertToPdf };
