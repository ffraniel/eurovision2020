import React from 'react';
function App() {
  return (
    <div className="container mx-auto">
      <div className="m-10 max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={require('./profile.jpg')} alt="Display" />
        <div className="px-4 py-4">
          <div className="font-bold text-purple-500 text-xl mb-2">
            Blessing Krofegha
          </div>
          <p className="text-gray-700 text-base">
            When i’m not coding i switch to netflix with biscuits and cold tea as my companion. <span></span>😜
          </p>
        </div>
        <div className="px-4 py-1 pb-8">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#Software Engineer</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#Writter</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mt-2">#Public Speaker</span>
        </div>
      </div>
    </div>
  );
}
export default App;