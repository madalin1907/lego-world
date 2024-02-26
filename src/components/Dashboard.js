import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../firebase";

export default function Dashboard() {
  const [legos, setLegos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("asc");

  useEffect(() => {
    const fetchLegos = async () => {
      try {
        const legosCollection = firebase.firestore().collection("legos");
        const snapshot = await legosCollection.get();

        const legosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          category: doc.data().category,
          description: doc.data().description,
          imageUrl: doc.data().imageUrl,
          name: doc.data().name,
          pieces: doc.data().pieces,
          price: doc.data().price,
        }));

        setLegos(legosData);
      } catch (error) {
        console.error("Error fetching legos:", error);
      }
    };

    fetchLegos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const legosCollection = firebase.firestore().collection("legos");
      await legosCollection.doc(id).delete();

      // Refresh the list after deletion
      const updatedlegos = legos.filter((lego) => lego.id !== id);
      setLegos(updatedlegos);
    } catch (error) {
      console.error("Error deleting LEGO:", error);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter and sort the legos
  const filteredAndSortedlegos = legos
      .filter((lego) =>
          lego.name.toLowerCase().includes(searchQuery.toLowerCase()) || lego.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;

        if (sortOption === "asc") {
          return priceA - priceB;
        } else if (sortOption === "desc") {
          return priceB - priceA;
        } else {
          return a.category.localeCompare(b.category);
        }
      });

  return (
      <div className="box-container">
        <div className="inputs-box">
          <input type="text" placeholder="Search by name" value={searchQuery} onChange={handleSearch}/>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="asc">Sort by Price (Low to High)</option>
            <option value="desc">Sort by Price (High to Low)</option>
            <option value="category">Sort by category (Alphabetical)</option>
          </select>
        </div>
        <div className="lego-container">
          {filteredAndSortedlegos.map((lego) => (
              <div key={lego.id} className="lego-card">
                <h3>{lego.name}</h3>
                <h4>{lego.category + " Collection"}</h4>
                <img
                    src={lego.imageUrl}
                    alt={lego.name}
                />
                <p>{lego.description}</p>

                <div className="info-container">
                  <h5>Price: ${lego.price}</h5>
                  <h5>Pieces: {lego.pieces}</h5>
                </div>
                <div className="buttons-container">
                  <Link to={`/edit-lego/${lego.id}`}>
                    <button className="yellow-button">Edit</button>
                  </Link>
                  <button
                      className="red-button"
                      onClick={() => handleDelete(lego.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
}
