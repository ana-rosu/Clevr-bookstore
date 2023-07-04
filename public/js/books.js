const fetchData = async () => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=programming"
    );
    const data = await response.json();
    const books = data.items;
    await fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ books }),
    });

    console.log("Data sent to server");
  } catch (error) {
    console.error(error);
  }
};

module.exports = fetchData;
