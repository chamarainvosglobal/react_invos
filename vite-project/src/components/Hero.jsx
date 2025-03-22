import React from 'react'

const Hero = ({title='Invos Global',subtitle='React Vite Project'}) => {
  return (
    <div>
        <section className="bg-indigo-700 py-20 mb-4 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-vector/background-realistic-abstract-technology-particle_23-2148431735.jpg?t=st=1742545441~exp=1742549041~hmac=7e47334c4d3b8316dfe46caa5db5c5f44e1094ce31c24bd654f738016b68fb9a&w=1380')"
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="my-4 text-xl text-white">
                {subtitle}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero