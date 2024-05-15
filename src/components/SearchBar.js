import React from 'react';

function SearchBar({ searchQuery, setSearchQuery }) {
    return (
        <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
        />
    );
}

export default SearchBar;

