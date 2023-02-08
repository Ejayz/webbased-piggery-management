"use client";
export default function Page() {




  return (
    <>
      <div className="w-full grid h-full">
        <div className="w-5/6  mt-4 h-auto lg:grid-cols-3 grid gap-2 grid-cols-1 mx-auto">
          <div className="stats w-full bg-primary text-primary-content shadow">
            <div className="stat">
              <div className="stat-title">Total Pig</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
          <div className="stats w-full bg-primary text-primary-content shadow">
            <div className="stat">
              <div className="stat-title">Total Sow</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
          </div>
          <div className="stats w-full shadow bg-primary text-primary-content ">
            <div className="stat">
              <div className="stat-title">Total Boar</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
          </div>
          <div className="stats w-full bg-primary text-primary-content shadow">
            <div className="stat">
              <div className="stat-title">Downloads</div>
              <div className="stat-value">31K</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
          </div>
        </div>
        <canvas id="goodCanvas1" className="w-3/4 h-auto" aria-label="Hello ARIA World" role="img"></canvas>
      </div>
    </>
  );
}
