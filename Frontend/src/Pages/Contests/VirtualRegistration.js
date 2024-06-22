import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function VirtualRegistration() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const contestName = `CollabCode Round ${contestId}`; // Or retrieve the actual name dynamically if needed

  const handleSubmit = (event) => {
    event.preventDefault();
    const startTime = event.target.startTime.value;
    navigate('/countdown', { state: { startTime, contestId, contestName } });
  };

  return (
    <div className="bg-second_bg_color_dark text-second_font_color_dark p-8 rounded-lg shadow-md font-orbitron">
      <h1 className="text-xl font-semibold mb-2">Registration for virtual participation</h1>
      <h2 className="text-third_font_color_dark mb-6">{contestName}</h2>
      <div className="terms mb-6 flex gap-x-4 items-center">
        <p className="text-blue-500 font-semibold">virtual participation</p>
        <textarea 
          readOnly 
          className="flex-1 h-[140px] text-second_font_color_dark border-2 border-blue-500 rounded-lg p-4 resize-none"
        >
          Virtual contest is a way to take part in past contest, as close as possible to participation on time. It is supported only ICPC mode for virtual contests.

          If you've seen these problems, a virtual contest is not for you - solve these problems in the archive.

          If you just want to solve some problem from a contest, a virtual contest is not for you - solve this problem in the archive.

          Never use someone else's code, read the tutorials or communicate with other person during a virtual contest.
        </textarea>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center">
          <label className="text-blue-500 mb-2 font-semibold">Take part:</label>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="participationType" value="individual" defaultChecked className="form-radio text-blue-500" />
              <span>as individual participant</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="participationType" value="team" className="form-radio text-blue-500" />
              <span>as a team member</span>
            </label>
          </div>
        </div>
        <div className="flex justify-center items-center gap-x-2 mt-2">
          <label className="text-blue-500 mb-2">Virtual start time:</label>
          <input 
            type="datetime-local" 
            name="startTime" 
            className="text-third_font_color_dark border-2 border-blue-500 rounded-lg p-2"
            required
          />
        </div>
        <div className='flex justify-center text-center'>
          <button type="submit" className="my-6 bg-blue-100 text-blue-500 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors">
            Register for virtual participation
          </button>
        </div>
      </form>
    </div>
  );
}

export default VirtualRegistration;
