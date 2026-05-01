import React from 'react'
import pet1 from '../assets/pet1.png'
import pet2 from '../assets/pet2.png'
import pet3 from '../assets/pet3.png'
import pet4 from '../assets/pet4.png'

export const About = () => {
  return (
    <main className = "about-page">
    <h1>About Petstagram</h1>

    <section className="about-block">
        <div className="text-block">
            <p>
                Welcome to Petstagram, a social media platform created just for pets and the people who love them. 
                Unlike traditional social networks, Petstagram is all about celebrating animals of all kinds, where 
                the stars of every post are the pets themselves and the owners are the ones sharing their stories.
            </p>
        </div>
        <img src={pet1} alt="Cute dog smiling"/>
    </section>

    <section className="about-block reverse">
        <div className="text-block">
            <p>
                Petstagram allows pet owners to create profiles for their pets, upload photos, and share everyday 
                moments that make their companions special. Whether it’s a dog enjoying a walk, a cat lounging in 
                the sun, or a reptile exploring its enclosure, every post captures a unique glimpse into a pet’s life.
            </p>
        </div>
        <img src={pet2} alt="Cat lounging in sunlight"/>
    </section>

    <section className="about-block">
        <div className="text-block">
            <p>
                Our platform is designed to bring together a community of animal lovers who enjoy seeing, sharing, 
                and engaging with pet content. Users can browse through posts, discover new pets, and interact 
                through rating and comments, creating a friendly and supportive environment centered around positivity.
            </p>
        </div>
        <img src={pet3} alt="Bird perched on hand"/>
    </section>

    <section className="about-block reverse">
        <div className="text-block">
            <p>
                Petstagram is not limited to just cats and dogs. We welcome all pets, including birds, fish, rodents, 
                reptiles, and even more unique companions. Every animal has a story, and Petstagram provides a place 
                for those stories to be seen and appreciated.
            </p>
        </div>
        <img src={pet4} alt="Axolotl"/>
    </section>

    <section className="about-block">
        <div className="text-block">
            <h3>
                Whether you're here to share your pet’s cutest moments or just scroll through an endless feed of adorable 
                animals, Petstagram is your home for everything pets.
            </h3>
        </div>
    </section>
    </main>
  )
}
