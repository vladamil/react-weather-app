function NotFound() {
   return (
      <div className="error">
         <h3 className="error-title">Sorry!</h3>

         <img className="error-img" src="/img/earth.gif" alt="not-found" />
         <p>We could not find data for that location.</p>
         <p>Please, try again!</p>
      </div>
   );
}

export default NotFound;
