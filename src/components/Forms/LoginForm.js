import React from "react";

const RegisterForm = () => {
    return (
        <div className="form">
            <div className="text-center">
            <br />
            <br />
            <br />
                <main className="form-signin">
                    <form>
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                    <br />
                    <br />
                        <div id="input" className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="Enter Email" />
                        </div>
                        <div id="input" className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Enter Password" />                       
                        </div><br />
                <a href="/register">Have a login? Click here!</a>
                    <br />
                    <br />
                        <button id="RegButton" className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default RegisterForm;