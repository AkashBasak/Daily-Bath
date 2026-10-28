/* eslint-disable @next/next/no-img-element -- plain img keeps the intro free of JS and image optimisation delays */

// Marks the session after the first intro, and skips it on later page loads.
// Runs inline before first paint so returning visitors never see a flash.
const sessionScript = `try{var d=document.documentElement;if(sessionStorage.getItem("db-intro"))d.setAttribute("data-intro-seen","");else{sessionStorage.setItem("db-intro","1");var c=document.getElementById("intro-curtain");c&&c.addEventListener("animationend",function(e){if(e.animationName==="intro-lift")d.setAttribute("data-intro-seen","")})}}catch(e){document.documentElement.setAttribute("data-intro-seen","")}`;

export function IntroCurtain() {
  return (
    <>
      <div id="intro-curtain" className="intro-curtain" aria-hidden="true">
        <div className="flex flex-col items-center">
          <img src="/brand/daily-bath-logo.svg" alt="" width={296} height={48} className="intro-curtain__logo h-auto" />
          <span className="intro-curtain__bar" />
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: sessionScript }} />
    </>
  );
}
