import { login } from "../api/api.js";
import { html, render } from "../lib.js";


const loginTemplate = (onSubmit) => html`
        <!--Login Page-->
        <section id="loginaPage">
            <form @submit=${onSubmit} class="loginForm">
                <h2>Login</h2>
                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </form>
        </section>
`;


export async function loginPage(context){

    context.render(loginTemplate(onSubmit))

    async function onSubmit(ev){
        ev.preventDefault()

        const formData = new FormData(ev.target);

        const email = formData.get('email')
        const password = formData.get('password');

        if (email == '' || password == '') {
            return alert('All fields are required!')
        }

        await login(email, password)
        context.updateUserNav();
        context.page.redirect('/')
    }
}