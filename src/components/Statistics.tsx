// components/Statistics.js
export default function Statistics() {
  return (
    <section className="text-center py-8 bg-gray-100">
      <h3 className="text-lg font-bold">
        Our Doctors And Clinics Have Earned Over 5,000+ Reviews On Google!
      </h3>
      <div className="flex justify-center gap-4 mt-4">
        <div className="bg-yellow-400 p-4 rounded-lg">
          <p className="font-bold text-lg">Nutrition And Mental Health</p>
        </div>
        <div className="bg-blue-400 p-4 rounded-lg">
          <p className="font-bold text-lg">Healthy Habits For A Happy Heart</p>
        </div>
      </div>
    </section>
  );
}
