import React from 'react';

function Filters({ filters, setFilters, categories, ratings }) {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className="filters d-flex justify-content-between mb-4">
            <select name="category" value={filters.category} onChange={handleFilterChange} className="form-select me-2">
                <option value="">Todas las categorías</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <select name="rating" value={filters.rating} onChange={handleFilterChange} className="form-select me-2">
                <option value="">Todas las calificaciones</option>
                {ratings.map((rating, index) => (
                    <option key={index} value={rating}>{rating} estrellas</option>
                ))}
            </select>
            <select name="sort" value={filters.sort} onChange={handleFilterChange} className="form-select">
                <option value="">Ordenar por</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating-desc">Calificación: mayor a menor</option>
            </select>
        </div>
    );
}

export default Filters;
