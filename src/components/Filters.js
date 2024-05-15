import React from 'react';

function Filters({ filters, setFilters }) {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <div className="filters">
            <select name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="">Todas las categorías</option>
                <option value="categoria1">Categoría 1</option>
                <option value="categoria2">Categoría 2</option>
                {/* Agregar más categorías según sea necesario */}
            </select>
            <select name="rating" value={filters.rating} onChange={handleFilterChange}>
                <option value="">Todas las calificaciones</option>
                <option value="5">5 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="3">3 estrellas</option>
                {/* Agregar más opciones según sea necesario */}
            </select>
            <select name="sort" value={filters.sort} onChange={handleFilterChange}>
                <option value="">Ordenar por</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="rating-desc">Calificación: mayor a menor</option>
                {/* Agregar más opciones según sea necesario */}
            </select>
        </div>
    );
}

export default Filters;


