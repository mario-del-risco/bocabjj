"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from "../../firebase.config";
import { ref, onValue } from "firebase/database";

const ExercisesPage = () => {
  const [categories, setCategories] = useState({});
  const [exercises, setExercises] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const categoriesRef = ref(db, "categories");
    const exercisesRef = ref(db, "exercises");

    const fetchCategories = () => {
      onValue(categoriesRef, (snapshot) => {
        const data = snapshot.val();
        setCategories(data.categories);
      });
    };

    const fetchExercises = () => {
      onValue(exercisesRef, (snapshot) => {
        const data = snapshot.val();
        setExercises(data.exercises);
      });
    };

    fetchCategories();
    fetchExercises();

    setIsLoading(false);
  }, []);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="container mx-auto p-4 m-2">
      <h1 className="text-3xl font-bold text-center mb-8">Exercises</h1>

      {isLoading ? (
        <p>Loading exercises...</p>
      ) : (
        <>
          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(categories || {}).map(([categoryId, category]) => (
              <div
                key={categoryId}
                className={`bg-${
                  selectedCategory === category.id ? "blue-500" : "gray-200"
                } rounded-lg shadow-md p-6 cursor-pointer hover:scale-105 transition-transform duration-300`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <h2
                  className={`text-xl font-bold text-black mb-2 text-${
                    selectedCategory === category.id ? "white" : "black"
                  }`}
                >
                  {category.name}
                </h2>
              </div>
            ))}
          </div>

          {/* Exercise List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
            {selectedCategory ? (
              <div>
                {Array.isArray(exercises) &&
                  exercises
                    .filter(
                      (exercise) => exercise.category === selectedCategory
                    )
                    .map((exercise) => (
                      <Link
                        key={exercise.id}
                        href={`/exercises/${exercise.id}`}
                        className="hover:scale-105 transition-transform duration-300"
                      >
                        <div className="bg-white rounded-lg shadow-md p-6 cursor-pointer">
                          <h2 className="text-xl font-bold mb-2">
                            {exercise.name}
                          </h2>
                          <p className="text-gray-600 mb-4">
                            {exercise.description}
                          </p>
                          <div className="mt-4">
                            <span className="text-blue-600 hover:underline">
                              View Exercise Details
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            ) : (
              <p>Select a category to view exercises.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ExercisesPage;
